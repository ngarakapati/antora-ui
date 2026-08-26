'use strict'

/** True for Savanna and Cloud Classic pages (the only ones that get theme-cloud). */
module.exports = (page) => {
  const name = page && page.component && page.component.name
  return name === 'savanna' || name === 'cloud'
}
