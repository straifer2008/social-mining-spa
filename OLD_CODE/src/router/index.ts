import { createRouter, createWebHistory } from 'vue-router'
import { store } from '@/store'

import AppLayout from '@/layouts/AppLayout.vue'

import MyTasksView from '@/views/app/MyTasks/MyTasksView.vue'
import CreateNewView from '@/views/app/MyTasks/CreateNewView.vue'
import MyProfileView from '@/views/app/MyProfile/MyProfileView.vue'
import KnowledgeHelpView from '@/views/app/KnowledgeHelp/KnowledgeHelpView.vue'

// middleware
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
          meta: { auth: false }
        },
        {
          path: '/auth/register/:code?',
          props: true,
          name: 'Registration',
          component: () => import('@/views/auth/register/RegisterView.vue'),
          meta: { auth: false }
        },
        {
          path: '/auth/reset-password',
          name: 'Reset password',
          component: () => import('@/views/auth/ResetPasswordView.vue'),
          meta: { auth: false }
        },
        {
          path: '/auth/auth-confirm/:token',
          props: true,
          name: 'Auth Confirm',
          component: () => import('@/views/auth/AuthConfirmView.vue'),
          meta: { auth: false }
        }
      ]
    },
    {
      path: '/',
      component: AppLayout,
      meta: { auth: true },
      children: [
        {
          path: '/',
          name: 'MyTasks',
          component: MyTasksView,
          meta: {
            auth: true
            //   auth: {
            //     roles: 'admin',
            //     redirect: '/admin/login',
            //     notFoundRedirect: {name: 'error-404'},
            //     forbiddenRedirect: '/admin/403'
          }
        },
        {
          path: 'create-new',
          name: 'CreateNew',
          component: CreateNewView,
          meta: { auth: true }
        },
        {
          path: 'my-tasks',
          name: 'MyTasks',
          component: MyTasksView,
          meta: { auth: true }
        },
        {
          path: 'my-profile',
          name: 'MyProfile',
          component: MyProfileView,
          meta: { auth: true }
        },
        {
          path: 'knowledge-help',
          name: 'KnowledgeHelp',
          component: KnowledgeHelpView,
          meta: { auth: true }
        },
        {
          path: 'default',
          name: 'default',
          component: SamplePage,
          meta: {
            title: 'Default Dashboard | Endless - Premium Admin Template',
            auth: true
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

export default (app: any) => {
  app.router = router

  app.use(router)
}
// export default router