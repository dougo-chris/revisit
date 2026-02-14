import { visit } from 'unist-util-visit'
import { refractor } from 'refractor'

// Languages that should not be processed by Prism
const CUSTOM_LANGUAGES = new Set([
  'mermaid',
  'stat-block',
  'timeline',
  'comparison-table',
  'progress-bar',
])

/**
 * Custom rehype plugin that highlights code with Prism but excludes custom languages
 * This is based on @mapbox/rehype-prism but filters out infographic code blocks
 */
export default function rehypePrismCustom() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (!parent || parent.tagName !== 'pre' || node.tagName !== 'code') {
        return
      }

      const className = node.properties.className || []

      if (!Array.isArray(className)) {
        return
      }

      const languageClass = className.find(c => c.startsWith('language-'))

      if (!languageClass) {
        return
      }

      const language = languageClass.replace('language-', '')

      // Skip custom languages (they'll be handled by our React components)
      if (CUSTOM_LANGUAGES.has(language)) {
        return
      }

      // Only process if refractor supports this language
      if (!refractor.registered(language)) {
        return
      }

      try {
        const result = refractor.highlight(
          node.children[0]?.value || '',
          language
        )
        node.children = result.children
      } catch (err) {
        // If highlighting fails, leave the code as-is
        console.warn(`Failed to highlight language: ${language}`, err)
      }
    })
  }
}
