import Head from 'next/head'
import { getContents } from '@/lib/getContent'
import { SimpleLayout } from '@/components/SimpleLayout'
import { Content } from '@/components/Content'

import { tags } from 'content/tags.json'

function TabItem({ tag, title, selected }) {
  return (
    <a
      href={tag ? `/developer/${tag}` : '/developer'}
      aria-selected={selected ? 'true' : 'false'}
      className="relative px-4 py-2 text-sm font-medium transition whitespace-nowrap aria-selected:text-blue-600 dark:aria-selected:text-blue-500 text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200"
    >
      {title}
      {selected && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-500" />
      )}
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
        <div className="mt-8">
          <div className="border-b border-neutral-200 dark:border-neutral-700">
            <nav className="flex justify-end -mb-px overflow-x-auto">
              <TabItem
                key='everything'
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
            <div className="flex flex-col max-w-4xl">
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