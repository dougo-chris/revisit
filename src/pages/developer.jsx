import Head from 'next/head'
import { getContents } from '@/lib/getContent'
import { SimpleLayout } from '@/components/SimpleLayout'
import { Content } from '@/components/Content'

import { tags } from 'content/tags.json'

function TabItem({ tag, title, selected }) {
  return (
    <a
      href={tag ? `/developer/${tag}` : '/developer'}
      aria-current={selected ? 'page' : undefined}
      className="relative px-4 py-2 text-sm font-medium whitespace-nowrap text-neutral-600 transition hover:text-neutral-900 aria-[current=page]:text-blue-600 dark:text-neutral-400 dark:hover:text-neutral-200 dark:aria-[current=page]:text-blue-500"
    >
      {title}
      {selected && (
        <span className="absolute right-0 bottom-0 left-0 h-0.5 bg-blue-600 dark:bg-blue-500" />
      )}
    </a>
  )
}

export default function Developer({ contents, tag }) {
  return (
    <>
      <Head>
        <title>Developer - Christopher Douglas</title>
        <meta name="description" content="Developer Tools & Techniques" />
      </Head>
      <SimpleLayout>
        <div className="mt-8">
          <div className="border-b border-neutral-200 dark:border-neutral-700">
            <nav className="-mb-px flex justify-end overflow-x-auto">
              <TabItem
                key="everything"
                tag={null}
                title="Everything"
                selected={'everything' == tag}
              />

              {tags.map((item) => (
                <TabItem
                  key={item.tag}
                  tag={item.tag}
                  title={item.title}
                  selected={item.tag == tag}
                />
              ))}
            </nav>
          </div>
          <div className="mt-8">
            <div className="flex max-w-4xl flex-col">
              {contents.map((content) => (
                <Content key={content.slug} content={content} />
              ))}
            </div>
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
