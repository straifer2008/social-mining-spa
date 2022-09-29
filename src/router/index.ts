import { createRouter, createWebHistory } from 'vue-router'
import { store } from '@/store'

import AppLayout from '@/layouts/AppLayout.vue'

import MyTasksView from '@/views/app/MyTasks/MyTasksView.vue'
import CreateNewView from '@/views/app/MyTasks/CreateNewView.vue'
import MyProfileView from '@/views/app/MyProfile/MyProfileView.vue'
import KnowledgeHelpView from '@/views/app/KnowledgeHelp/KnowledgeHelpView.vue'


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
          name: 'MyTasks',
          component: MyTasksView,
          meta: { middleware: [auth] }
        },
        {
          path: 'create-new',
          name: 'CreateNew',
          component: CreateNewView,
          meta: { middleware: [auth] }
        },
        {
          path: 'my-tasks',
          name: 'MyTasks',
          component: MyTasksView,
          meta: { middleware: [auth] }
        },
        {
          path: 'my-profile',
          name: 'MyProfile',
          component: MyProfileView,
          meta: { middleware: [auth] }
        },
        {
          path: 'knowledge-help',
          name: 'KnowledgeHelp',
          component: KnowledgeHelpView,
          meta: { middleware: [auth] }
        },
        {
          path: 'default',
          name: 'default',
          component: SamplePage,
          meta: {
            title: 'Default Dashboard | Endless - Premium Admin Template',
            middleware: [auth]
          }
        },
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
