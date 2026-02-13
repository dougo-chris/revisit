import Head from 'next/head'

import { Content } from '@/components/Content'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getContents } from '@/lib/getContent'

export default function Article({ contents }) {
  return (
    <>
      <Head>
        <title>
          Revisit.fm - Thoughs and Ideas from Christopher Douglas
        </title>
        <meta
          name="description"
          content="I’m Chris, a software developer and entrepreneur based in Melbourne, Australia. I’m the founder and CEO of FolioReady, where we make document collection easy."
        />
      </Head>
      <SimpleLayout>
        <div>
          <div className="flex flex-col max-w-4xl">
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
      contents: await getContents('article'),
    },
  }
}