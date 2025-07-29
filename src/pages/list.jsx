import Head from 'next/head'
import { SimpleLayout } from '@/components/SimpleLayout'
import { ChevronRightIcon } from '@/components/Icons'

import sections from '@/../content/lists.yaml'

function MenuItem({ tag, title, current }) {
  return (
    <a
      href={`/list/${tag}`}
      aria-selected={current ? 'true' : 'false'}
      className="flex w-full p-1 text-sm tracking-tight font-base dark:text-gray-100 aria-selected:text-teal-500 aria-selected:dark:text-teal-400"
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
        <div className="grid grid-cols-10 py-2 group-hover:bg-gray-50 dark:group-hover:bg-zinc-800">
          <div className="col-span-10 text-sm font-semibold text-gray-800 lg:col-span-3 dark:text-white group-hover:text-teal-500 dark:group-hover:text-teal-400">
            <ChevronRightIcon className="inline-block w-5 h-5 -mt-0.5 stroke-current" />
            {content.title}
          </div>
          <div className="col-span-9 col-start-2 text-xs text-gray-600 lg:col-span-7 lg:col-start-0 dark:text-gray-400">
            {content.description}
          </div>
        </div>
      </a>
    </article>
 );
}

export default function List({ links, tag }) {
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
          <div className="w-full mt-8 divide-y divide-gray-200 md:-mt-2">
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
  return {
    props: {
      links: sections[0].links,
      tag: sections[0].tag,
    },
  }
}