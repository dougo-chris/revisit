import { MermaidDiagram } from './MermaidDiagram'

export function CodeBlock({ className, children, ...props }) {
  const match = /language-(\w+)/.exec(className || '')
  const language = match ? match[1] : null

  if (language === 'mermaid') {
    const code = typeof children === 'string' ? children : String(children)
    return <MermaidDiagram>{code.replace(/\n$/, '')}</MermaidDiagram>
  }

  return (
    <code className={className} {...props}>
      {children}
    </code>
  )
}
