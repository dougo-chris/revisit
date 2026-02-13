import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Popover, PopoverButton, PopoverPanel, PopoverBackdrop } from '@headlessui/react'
import clsx from 'clsx'

import { getMenu } from '@/lib/getMenu'
import { Container } from '@/components/Container'
import avatarImage from '@/images/avatar.jpg'

import {
  SunIcon,
  MoonIcon,
  CloseIcon,
  ChevronDownIcon,
} from '@/components/Icons'

function MobileNavItem({ href, children }) {
  return (
    <li>
      <PopoverButton as={Link} href={href} className="block py-2">
        {children}
      </PopoverButton>
    </li>
  )
}

function MobileNavigation(props) {
  const { menu } = props

  return (
    <Popover {...props}>
      <PopoverButton className="flex items-center px-4 py-2 text-sm font-medium rounded-full shadow-lg group bg-white/90 text-neutral-800 shadow-neutral-800/5 ring-1 ring-neutral-900/5 backdrop-blur dark:bg-neutral-800/90 dark:text-neutral-200 dark:ring-white/10 dark:hover:ring-white/20">
        Menu
        <ChevronDownIcon className="w-2 h-auto ml-3 stroke-neutral-500 group-hover:stroke-neutral-700 dark:group-hover:stroke-neutral-400" />
      </PopoverButton>
      <PopoverBackdrop
        transition
        className="fixed inset-0 z-50 bg-neutral-800/40 backdrop-blur-sm dark:bg-black/80 transition duration-150 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in"
      />
      <PopoverPanel
        transition
        focus
        className="fixed z-50 p-8 origin-top bg-white inset-x-4 top-8 rounded-lg ring-1 ring-neutral-900/5 dark:bg-neutral-900 dark:ring-neutral-800 transition duration-150 data-closed:opacity-0 data-closed:scale-95 data-enter:ease-out data-leave:ease-in"
      >
        <div className="flex flex-row-reverse items-center justify-between">
          <PopoverButton aria-label="Close menu" className="p-1 -m-1">
            <CloseIcon className="w-6 h-6 text-neutral-500 dark:text-neutral-400" />
          </PopoverButton>
          <h2 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
            Navigation
          </h2>
        </div>
        <nav className="mt-6">
          <ul className="-my-2 text-base divide-y divide-neutral-100 text-neutral-800 dark:divide-neutral-100/5 dark:text-neutral-300">
            {menu.map(({name, href}, index) => (
              <MobileNavItem
                key={`header_mobile_menu_${index}`}
                href={href}
              >
                {name}
              </MobileNavItem>
            ))}
          </ul>
        </nav>
      </PopoverPanel>
    </Popover>
  )
}

function NavItem({ href, children }) {
  let isActive = useRouter().pathname.startsWith(href) && href !== '/'

  return (
    <>
      <li>
        <Link
          href={href}
          className={clsx(
            'relative block px-3 py-2 transition',
            isActive
              ? 'text-blue-500 dark:text-blue-400'
              : 'hover:text-blue-500 dark:hover:text-blue-400'
          )}
        >
          {children}
          {isActive && (
            <span className="absolute h-px inset-x-1 -bottom-px bg-linear-to-r from-blue-500/0 via-blue-500/40 to-blue-500/0 dark:from-blue-400/0 dark:via-blue-400/40 dark:to-blue-400/0" />
          )}
        </Link>
      </li>
    </>
  )
}

function DesktopNavigation(props) {
  const { menu } = props

  return (
    <nav {...props}>
      <ul className="flex px-3 text-sm font-medium rounded-full shadow-lg bg-white/90 text-neutral-800 shadow-neutral-800/5 ring-1 ring-neutral-900/5 backdrop-blur dark:bg-neutral-800/90 dark:text-neutral-200 dark:ring-white/10">
        {menu.map(({name, href}, index) => (
          <NavItem
            key={`header_desktop_menu_${index}`}
            href={href}
          >
            {name}
          </NavItem>
        ))}
      </ul>
    </nav>
  )
}

function ModeToggle() {
  function disableTransitionsTemporarily() {
    document.documentElement.classList.add('[&_*]:!transition-none')
    window.setTimeout(() => {
      document.documentElement.classList.remove('[&_*]:!transition-none')
    }, 0)
  }

  function toggleMode() {
    disableTransitionsTemporarily()

    let darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    let isSystemDarkMode = darkModeMediaQuery.matches
    let isDarkMode = document.documentElement.classList.toggle('dark')

    if (isDarkMode === isSystemDarkMode) {
      delete window.localStorage.isDarkMode
    } else {
      window.localStorage.isDarkMode = String(isDarkMode)
    }
  }

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      className="px-3 py-2 transition rounded-full shadow-lg group bg-white/90 shadow-neutral-800/5 ring-1 ring-neutral-900/5 backdrop-blur dark:bg-neutral-800/90 dark:ring-white/10 dark:hover:ring-white/20"
      onClick={toggleMode}
    >
      <SunIcon className="h-6 w-6 fill-neutral-100 stroke-neutral-500 transition group-hover:fill-neutral-200 group-hover:stroke-neutral-700 dark:hidden dark:fill-blue-50 dark:stroke-blue-500 dark:group-hover:fill-blue-50 dark:group-hover:stroke-blue-600" />
      <MoonIcon className="hidden h-6 w-6 fill-neutral-700 stroke-neutral-500 transition dark:block dark:group-hover:stroke-neutral-400 not-dark:fill-blue-400/10 not-dark:stroke-blue-500" />
    </button>
  )
}

function clamp(number, a, b) {
  let min = Math.min(a, b)
  let max = Math.max(a, b)
  return Math.min(Math.max(number, min), max)
}

function AvatarContainer({ className, ...props }) {
  return (
    <div
      className={clsx(
        className,
        'h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-neutral-800/5 ring-1 ring-neutral-900/5 backdrop-blur dark:bg-neutral-800/90 dark:ring-white/10'
      )}
      {...props}
    />
  )
}

function Avatar({ large = false, className, ...props }) {
  return (
    <Link
      href="/"
      aria-label="Home"
      className={clsx(className, 'pointer-events-auto')}
      {...props}
    >
      <Image
        src={avatarImage}
        alt=""
        sizes={large ? '4rem' : '2.25rem'}
        className={clsx(
          'rounded-full bg-neutral-100 object-cover dark:bg-neutral-800',
          large ? 'h-16 w-16' : 'h-9 w-9'
        )}
        priority
      />
    </Link>
  )
}

export function Header() {
  let isHomePage = useRouter().pathname === '/'

  const menu = getMenu();

  let headerRef = useRef()
  let avatarRef = useRef()
  let isInitial = useRef(true)

  useEffect(() => {
    let downDelay = avatarRef.current?.offsetTop ?? 0
    let upDelay = 64

    function setProperty(property, value) {
      document.documentElement.style.setProperty(property, value)
    }

    function removeProperty(property) {
      document.documentElement.style.removeProperty(property)
    }

    function updateHeaderStyles() {
      let { top, height } = headerRef.current.getBoundingClientRect()
      let scrollY = clamp(
        window.scrollY,
        0,
        document.body.scrollHeight - window.innerHeight
      )

      if (isInitial.current) {
        setProperty('--header-position', 'sticky')
      }

      setProperty('--content-offset', `${downDelay}px`)

      if (isInitial.current || scrollY < downDelay) {
        setProperty('--header-height', `${downDelay + height}px`)
        setProperty('--header-mb', `${-downDelay}px`)
      } else if (top + height < -upDelay) {
        let offset = Math.max(height, scrollY - upDelay)
        setProperty('--header-height', `${offset}px`)
        setProperty('--header-mb', `${height - offset}px`)
      } else if (top === 0) {
        setProperty('--header-height', `${scrollY + height}px`)
        setProperty('--header-mb', `${-scrollY}px`)
      }

      if (top === 0 && scrollY > 0 && scrollY >= downDelay) {
        setProperty('--header-inner-position', 'fixed')
        removeProperty('--header-top')
        removeProperty('--avatar-top')
      } else {
        removeProperty('--header-inner-position')
        setProperty('--header-top', '0px')
        setProperty('--avatar-top', '0px')
      }
    }

    function updateStyles() {
      updateHeaderStyles()
      isInitial.current = false
    }

    updateStyles()
    window.addEventListener('scroll', updateStyles, { passive: true })
    window.addEventListener('resize', updateStyles)

    return () => {
      window.removeEventListener('scroll', updateStyles, { passive: true })
      window.removeEventListener('resize', updateStyles)
    }
  }, [isHomePage])

  return (
    <>
      <header
        className="relative z-50 flex flex-col pointer-events-none"
        style={{
          height: 'var(--header-height)',
          marginBottom: 'var(--header-mb)',
        }}
      >
        <div
          ref={headerRef}
          className="top-0 z-10 h-16 pt-6"
          style={{ position: 'var(--header-position)' }}
        >
          <Container
            className="top-(--header-top,--spacing(6)) w-full"
            style={{ position: 'var(--header-inner-position)' }}
          >
            <div className="relative flex gap-4">
              <div className="flex flex-1">
                <AvatarContainer>
                  <Avatar />
                </AvatarContainer>
              </div>
              <div className="flex justify-end flex-1 md:justify-center">
                <MobileNavigation menu={menu} className="pointer-events-auto md:hidden" />
                <DesktopNavigation menu={menu} className="hidden pointer-events-auto md:block" />
              </div>
              <div className="flex justify-end md:flex-1">
                <div className="pointer-events-auto">
                  <ModeToggle />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </header>
      {isHomePage && <div style={{ height: 'var(--content-offset)' }} />}
    </>
  )
}
