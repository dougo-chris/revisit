import Head from 'next/head'
import { formatDate } from '@/lib/formatDate'
import { getContents } from '@/lib/getContent'
import { SimpleLayout } from '@/components/SimpleLayout'
import { ChevronRightIcon } from '@/components/Icons'

import { tags } from 'content/tags.json'

function MenuItem({ tag, title, selected }) {
  return (
    <a
      href={tag ? `/developer/${tag}` : '/developer'}
      aria-selected={selected ? 'true' : 'false'}
      className="flex w-full p-1 text-sm tracking-tight font-base dark:text-zinc-100 aria-selected:text-teal-500 aria-selected:dark:text-teal-400"
    >
      <ChevronRightIcon className="inline-block w-5 h-5 mt-0.5 stroke-current" />
      {title}
    </a>
  );
}

function Content({ content }) {
  return (
    <article className="py-4 group hover:bg-zinc-50 dark:hover:bg-zinc-800">
      <a href={`/developer/${content.tag}/${content.slug}`}>
        <h3 className="flex justify-between text-sm font-semibold text-zinc-800 dark:text-white group-hover:text-teal-500 dark:group-hover:text-teal-400">
          <span className="ml-2">
            <ChevronRightIcon className="inline-block w-5 h-5 stroke-current" />
            {content.title}
          </span>
          <span className="mr-2 text-xs text-zinc-500 group-hover:text-teal-500 dark:group-hover:text-teal-400">
            {formatDate(content.date)}
          </span>
        </h3>
        <p className="ml-8 mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">
          {content.description}
        </p>
      </a>
    </article>
 );
}

export default function Developer({ contents, tag }) {
  return (
    <>
      <Head>
        <title>Developer - Christopher Douglas</title>
        <meta
          name="description"
          content="Developer Tools & Techniques"
        />
      </Head>
      <SimpleLayout>
        <div className="flex flex-wrap mt-8 md:flex-nowrap">
          <div className="h-full w-full md:w-[12rem] md:mr-8 md:sticky md:top-32 border-l border-zinc-100 md:pl-3 dark:border-zinc-700">
            <MenuItem
              key='everything'
              tag={null}
              title="Everything"
              selected={'everything' == tag}
            />

            {tags.map((item) => (
              <MenuItem
                key={item.tag}
                tag={item.tag}
                title={item.title}
                selected={item.tag == tag}
              />
            ))}
          </div>
          <div className="w-full divide-y divide-zinc-200 md:-mt-2">
            {contents.map((content) => (
              <Content
                key={content.slug}
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
      contents: await getContents('developer'),
      tag: 'everything',
    },
  }
}