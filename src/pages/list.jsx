import Head from 'next/head'
import { SimpleLayout } from '@/components/SimpleLayout'
import { ChevronRightIcon } from '@/components/Icons'
import { ListItem } from '@/components/ListItem'

import sections from 'content/lists.json'

function MenuItem({ tag, title, current }) {
  return (
    <a
      href={`/list/${tag}`}
      aria-selected={current ? 'true' : 'false'}
      className="flex w-full p-1 text-sm tracking-tight font-base dark:text-neutral-100 aria-selected:text-blue-500 aria-selected:dark:text-blue-400"
    >
      <ChevronRightIcon className="inline-block w-5 h-5 mt-0.5 stroke-current" />
      {title}
    </a>
  );
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
        <div className="flex flex-wrap mt-8 md:flex-nowrap">
          <div className="h-full w-full md:w-48 md:mr-8 md:sticky md:top-32 border-l border-neutral-100 md:pl-3 dark:border-neutral-700">
            {sections.map((section) => (
              <MenuItem
                key={section.tag}
                tag={section.tag}
                title={section.title}
                current={section.tag == tag}
              />
            ))}
          </div>
          <div className="w-full mt-8 divide-y divide-neutral-200 md:-mt-2">
            {description && (
              <p className="mb-2 text-sm text-neutral-600 dark:text-neutral-400">
                {description}
              </p>
            )}
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
  const { links } = await import(`content/list/${section.tag}.json`);

  return {
    props: {
      links: links,
      tag: section.tag,
      description: section.description,
    },
  }
}