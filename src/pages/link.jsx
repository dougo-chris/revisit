import Head from 'next/head'
import { SimpleLayout } from '@/components/SimpleLayout'
import { ChevronRightIcon } from '@/components/Icons'
import { ListItem } from '@/components/ListItem'

import sections from 'content/links.json'

function MenuItem({ tag, title, current }) {
  return (
    <a
      href={`/link/${tag}`}
      aria-current={current ? 'page' : undefined}
      className="font-base flex w-full p-1 text-sm tracking-tight aria-[current=page]:text-blue-500 dark:text-neutral-100 aria-[current=page]:dark:text-blue-400"
    >
      <ChevronRightIcon className="mt-0.5 inline-block h-5 w-5 stroke-current" />
      {title}
    </a>
  )
}

export default function List({ links, tag, description }) {
  return (
    <>
      <Head>
        <title>Developer - Christopher Douglas</title>
        <meta
          name="description"
          content={description || 'List of things I use and recommend.'}
        />
      </Head>
      <SimpleLayout>
        <div className="mt-8 flex flex-wrap md:flex-nowrap">
          <div className="h-full w-full border-l border-neutral-100 md:sticky md:top-32 md:mr-8 md:w-48 md:pl-3 dark:border-neutral-700">
            {sections.map((section) => (
              <MenuItem
                key={section.tag}
                tag={section.tag}
                title={section.title}
                current={section.tag == tag}
              />
            ))}
          </div>
          <div className="mt-8 w-full divide-y divide-neutral-100 md:-mt-2 dark:divide-neutral-800/10">
            {links.map((content, index) => (
              <ListItem
                key={`link_${tag}_${index}`}
                title={content.title}
                description={content.description}
                href={content.href || '#'}
              />
            ))}
          </div>
        </div>
      </SimpleLayout>
    </>
  )
}

export async function getStaticProps() {
  const section = sections[0]
  const { links } = await import(`content/link/${section.tag}.json`)

  return {
    props: {
      links: links,
      tag: section.tag,
      description: section.description,
    },
  }
}
