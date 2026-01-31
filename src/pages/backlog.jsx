import Head from 'next/head'
import { SimpleLayout } from '@/components/SimpleLayout'
import { ListItem } from '@/components/ListItem'

import { getContents } from '@/lib/getContent'

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
              <ListItem
                key={`backlog_${content.tag}_${index}`}
                title={content.title}
                description={content.description}
                date={content.date}
                href={`/backlog/${content.slug}`}
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