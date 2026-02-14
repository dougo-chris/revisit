import About from '@/pages/about'
import { getAllContents, getPageContent } from '@/lib/getContent'
import { generateRssFeed } from '@/lib/generateRssFeed'

export default About

export async function getStaticProps() {
  if (process.env.NODE_ENV === 'production' && process.env.GENERATE_RSS === 'true') {
    let contents = await getAllContents()
    await generateRssFeed({ contents })
  }

  const content = await getPageContent('about')

  return {
    props: {
      content,
    },
  }
}
