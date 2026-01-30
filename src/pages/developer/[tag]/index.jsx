import { getContents } from '@/lib/getContent'
import Developer from '@/pages/developer'

import { tags } from 'content/tags.json'

export default function DeveloperTag({ tag, contents }) {
  return (
    <>
      <Developer contents={contents} tag={tag} />
    </>
  )
}

export const getStaticPaths = async () => {
  return {
    paths: tags.map(tag => ({ params: { tag: tag.tag } })),
    fallback: false,
  };
};

export async function getStaticProps({ params }) {
  const { tag } = params;
  const contents = await getContents('developer');
  return {
    props: {
      contents: contents.filter(content => content.tag == tag),
      tag: tag,
    },
  }
}
