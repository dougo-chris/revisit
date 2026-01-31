import { useEffect, useRef, useState } from 'react'

export function MermaidDiagram({ children }) {
  const containerRef = useRef(null)
  const [svg, setSvg] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    const renderDiagram = async () => {
      try {
        if (!children || typeof children !== 'string' || !children.trim()) {
          throw new Error('No diagram content provided')
        }

        const mermaid = (await import('mermaid')).default

        const isDark = document.documentElement.classList.contains('dark')

        mermaid.initialize({
          startOnLoad: false,
          theme: 'base',
          themeVariables: {
            primaryColor: isDark ? '#2dd4bf' : '#0d9488',
            primaryTextColor: isDark ? '#fafafa' : '#18181b',
            primaryBorderColor: isDark ? '#0d9488' : '#0f766e',
            lineColor: isDark ? '#71717a' : '#a1a1aa',
            secondaryColor: isDark ? '#3f3f46' : '#f4f4f5',
            tertiaryColor: isDark ? '#27272a' : '#fafafa',
            background: isDark ? '#18181b' : '#ffffff',
            mainBkg: isDark ? '#27272a' : '#fafafa',
            secondBkg: isDark ? '#3f3f46' : '#f4f4f5',
            tertiaryBkg: isDark ? '#52525b' : '#e4e4e7',
            textColor: isDark ? '#fafafa' : '#18181b',
            border1: isDark ? '#52525b' : '#d4d4d8',
            border2: isDark ? '#71717a' : '#a1a1aa',
            arrowheadColor: isDark ? '#71717a' : '#a1a1aa',
            fontFamily: 'ui-sans-serif, system-ui, sans-serif',
            fontSize: '16px',
          },
        })

        const id = `mermaid-${Math.random().toString(36).substring(2, 11)}`
        const { svg } = await mermaid.render(id, children)

        if (mounted) {
          setSvg(svg)
          setError(null)
        }
      } catch (err) {
        if (mounted) {
          setError(err.message)
          setSvg('')
        }
      }
    }

    renderDiagram()

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          renderDiagram()
        }
      })
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => {
      mounted = false
      observer.disconnect()
    }
  }, [children])

  if (error) {
    return (
      <div className="rounded-lg border border-red-500 bg-red-50 p-4 dark:bg-red-950">
        <p className="text-sm text-red-800 dark:text-red-200">
          <strong>Mermaid Error:</strong> {error}
        </p>
        <details className="mt-2">
          <summary className="cursor-pointer text-xs">View source</summary>
          <pre className="mt-2 text-xs overflow-x-auto">{children}</pre>
        </details>
      </div>
    )
  }

  if (!svg) {
    return (
      <div className="my-6 flex justify-center overflow-x-auto rounded-lg bg-white p-4 dark:bg-zinc-900">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Loading diagram...</p>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="my-6 flex justify-center overflow-x-auto rounded-lg bg-white p-4 dark:bg-zinc-900"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
