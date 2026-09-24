import Head from 'next/head'
import { SimpleLayout } from '@/components/SimpleLayout'
import { Content } from '@/components/Content'
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
        <div>
          <div className="flex max-w-4xl flex-col">
            {contents.map((content) => (
              <Content key={content.slug} content={content} />
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
