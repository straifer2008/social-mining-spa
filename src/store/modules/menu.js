import Menu from '../../data/menu'

export default {
  state: () => ({
    data: Menu.data,
    searchData: []
  }),

  // getters
  getters: {
    getAppMenuData: ({ data }) => data
  },

  // mutations
  mutations: {
    searchTerm: (state, term) => {
      let items = []
      term = term.toLowerCase()
      state.data.filter((menuItems) => {
        if (
          menuItems.title.toLowerCase().includes(term) &&
          menuItems.type === 'link'
        ) {
          items.push(menuItems)
        }
        if (!menuItems.children) return false
        menuItems.children.filter((subItems) => {
          if (
            subItems.title.toLowerCase().includes(term) &&
            subItems.type === 'link'
          ) {
            subItems.icon = menuItems.icon
            items.push(subItems)
          }
          if (!subItems.children) return false
          subItems.children.filter((suSubItems) => {
            if (suSubItems.title.toLowerCase().includes(term)) {
              suSubItems.icon = menuItems.icon
              items.push(suSubItems)
            }
          })
        })
        state.searchData = items
      })
    },
    setNavActive: (state, item) => {
      if (!item.active) {
        state.data.forEach((a) => {
          if (state.data.includes(item)) a.active = false
          if (!a.children) return false
          a.children.forEach((b) => {
            if (a.children.includes(item)) {
              b.active = false
            }
          })
        })
      }
      item.active = !item.active
    },
    setActiveRoute: (state, item) => {
      state.data.forEach((menuItem) => {
        menuItem.active = menuItem == item
        if (menuItem.children) {
          menuItem.children.forEach((submenuItem) => {
            submenuItem.active = submenuItem == item
            if (submenuItem.active) menuItem.active = true
            if (submenuItem.children && submenuItem.children.includes(item)) {
              menuItem.active = true
              submenuItem.active = true
            }
          })
        }
      })
    }
  },

  // actions
  actions: {
    searchTerm: (context, term) => {
      context.commit('searchTerm', term)
    },
    setNavActive: (context, item) => {
      context.commit('setNavActive', item)
    },
    setActiveRoute: (context, item) => {
      context.commit('setActiveRoute', item)
    }
  }
}
