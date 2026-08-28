;(function () {
  'use strict'

  // Behavior for @asciidoctor/tabs (.openblock.tabs / .tablist / .tabpanel /
  // .is-selected / .is-hidden). Distinct from Antora's default tabset markup
  // handled by 07-tabs-block.js (.tabset / .tab-pane / .is-active).
  var hash = window.location.hash
  find('.openblock.tabs').forEach(function (tabs) {
    var tablist = tabs.querySelector('.tablist ul')
    if (!tablist) return
    tablist.setAttribute('role', 'tablist')
    var first
    var active
    find('li', tablist).forEach(function (tab, idx) {
      var id = tab.id
      if (!id) return
      var panel = getPanel(id, tabs)
      if (!panel) return
      tab.setAttribute('role', 'tab')
      tab.setAttribute('aria-controls', panel.id)
      panel.setAttribute('role', 'tabpanel')
      if (!idx) first = { tab: tab, panel: panel }
      if (!active && hash === '#' + id) active = { tab: tab, panel: panel }
      tab.addEventListener('click', activateTab.bind({ tabs: tabs, tab: tab, panel: panel }))
    })
    var selected = active || first
    if (selected) activateTab.call({ tabs: tabs, tab: selected.tab, panel: selected.panel })
    tabs.classList.remove('is-loading')
  })

  function activateTab (e) {
    var tab = this.tab
    var panel = this.panel
    siblings(tab).forEach(function (el) {
      var on = el === tab
      el.classList.toggle('is-selected', on)
      el.setAttribute('aria-selected', on ? 'true' : 'false')
      el.tabIndex = on ? 0 : -1
    })
    siblings(panel).forEach(function (el) {
      var hidden = el !== panel
      el.classList.toggle('is-hidden', hidden)
      el.hidden = hidden
    })
    if (e) e.preventDefault()
  }

  function find (selector, from) {
    return Array.prototype.slice.call((from || document).querySelectorAll(selector))
  }

  function getPanel (id, tabs) {
    return tabs.querySelector('.tabpanel[aria-labelledby~="' + id + '"]')
  }

  function siblings (el) {
    var result = []
    var cur = el.parentNode && el.parentNode.firstElementChild
    var cls = el.classList.contains('tabpanel') ? 'tabpanel' : 'tab'
    while (cur) {
      if (cur.classList.contains(cls) || (cls === 'tab' && cur.nodeName === 'LI')) result.push(cur)
      cur = cur.nextElementSibling
    }
    return result
  }
})()
