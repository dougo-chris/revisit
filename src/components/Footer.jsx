import Link from 'next/link'

import { Container } from '@/components/Container'
import { getMenu } from '@/lib/getMenu'

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="transition hover:text-teal-500 dark:hover:text-teal-400"
    >
      {children}
    </Link>
  )
}

export function Footer() {
  const menu = getMenu();

  return (
    <footer className="mt-32">
      <Container.Outer>
        <div className="pt-10 pb-16 border-t border-zinc-100 dark:border-zinc-700/40">
          <Container.Inner>
            <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
              <div className="flex gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                {menu.map(({name, href}, index) => (
                  <NavLink
                    key={`footer_menu_${index}`}
                    href={href}
                  >
                    {name}
                  </NavLink>
                ))}
              </div>
              <p className="text-sm text-zinc-400 dark:text-zinc-500">
                &copy; {new Date().getFullYear()} Christopher Douglas. All rights
                reserved.
              </p>
            </div>
            <p className="mt-1 text-xs text-center lg:text-right text-zinc-400 dark:text-zinc-500">
              🇦🇺 Made in Melbourne, Australia
            </p>
          </Container.Inner>
        </div>

      </Container.Outer>
    </footer>
  )
}
