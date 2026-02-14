import Head from 'next/head'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { Container } from '@/components/Container'
import { BriefcaseIcon } from '@/components/Icons'
import { getPageContent, getResume } from '@/lib/getContent'

function Resume({ resume }) {
  return (
    <div className="p-6 border rounded-lg border-neutral-100 dark:border-neutral-700/40">
      <h2 className="flex text-sm font-semibold text-neutral-900 dark:text-neutral-100">
        <BriefcaseIcon className="flex-none w-6 h-6" />
        <span className="ml-3">Work History</span>
      </h2>
      <ol className="mt-6 space-y-2 divide-y divide-neutral-100">
        {resume.map((role, roleIndex) => (
          <li key={roleIndex} className="flex gap-4 pt-2 first:pt-0">
            <dl className="flex flex-wrap flex-auto gap-x-2">
              <dt className="sr-only">Company</dt>
              <dd className="flex-none w-full text-sm font-medium text-neutral-900 dark:text-neutral-100">
                {role.company}
              </dd>
              <dt className="sr-only">Role</dt>
              <dd className="text-xs text-neutral-500 dark:text-neutral-400">
                {role.title}
              </dd>
              <dt className="sr-only">Date</dt>
              <dd
                className="ml-auto text-xs text-neutral-400 dark:text-neutral-500"
                aria-label={`${role.start} until ${role.end}`}
              >
                <span>
                  {role.start}
                </span>{' '}
                <span aria-hidden="true">—</span>{' '}
                <span>
                  {role.end}
                </span>
              </dd>
              { role.detail && (
                <>
                  <dt className="sr-only">Detail</dt>
                  <dd className="flex-none w-full ml-1 text-xs text-neutral-500 dark:text-neutral-400">
                    {role.detail}
                  </dd>
                </>
              )}
            </dl>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default function Work({ content, resume }) {
  return (
    <>
      <Head>
        <title>Work History - Christopher Douglas</title>
        <meta
          name="description"
          content={`Chris Douglas : ${content.heading}`}
        />
      </Head>
      <Container className="mt-8 sm:mt-16">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:order-first lg:row-span-2">
            <div className="prose dark:prose-invert prose-headings:text-neutral-800 dark:prose-headings:text-neutral-100 prose-a:text-blue-500 dark:prose-a:text-blue-400 prose-h1:text-3xl prose-h1:font-bold prose-h1:tracking-tight sm:prose-h1:text-4xl">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content.content}
              </ReactMarkdown>
            </div>
          </div>
          <div className="lg:pl-20">
            <Resume resume={resume} />
          </div>
        </div>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  const content = await getPageContent('work')
  const resume = await getResume()

  return {
    props: {
      content,
      resume,
    },
  }
}
