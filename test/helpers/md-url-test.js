'use strict'

const assert = require('assert')
const mdUrl = require('../../src/helpers/md-url.js')

const cases = [
  // Three URL styles from the helper / PR description
  ['/savanna/main/overview/index.html', '/savanna/main/overview/index.md'],
  ['/savanna/main/overview/', '/savanna/main/overview/index.md'],
  ['/savanna/main/overview/pricing', '/savanna/main/overview/pricing.md'],
  // Query strings and hash fragments on each style
  ['/overview/index.html#section', '/overview/index.md#section'],
  ['/overview/index.html?foo=bar', '/overview/index.md?foo=bar'],
  ['/overview/index.html?foo=bar#section', '/overview/index.md?foo=bar#section'],
  ['/overview/?foo=bar', '/overview/index.md?foo=bar'],
  ['/overview/#section', '/overview/index.md#section'],
  ['/overview/?foo=bar#section', '/overview/index.md?foo=bar#section'],
  ['/overview/pricing?foo=bar', '/overview/pricing.md?foo=bar'],
  ['/overview/pricing#section', '/overview/pricing.md#section'],
  ['/overview/pricing?foo=bar#section', '/overview/pricing.md?foo=bar#section'],
  // Already a markdown URL, and non-string input
  ['/overview/index.md', '/overview/index.md'],
  ['/overview/index.md?foo=bar#section', '/overview/index.md?foo=bar#section'],
  [undefined, undefined],
]

let failed = 0
for (const [input, expected] of cases) {
  const actual = mdUrl(input)
  try {
    assert.strictEqual(actual, expected)
  } catch (err) {
    failed++
    console.error('FAIL', JSON.stringify(input), '=>', JSON.stringify(actual), 'expected', JSON.stringify(expected))
  }
}

if (failed) {
  console.error(failed + ' failed')
  process.exit(1)
}
console.log(cases.length + ' passed')
