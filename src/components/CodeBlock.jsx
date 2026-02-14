import { MermaidDiagram } from './MermaidDiagram'
import { InfographicBlock } from './Infographic'

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
  // Handle className as string or array
  const classNameStr = Array.isArray(className) ? className.join(' ') : (className || '')
  const match = /language-(\w+)/.exec(classNameStr)
  const language = match ? match[1] : null

  // Only process block-level code (not inline code)
  if (!inline && language === 'mermaid') {
    const code = getTextContent(children).trim();
    return <MermaidDiagram>{code}</MermaidDiagram>
  }

  // Handle infographic types
  if (!inline && ['stat-block', 'timeline', 'comparison-table', 'progress-bar'].includes(language)) {
    const code = getTextContent(children).trim()
    return <InfographicBlock language={language}>{code}</InfographicBlock>
  }

  // Filter out the node prop to avoid serialization issues
  const { node: _, ...validProps } = { node, ...props }

  return (
    <code className={className} {...validProps}>
      {children}
    </code>
  )
}

export function PreBlock({ children, node, ...props }) {
  // Check if this pre contains a mermaid or infographic code block
  if (children && typeof children === 'object') {
    const childProps = children.props || {}
    const className = childProps.className

    // Handle className as string or array
    const classNameStr = Array.isArray(className) ? className.join(' ') : (className || '')

    const match = /language-(\w+)/.exec(classNameStr)
    const infographicTypes = ['mermaid', 'stat-block', 'timeline', 'comparison-table', 'progress-bar']

    if (match && infographicTypes.includes(match[1])) {
      // Return just the code block component, unwrapped from pre
      return children
    }
  }

  // For all other code blocks, return the pre wrapper (without node prop)
  return <pre {...props}>{children}</pre>
}
