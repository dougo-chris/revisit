import Link from 'next/link'
import { formatDate } from '@/lib/formatDate'
import { ChevronRightIcon } from '@/components/Icons'

export function ListItem({ title, description, date, href }) {
  return (
    <article className="group">
      <Link href={href}>
        <div className="grid grid-cols-10 py-2 group-hover:bg-neutral-50 dark:group-hover:bg-neutral-800">
          {date && (
            <div className="col-span-2">
              <time className="text-sm text-neutral-400 dark:text-neutral-500">
                {formatDate(date)}
              </time>
            </div>
          )}
          <div className={date ? "col-span-8" : "col-span-10"}>
            <h2 className="text-base font-semibold text-neutral-800 dark:text-neutral-100 group-hover:text-blue-500 dark:group-hover:text-blue-400">
              <ChevronRightIcon className="inline-block w-5 h-5 -mt-0.5 stroke-current" />
              {title}
            </h2>
            <p className="ml-6 text-sm text-neutral-600 dark:text-neutral-400">
              {description}
            </p>
          </div>
        </div>
      </Link>
    </article>
  )
}
