import { BaseApiService } from './core/BaseApiService'

export class BlogsApiService extends BaseApiService {

  constructor({ app }) {
    super({ app, checkAuth: true })
  }

  async getBlogs(per_page = 16) {
    const { data } = await this.httpCall({
      method: 'get',
      url: `v2/api/blog?per_page=${per_page}`,
    })

    return data
  }

  async getBlogsByCategory(category_id, per_page = 16) {
    const { data } = await this.httpCall({
      method: 'get',
      url: `v2/api/blog/category/${category_id}?per_page=${per_page}`,
    })

    return data
  }

  async getBlogCategories(per_page = 14) {
    const { data } = await this.httpCall({
      method: 'get',
      url: `v2/api/blog-category?per_page=${per_page}`,
    })

    return data
  }

}
