import Head from 'next/head'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { ChevronRightIcon } from '@/components/Icons'

import { formatDate } from '@/lib/formatDate'
import { getContents } from '@/lib/getContent'

function Content({ content }) {
  return (
    <article className="md:grid md:grid-cols-6 md:items-baseline">
      <Card className="md:col-span-5">
        <Card.Title href={`/${content.type}/${content.slug}`}>
          <ChevronRightIcon className="hidden w-5 h-5 -ml-6 -mt-0.5 stroke-current md:inline-block" />
          {content.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={content.date}
          className="md:hidden"
          decorate
        >
          {formatDate(content.date)}
        </Card.Eyebrow>
        <Card.Description>{content.description}</Card.Description>
        <Card.Cta>Read More</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={content.date}
        className="hidden mt-1 md:block"
      >
        {formatDate(content.date)}
      </Card.Eyebrow>
    </article>
  )
}

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
        <div className="md:border-l md:border-neutral-100 md:pl-6 md:dark:border-neutral-700">
          <div className="flex flex-col max-w-4xl space-y-8">
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