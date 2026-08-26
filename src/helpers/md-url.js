'use strict'

/**
 * Map an Antora HTML page URL to its LLM Markdown twin.
 *
 * Handles both URL styles:
 *   /savanna/main/overview/index.html → /savanna/main/overview/index.md
 *   /savanna/main/overview/           → /savanna/main/overview/index.md
 *   /savanna/main/overview/pricing    → /savanna/main/overview/pricing.md
 */
module.exports = (url) => {
  if (typeof url !== 'string') return url
  const match = /^(.*?)([?#].*)?$/.exec(url)
  const path = match[1]
  const rest = match[2] || ''
  if (/\.md$/i.test(path)) return url
  if (/\.html$/i.test(path)) return path.replace(/\.html$/i, '.md') + rest
  if (path.endsWith('/')) return path + 'index.md' + rest
  if (!path) return url
  return path + '.md' + rest
}
