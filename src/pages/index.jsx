import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  LinkedInIcon,
  TwitterIcon,
  MailIcon,
} from '@/components/Icons'
import portraitImage from '@/images/portrait.jpg'

import { getAllContents } from '@/lib/getContent'
import { generateRssFeed } from '@/lib/generateRssFeed'

function getIndex() {
  return {
    heading:'Software Engineer & Founder.',
    details: [
      'I\'m a seasoned software developer based in Melbourne, Australia.',
      'For the last 5 years I\'ve worked on large scale backend systems that process millions of records and are critical to maintaining network availability',
      'I\'m also the founder of Folioready, a SAAS that help companies get documents from their clients.',
      'Previously I was the first employee for a startup building recommendations engines used by online music and video services.' +
        ' The company was sold to Microsoft where I continued to work for a number of years.',
      'I\'m a hands on developer, with startup experience, who leads teams by being with them in doing the work.'
    ]
  }
}

function SocialLink({ className, href, children, icon: Icon }) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="flex text-sm font-medium transition group text-zinc-800 hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-400"
      >
        <Icon className="flex-none w-6 h-6 transition fill-zinc-500 group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}
function Social() {
  return (
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
        className="pt-8 mt-8 border-t border-zinc-100 dark:border-zinc-700/40"
      >
        chris@folioready.com
      </SocialLink>
    </ul>
  )
}

export default function Index() {
  const index = getIndex();

  return (
    <>
      <Head>
        <title>Revisit.fm : Christopher Douglas</title>
        <meta
          name="description"
          content={`Chris Douglas : ${index.heading}`}
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
                className="object-cover aspect-square rotate-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800"
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-4xl">
              {index.heading}
            </h1>
            <div className="mt-6 text-base space-y-7 text-zinc-600 dark:text-zinc-400">
              {index.details.map((detail, index) => (
                <p key={index}>{detail}</p>
              ))}
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
  if (process.env.NODE_ENV === 'production' && process.env.GENERATE_RSS === 'true') {
    let contents = await getAllContents()
    await generateRssFeed({ contents })
  }

 return {
    props: {},
  }
}
