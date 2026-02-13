import { Card } from '@/components/Card'
import { ChevronRightIcon } from '@/components/Icons'
import { formatDate } from '@/lib/formatDate'

export function Content({ content }) {
  // Construct the href based on content type and structure
  let href
  if (content.type === 'developer') {
    href = `/developer/${content.tag}/${content.slug}`
  } else if (content.type === '_backlog') {
    href = `/backlog/${content.slug}`
  } else {
    href = `/${content.type}/${content.slug}`
  }

  return (
    <article className="group md:grid md:grid-cols-6 -mx-4 px-4 pt-6 pb-6 border-t border-neutral-100 dark:border-neutral-800/10 first:border-t-0 rounded-lg transition hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
      <Card className="md:col-span-5">
        <Card.Title href={href}>
          <ChevronRightIcon className="hidden w-5 h-5 -ml-6 -mt-0.5 stroke-current md:inline-block group-hover:stroke-blue-600 dark:group-hover:stroke-blue-500 transition" />
          {content.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={content.date}
          className="md:hidden"
        >
          {formatDate(content.date)}
        </Card.Eyebrow>
        <Card.Description>{content.description}</Card.Description>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={content.date}
        className="hidden md:block"
      >
        {formatDate(content.date)}
      </Card.Eyebrow>
    </article>
  )
}
