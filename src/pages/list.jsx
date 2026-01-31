import Head from 'next/head'
import { SimpleLayout } from '@/components/SimpleLayout'
import { ChevronRightIcon } from '@/components/Icons'

import sections from 'content/lists.json'

function MenuItem({ tag, title, current }) {
  return (
    <a
      href={`/list/${tag}`}
      aria-selected={current ? 'true' : 'false'}
      className="flex w-full p-1 text-sm tracking-tight font-base dark:text-zinc-100 aria-selected:text-teal-500 aria-selected:dark:text-teal-400"
    >
      <ChevronRightIcon className="inline-block w-5 h-5 mt-0.5 stroke-current" />
      {title}
    </a>
  );
}

function Content({ content }) {
  return (
    <article className="group">
      <a href={content.href}>
        <div className="grid grid-cols-10 py-3 group-hover:bg-zinc-50 dark:group-hover:bg-zinc-800">
          <div className="col-span-10 text-sm font-semibold text-zinc-800 lg:col-span-3 dark:text-white group-hover:text-teal-500 dark:group-hover:text-teal-400">
            <ChevronRightIcon className="inline-block w-5 h-5 -mt-0.5 stroke-current" />
            {content.title}
          </div>
          <div className="col-span-9 col-start-2 text-xs text-zinc-600 lg:col-span-7 lg:col-start-0 dark:text-zinc-400">
            {content.description}
          </div>
        </div>
      </a>
    </article>
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
          <div className="h-full w-full md:w-[12rem] md:mr-8 md:sticky md:top-32 border-l border-zinc-100 md:pl-3 dark:border-zinc-700">
            {sections.map((section) => (
              <MenuItem
                key={section.tag}
                tag={section.tag}
                title={section.title}
                current={section.tag == tag}
              />
            ))}
          </div>
          <div className="w-full mt-8 divide-y divide-zinc-200 md:-mt-2">
            {description && (
              <p className="mb-2 text-sm text-zinc-600 dark:text-zinc-400">
                {description}
              </p>
            )}
            {links.map((content, index) => (
              <Content
                key={`link_${content.tag}_${index}`}
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