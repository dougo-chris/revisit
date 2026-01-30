import List from '@/pages/list'

import sections from 'content/lists.json'

export default function ListTag({ links, tag, description }) {
  return (
    <>
      <List links={links} tag={tag} description={description} />
    </>
  )
}

export const getStaticPaths = async () => {
  return {
    paths: sections.map(section => ({ params: { tag: section.tag } })),
    fallback: false,
  };
};

export async function getStaticProps({ params }) {
  const { tag } = params;
  const section = sections.find(section => section.tag === tag);
  const { links } = await import(`content/list/${tag}.json`);

  return {
    props: {
      links: links,
      tag: tag,
      description: section.description || null,
    },
  }
}
