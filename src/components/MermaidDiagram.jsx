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
            primaryColor: isDark ? '#60a5fa' : '#2563eb',
            primaryTextColor: isDark ? '#f9fafb' : '#111827',
            primaryBorderColor: isDark ? '#2563eb' : '#3843d0',
            lineColor: isDark ? '#6b7280' : '#9ca3af',
            secondaryColor: isDark ? '#374151' : '#f3f4f6',
            tertiaryColor: isDark ? '#1f2937' : '#f9fafb',
            background: isDark ? '#111827' : '#ffffff',
            mainBkg: isDark ? '#1f2937' : '#f9fafb',
            secondBkg: isDark ? '#374151' : '#f3f4f6',
            tertiaryBkg: isDark ? '#4b5563' : '#e5e7eb',
            textColor: isDark ? '#f9fafb' : '#111827',
            border1: isDark ? '#4b5563' : '#d1d5db',
            border2: isDark ? '#6b7280' : '#9ca3af',
            arrowheadColor: isDark ? '#6b7280' : '#9ca3af',
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
          <pre className="mt-2 overflow-x-auto text-xs">{children}</pre>
        </details>
      </div>
    )
  }

  if (!svg) {
    return (
      <div className="my-6 flex justify-center overflow-x-auto rounded-lg bg-white p-4 dark:bg-neutral-900">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Loading diagram...
        </p>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="my-6 flex justify-center overflow-x-auto rounded-lg bg-white p-4 dark:bg-neutral-900"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
