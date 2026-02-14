import fs from 'fs';
import matter from 'gray-matter';
import glob from 'fast-glob'
import * as path from 'path'

async function getContentMeta(type, filename) {
  const basePath = path.join(process.cwd(), `./content/${type}/${filename}`)
  const fileContent = fs.readFileSync(basePath, 'utf8');
  const matterResult = matter(fileContent);
  const slug = filename.replace(/\.md$/, '')

  // Ensure date is always a string (gray-matter can parse dates as Date objects)
  const date = matterResult.data.date
  const dateString = date instanceof Date ? date.toISOString().split('T')[0] : (date || '2020-01-01')

  return {
    title: matterResult.data.title || slug,
    date: dateString,
    description: matterResult.data.description || slug,
    tag: matterResult.data.tag || 'general',
    type: type,
    slug: slug,
  }
}

export async function getContents(type) {
  let filenames = await glob(['*.md'], {
    cwd: path.join(process.cwd(), `./content/${type}`),
  })

  let contents = await Promise.all(filenames.map((filename) => getContentMeta(type, filename)))

  return contents.sort((a, z) => new Date(z.date) - new Date(a.date))
}

export async function getAllContents() {
  let filenames = await glob(['article/**/*.md', 'developer/**/*.md'], {
    cwd: path.join(process.cwd(), `./content`),
  })
  console.log('filenames', filenames )

  let contents = await Promise.all(filenames.map((filename) => {
    const [type, basename] = filename.split('/');
    return getContentMeta(type, basename)
  }))

  return contents.sort((a, z) => new Date(z.date) - new Date(a.date))
}

export async function getContent(type, slug) {
  const basePath = path.join(process.cwd(), `./content/${type}/${slug}.md`)
  const fileContent = fs.readFileSync(basePath, 'utf8');
  const matterResult = matter(fileContent);

  // Ensure date is always a string (gray-matter can parse dates as Date objects)
  const date = matterResult.data.date
  const dateString = date instanceof Date ? date.toISOString().split('T')[0] : (date || '2020-01-01')

  return {
    title: matterResult.data.title || slug,
    date: dateString,
    description: matterResult.data.description || '',
    tag: matterResult.data.tag || 'general',
    type: type,
    slug: slug,
    content: matterResult.content,
  }
}

export async function getPageContent(filename) {
  const basePath = path.join(process.cwd(), `./content/${filename}.md`)
  const fileContent = fs.readFileSync(basePath, 'utf8');
  const matterResult = matter(fileContent);

  return {
    title: matterResult.data.title || filename,
    heading: matterResult.data.heading || '',
    content: matterResult.content,
    ...matterResult.data,
  }
}

export async function getResume() {
  const basePath = path.join(process.cwd(), './content/work.json')
  const fileContent = fs.readFileSync(basePath, 'utf8');
  return JSON.parse(fileContent);
}
