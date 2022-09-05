import { createRouter, createWebHistory } from 'vue-router'
import { store } from '@/store'

import AppLayout from '@/layouts/AppLayout.vue'

import DashboardView from '@/views/app/dashboard/DashboardView.vue'
import ComponentsView from '@/views/dev/ComponentsView.vue'
import IconsView from '@/views/dev/IconsView.vue'
import LaunchpadView from '@/views/app/launchpad/LaunchpadView.vue'
import AffiliateView from '@/views/app/affiliate/AffiliateView.vue'
import WalletView from '@/views/app/wallet/WalletView.vue'
import BlogsView from '@/views/app/blogs/BlogsView.vue'
import BlogView from '@/views/app/blogs/BlogsView.vue'

// middleware
import guest from './middleware/guest'
import auth from './middleware/auth'
import local from './middleware/local'
import middlewarePipeline from './middleware/middlewarePipeline'

/* sample page */
import SamplePage from '@/views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: 'Auth layout',
      component: () => import('@/layouts/AuthLayout.vue'),
      redirect: '/auth/login',
      children: [
        {
          path: '/auth/login',
          name: 'Login',
          component: () => import('@/views/auth/LoginView.vue'),
          meta: { middleware: [guest] }
        },
        {
          path: '/auth/register/:code?',
          props: true,
          name: 'Registration',
          component: () => import('@/views/auth/register/RegisterView.vue'),
          meta: { middleware: [guest] }
        },
        {
          path: '/auth/reset-password',
          name: 'Reset password',
          component: () => import('@/views/auth/ResetPasswordView.vue'),
          meta: { middleware: [guest] }
        },
        {
          path: '/auth/auth-confirm/:token',
          props: true,
          name: 'Auth Confirm',
          component: () => import('@/views/auth/AuthConfirmView.vue'),
          meta: { middleware: [guest] }
        }
      ]
    },
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '/',
          name: 'Dashboard',
          component: DashboardView,
          meta: { middleware: [auth] }
        },
        {
          path: 'launchpad',
          name: 'Launchpad',
          component: LaunchpadView,
          meta: { middleware: [auth] }
        },
        {
          path: 'affiliate',
          name: 'Launchpad affiliate',
          component: AffiliateView,
          meta: { middleware: [auth] }
        },
        {
          path: 'wallet',
          name: 'Grand Wallet',
          component: WalletView,
          meta: { middleware: [auth] }
        },
        {
          path: 'blogs',
          name: 'Crypto News',
          component: BlogsView,
          meta: { middleware: [auth] }
        },
        {
          path: 'blogs/:blog_id',
          name: '123',
          component: BlogView,
          meta: { middleware: [auth] }
        },
        {
          path: 'components',
          name: 'DEV Components',
          component: ComponentsView,
          meta: { middleware: [auth, local] }
        },
        {
          path: 'icons',
          name: 'DEV Icons',
          component: IconsView,
          meta: { middleware: [auth, local] }
        },
        {
          path: 'default',
          name: 'default',
          component: SamplePage,
          meta: {
            title: 'Default Dashboard | Endless - Premium Admin Template',
            middleware: [auth]
          }
        }
      ]
    },
    {
      name: 'NotFound',
      path: '/:pathMath(.*)*',
      component: SamplePage
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware
  const context = {
    to,
    from,
    next,
    store
  }
  return middleware[0]({
    ...context,
    nextMiddleware: middlewarePipeline(context, middleware, 1)
  })
})

export default router
