<template>
  <AppViewWrapper class="dashboard-view">
    <router-link :to="{ path: '/blogs/:blog_id' }">
      <div class="hero-blog" v-for="(blog, idx) in getBlogs?.data?.slice(0, 1)">
        <div class="blog-container">
          <img src="https://grand-blog-images.s3.us-west-1.amazonaws.com/blog/389cf31694f0e857659d948a0c408210.jpg" />
          <div class="text">
            <div class="categories">
              <div class="category" v-for="category in blog.categories">
                {{ category.name_ru }}
              </div>
            </div>

            <div class="title">
              {{ blog.name_ru }}
            </div>

            <div class="desc">
              {{ blog.text_ru }}
            </div>

            <div class="date">
              {{ datetimeToDate(blog.created_at) }}
            </div>

          </div>
        </div>
      </div>
    </router-link>

    <div class="top-blogs">
      <div class="header">
        <h2>Темы</h2>
        <div class="reset_filters_button" @click="clearBlogCategory()" v-if="this.current_blog_category">Очистить фильтры</div>
      </div>


      <div class="categories">
        <div
          class="category"
          :class="{ active: category.id === current_blog_category }"
          v-for="category in getBlogCategories?.data"
          @click="setBlogCategory(category.id)"
        >
          {{ category.name_ru }}
        </div>
      </div>

      <div class="loadmore_button" @click="getMoreBlogCategories" v-if="getBlogCategories?.total >= this.categories_per_page">
        Показать больше тем
        <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 10L0.803847 0.250001L11.1962 0.25L6 10Z" fill="#53E29E"></path>
        </svg>
      </div>

      <div class="blogs">
        <div class="blog" v-for="(blog, idx) in getBlogs?.data?.slice(1, 7)">
          <img src="https://grand-blog-images.s3.us-west-1.amazonaws.com/blog/b702906fc8fa0946e74ae9226322ed7a.jpg" />

          <div class="categories">
            <div class="category" v-for="category in blog.categories">
              {{ category.name_ru }}
            </div>
          </div>

          <div class="title">
            {{ blog.name_ru }}
          </div>

          <div class="date">
            {{ datetimeToDate(blog.created_at) }}
          </div>

        </div>
      </div>

    </div>

    <div class="banner">

      <div class="text">
        <p>Начните зарабатывать</p>
        <p>награды Grand Token</p>
      </div>

      <a href="/tasks" class="button">Подробней</a>

    </div>

    <div class="top-blogs" v-if="getBlogs?.total > 7">
      <div class="blogs">
        <div class="blog" v-for="(blog, idx) in getBlogs?.data?.slice(7)">
          <img src="https://grand-blog-images.s3.us-west-1.amazonaws.com/blog/b702906fc8fa0946e74ae9226322ed7a.jpg" />

          <div class="categories">
            <div class="category" v-for="category in blog.categories">
              {{ category.name_ru }}
            </div>
          </div>

          <div class="title">
            {{ blog.name_ru }}
          </div>

          <div class="date">
            {{ datetimeToDate(blog.created_at) }}
          </div>

        </div>
      </div>

      <div class="loadmore_button" @click="getMoreBlogs" v-if="getBlogs?.total >= this.blogs_per_page">
        Загрузить другие статьи
        <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 10L0.803847 0.250001L11.1962 0.25L6 10Z" fill="#53E29E"></path>
        </svg>
      </div>
    </div>

  </AppViewWrapper>
</template>

<script>
  import AppViewWrapper from '@/components/app/AppViewWrapper.vue'

  export default {
    name: 'BlogsView',
    components: {
      AppViewWrapper,
    },
    data() {
      return {
        blogs_per_page: 16,
        categories_per_page: 14,
        total_blog_amount: 0,
        current_blog_category: null,
      }
    },
    methods: {
      datetimeToDate(datetime) {
        const date = datetime.split('T')[0]
        const year = date.split('-')[0]
        const month = date.split('-')[1]
        const day = date.split('-')[2]
        return `${day}.${month}.${year}`
      },
      getMoreBlogs() {
        this.blogs_per_page += 6
        this.$store.dispatch('GET_BLOGS', this.blogs_per_page)
      },
      getMoreBlogCategories() {
        this.categories_per_page += 14
        this.$store.dispatch('GET_BLOG_CATEGORIES', this.categories_per_page)
      },
      setBlogCategory(category_id) {
        this.current_blog_category = category_id
        this.$store.dispatch('GET_BLOGS_BY_CATEGORY', this.current_blog_category, this.categories_per_page)
      },
      clearBlogCategory() {
        this.current_blog_category = null
      },
    },
    computed: {
      getBlogs() {
        return this.current_blog_category ? this.$store.getters.BLOGS_BY_CATEGORY : this.$store.getters.BLOGS
      },
      getBlogCategories() {
        return this.$store.getters.BLOG_CATEGORIES
      },
    },
    async created() {
      await this.$store.dispatch('GET_BLOGS')
      await this.$store.dispatch('GET_BLOG_CATEGORIES')
    }
  }
</script>

<style lang="scss">
.dashboard-view {
  .hero-blog {
    max-width: 1000px;
    margin: 20px auto;
    width: 100%;
    border-radius: 10px;
    background: #fff;
    box-shadow: 0 2px 6px #00000026;

    .blog-container {
      display: flex;
      align-items: flex-start;
      padding: 0;

      img {
        display: block;
        max-width: 50%;
        border-radius: 10px;
      }

      .text {
        padding: 30px;
        display: flex;
        flex-direction: column;
        gap: 15px;

        .categories {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;

          .category {
            padding: 8px 16px;
            border-radius: 40px;
            background: #f4f4f6;
            color: #878da3;
            width: fit-content;
            font-size: 12px;
            font-weight: 700;
          }
        }

        .title {
          color: #0056b3;
          font-size: 24px;
          line-height: 30px;
          font-weight: 800;
        }

        .desc {
          font-size: 18px;
          line-height: 22px;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 6;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .date {
          color: #878da3;
        }
      }
    }
  }

  .top-blogs {
    max-width: 1000px;
    margin: 20px auto;
    width: 100%;
    border-radius: 10px;
    background: #fff;
    box-shadow: 0 2px 6px #00000026;
    padding: 20px;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      h2 {
        font-size: 24px;
        font-weight: 700;
        line-height: 28px;
        color: #05113b;
        margin-bottom: 12px;
      }

      .reset_filters_button {
        color: #53e29e;
        font-size: 18px;
        text-decoration: underline;
        cursor: pointer;
      }
    }

    .categories {
      display: flex;
      gap: 15px;
      align-items: flex-start;
      flex-wrap: wrap;
      padding: 10px 0;

      .category {
        padding: 8px 16px;
        border-radius: 40px;
        background: #f4f4f6;
        color: #878da3;
        cursor: pointer;
        width: fit-content;
        font-size: 12px;
        font-weight: 700;

        &.active {
          background: #878da3;
          color: #efefef;
        }
      }
    }

    .blogs {
      display: flex;
      flex-wrap: wrap;
      margin-top: 20px;
      row-gap: 30px;
      gap: 30px;

      .blog {
        width: 288px;

        img {
          width: 100%;
          border-radius: 5px;
          margin-bottom: 15px;
        }

        .categories {
          flex-wrap: nowrap;
          overflow-x: auto;

          .category {
            cursor: auto;
          }
        }

        .title {
          color: #05113b;
          font-size: 24px;
          line-height: 28px;
          font-weight: 400;
          margin: 15px 0;
          max-height: 112px;
          overflow-y: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
        }

        .date {
          color: #878da3;
          font-size: 14px;
          line-height: 22px;
        }
      }
    }

    .loadmore_button {
      font-size: 18px;
      font-weight: 400;
      line-height: 1;
      margin-right: 10px;
      color: #53e29e;
      cursor: pointer;
      margin-top: 30px;
    }
  }

  .banner {
    background: center no-repeat url("/public/img/lidForm.png");
    border-radius: 10px;
    display: flex;
    height: 164px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    max-width: 1000px;
    margin: 0 auto;
    align-items: center;
    justify-content: space-evenly;

    .text {
      p:first-child {
        color: #fff;
      }

      p {
        text-transform: uppercase;
        color: #53e29e;
        font-size: 40px;
        line-height: 60px;
        font-weight: 800;
        text-shadow: 0 0 30px #0033cf;
        margin: 0;
      }
    }

    .button {
      display: block;
      padding: 15px 40px 13px;
      border-radius: 5px;
      font-weight: 700;
      font-size: 16px;
      line-height: 20px;
      text-transform: capitalize;
      text-decoration: none;
      color: #253e98;
      background: #53e29e;
    }
  }
}

@media screen and (max-width: 992px) {
  .dashboard-view {
    .hero-blog {
      .blog-container {
        flex-direction: column;

        img {
          margin: 0 auto;
          max-width: 100%;
        }
      }
    }

    .top-blogs {
      .blogs {
        justify-content: space-evenly;
      }
    }

    .banner {
      flex-direction: column;

      .text p {
        font-size: 35px;
        line-height: 40px;
        text-align: center;
      }
    }
  }
}

@media screen and (max-width: 576px) {
  .dashboard-view {

    .banner {
      .text p {
        font-size: 25px;
        line-height: 30px;
        text-align: center;
        white-space: nowrap
      }
    }
  }
}
</style>
