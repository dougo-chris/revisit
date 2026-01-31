import Head from 'next/head'
import { getContents } from '@/lib/getContent'
import { SimpleLayout } from '@/components/SimpleLayout'
import { ChevronRightIcon } from '@/components/Icons'
import { ListItem } from '@/components/ListItem'

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
              <ListItem
                key={content.slug}
                title={content.title}
                description={content.description}
                date={content.date}
                href={`/developer/${content.tag}/${content.slug}`}
                eyebrow={content.tag}
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