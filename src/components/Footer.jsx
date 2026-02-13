import Link from 'next/link'

import { Container } from '@/components/Container'
import { getMenu } from '@/lib/getMenu'

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="px-3 py-2 transition hover:text-blue-500 dark:hover:text-blue-400"
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
        <div className="pt-10 pb-16 border-t border-neutral-100 dark:border-neutral-700/40">
          <Container.Inner>
            <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
              <div className="flex gap-6 text-sm font-medium text-neutral-800 dark:text-neutral-200">
                {menu.map(({name, href}, index) => (
                  <NavLink
                    key={`footer_menu_${index}`}
                    href={href}
                  >
                    {name}
                  </NavLink>
                ))}
              </div>
              <p className="text-sm text-neutral-400 dark:text-neutral-500">
                &copy; {new Date().getFullYear()} Christopher Douglas. All rights
                reserved.
              </p>
            </div>
            <p className="mt-1 text-xs text-center lg:text-right text-neutral-400 dark:text-neutral-500">
              🇦🇺 Made in Melbourne, Australia
            </p>
          </Container.Inner>
        </div>

      </Container.Outer>
    </footer>
  )
}
