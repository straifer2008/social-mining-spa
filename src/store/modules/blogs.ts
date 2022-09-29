import { store } from '@/store/index.ts'

export default {
  state: () => ({
    blogs: [],
    blogs_by_category: [],
    blog_categories: [],
  }),

  // mutations
  mutations: {
    SET_BLOGS(state, payload) {
      state.blogs = payload
    },
    SET_BLOGS_BY_CATEGORY(state, payload) {
      state.blogs_by_category = payload
    },
    SET_BLOG_CATEGORIES(state, payload) {
      state.blog_categories = payload
    },
  },

  // actions
  actions: {
    async GET_BLOGS({ commit }, per_page) {
      try {
        const data = await store.$api.blogs.getBlogs(per_page)
        commit('SET_BLOGS', data)
        return data
      } catch (err) {
        err
        throw err
      }
    },
    async GET_BLOGS_BY_CATEGORY({ commit }, category_id, per_page) {
      try {
        const data = await store.$api.blogs.getBlogsByCategory(category_id, per_page)
        commit('SET_BLOGS_BY_CATEGORY', data)
        return data
      } catch (err) {
        err
        throw err
      }
    },
    async GET_BLOG_CATEGORIES({ commit }, per_page) {
      try {
        const data = await store.$api.blogs.getBlogCategories(per_page)
        commit('SET_BLOG_CATEGORIES', data)
        return data
      } catch (err) {
        err
        throw err
      }
    },
  },

  // getters
  getters: {
    BLOGS: ({ blogs }) => blogs,
    BLOGS_BY_CATEGORY: ({ blogs_by_category }) => blogs_by_category,
    BLOG_CATEGORIES: ({ blog_categories }) => blog_categories,
  }
}
