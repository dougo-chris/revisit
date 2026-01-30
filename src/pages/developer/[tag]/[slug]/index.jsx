import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypePrism from '@mapbox/rehype-prism'

import { ArticleLayout } from '@/components/ArticleLayout'
import { getContents, getContent } from '@/lib/getContent'
import { CodeBlock } from '@/components/CodeBlock'

export default function DeveloperTagSlug({ content }) {
  return (
    <>
      <ArticleLayout
        meta={{
          title: content.title,
          description: content.description,
          date: content.date,
        }}
        previousPathname={`/developer/${content.tag}`}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypePrism]}
          components={{
            code: CodeBlock,
          }}
        >
          {content.content}
        </ReactMarkdown>
      </ArticleLayout>
    </>
  )
}

export const getStaticPaths = async () => {
	const contents = await getContents('developer');
  return {
    paths: contents.map(content => ({ params: { tag: content.tag, slug: content.slug } })),
    fallback: false,
  };
};

export async function getStaticProps({ params }) {
  const { slug } = params;

  const content = await getContent('developer', slug);
  return {
    props: {
      content: content,
    },
  }
}