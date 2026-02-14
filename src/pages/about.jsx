import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { Container } from '@/components/Container'
import {
  LinkedInIcon,
  TwitterIcon,
  MailIcon,
} from '@/components/Icons'
import portraitImage from '@/images/portrait.jpg'
import { getPageContent } from '@/lib/getContent'

function SocialLink({ className, href, children, icon: Icon }) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="flex text-sm font-medium transition group text-neutral-800 hover:text-blue-500 dark:text-neutral-200 dark:hover:text-blue-400"
      >
        <Icon className="flex-none w-6 h-6 transition fill-neutral-500 group-hover:fill-blue-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function Social() {
  return (
    <div className="p-6 border rounded-lg border-neutral-100 dark:border-neutral-700/40">
      <ul role="list">
        <SocialLink href="https://x.com/dougo_chris" icon={TwitterIcon}>
          Follow on Twitter
        </SocialLink>
        <SocialLink href="https://www.linkedin.com/in/dougo-chris" icon={LinkedInIcon} className="mt-4">
          Follow on LinkedIn
        </SocialLink>
        <SocialLink
          href="mailto:chris@folioready.com"
          icon={MailIcon}
          className="pt-8 mt-8 border-t border-neutral-100 dark:border-neutral-700/40"
        >
          chris@folioready.com
        </SocialLink>
      </ul>
    </div>
  )
}

export default function About({ content }) {
  return (
    <>
      <Head>
        <title>{content.title} - Christopher Douglas</title>
        <meta
          name="description"
          content="Software engineer and founder based in Melbourne, Australia"
        />
      </Head>
      <Container className="mt-8 sm:mt-16">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Image
                src={portraitImage}
                alt=""
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="object-cover aspect-square rotate-3 rounded-lg bg-neutral-100 dark:bg-neutral-800"
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <div className="prose dark:prose-invert prose-headings:text-neutral-800 dark:prose-headings:text-neutral-100 prose-a:text-blue-500 dark:prose-a:text-blue-400 prose-h1:text-3xl prose-h1:font-bold prose-h1:tracking-tight sm:prose-h1:text-4xl">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content.content}
              </ReactMarkdown>
            </div>
          </div>
          <div className="lg:pl-20">
            <Social />
          </div>
        </div>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  const content = await getPageContent('about')

  return {
    props: {
      content,
    },
  }
}
