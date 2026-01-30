import { Feed } from 'feed'
import { mkdir, writeFile } from 'fs/promises'

export async function generateRssFeed({ contents }) {
  let siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  let author = {
    name: 'Christopher Douglas',
    email: 'chris@folioready.com',
  }

  let feed = new Feed({
    title: author.name,
    description: 'All the things I find interesting',
    author,
    id: siteUrl,
    link: siteUrl,
    image: `${siteUrl}/favicon.ico`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    feedLinks: {
      rss2: `${siteUrl}/rss/feed.xml`,
      json: `${siteUrl}/rss/feed.json`,
    },
  })

  for (let content of contents) {
    let url = `${siteUrl}/${content.type}/${content.slug}`
    feed.addItem({
      title: content.title,
      id: url,
      link: url,
      description: content.description,
      author: [author],
      contributor: [author],
      date: new Date(content.date),
    })
  }

  await mkdir('./public/rss', { recursive: true })
  await Promise.all([
    writeFile('./public/rss/feed.xml', feed.rss2(), 'utf8'),
    writeFile('./public/rss/feed.json', feed.json1(), 'utf8'),
  ])
}
