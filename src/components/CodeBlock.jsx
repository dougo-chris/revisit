import { MermaidDiagram } from './MermaidDiagram'

// Helper to extract text content from React children
function getTextContent(children) {
  if (typeof children === 'string') {
    return children;
  }

  if (Array.isArray(children)) {
    return children.map(getTextContent).join('');
  }

  if (children && typeof children === 'object' && children.props) {
    return getTextContent(children.props.children);
  }

  return String(children || '');
}

export function CodeBlock({ node, inline, className, children, ...props }) {
  const match = /language-(\w+)/.exec(className || '')
  const language = match ? match[1] : null

  // Only process block-level code (not inline code)
  if (!inline && language === 'mermaid') {
    const code = getTextContent(children).trim();
    return <MermaidDiagram>{code}</MermaidDiagram>
  }

  return (
    <code className={className} {...props}>
      {children}
    </code>
  )
}

export function PreBlock({ children, ...props }) {
  // Check if this pre contains a mermaid code block
  if (children && children.props && children.props.className) {
    const match = /language-(\w+)/.exec(children.props.className || '')
    if (match && match[1] === 'mermaid') {
      // Return just the code block component, unwrapped from pre
      return children
    }
  }

  // For all other code blocks, return the pre wrapper
  return <pre {...props}>{children}</pre>
}
