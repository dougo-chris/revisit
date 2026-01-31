import Head from 'next/head'
import { SimpleLayout } from '@/components/SimpleLayout'
import { ChevronRightIcon } from '@/components/Icons'

import { getContents } from '@/lib/getContent'

function Content({ content }) {
  return (
    <article className="group">
      <a href={`/backlog/${content.slug}`}>
        <div className="grid grid-cols-10 py-2 group-hover:bg-zinc-50 dark:group-hover:bg-zinc-800">
          <div className="col-span-10 text-sm font-semibold text-zinc-800 lg:col-span-3 dark:text-white group-hover:text-teal-500 dark:group-hover:text-teal-400">
            <ChevronRightIcon className="inline-block w-5 h-5 -mt-0.5 stroke-current" />
            {content.title}
          </div>
          <div className="col-span-5 col-start-2 text-xs text-zinc-600 lg:col-span-5 lg:col-start-0 dark:text-zinc-400">
            {content.description}
          </div>
          <div className="col-span-4 mr-2 text-xs text-right text-zinc-600 lg:col-span-2 dark:text-zinc-400">
            {content.date}
          </div>
        </div>
      </a>
    </article>
 );
}

export default function Backlog({ contents }) {
  return (
    <>
      <Head>
        <title>Developer - Christopher Douglas</title>
        <meta
          name="description"
          content="List of things I use and recommend."
        />
      </Head>
      <SimpleLayout>
        <div className="flex flex-wrap md:flex-nowrap">
          <div className="w-full divide-y divide-zinc-200 md:-mt-2">
            {contents.map((content, index) => (
              <Content
                key={`backlog_${content.tag}_${index}`}
                content={content}
              />
            ))}
          </div>
        </div>
      </SimpleLayout>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      contents: await getContents('_backlog'),
    },
  }
}