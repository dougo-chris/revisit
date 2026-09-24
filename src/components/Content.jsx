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
    <article className="group -mx-4 rounded-lg border-t border-neutral-100 px-4 pt-6 pb-6 transition first:border-t-0 hover:bg-neutral-50 md:grid md:grid-cols-6 dark:border-neutral-800/10 dark:hover:bg-neutral-800/50">
      <Card className="md:col-span-5">
        <Card.Title href={href}>
          <ChevronRightIcon className="-mt-0.5 -ml-6 hidden h-5 w-5 stroke-current transition group-hover:stroke-blue-600 md:inline-block dark:group-hover:stroke-blue-500" />
          {content.title}
        </Card.Title>
        <Card.Eyebrow as="time" dateTime={content.date} className="md:hidden">
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
