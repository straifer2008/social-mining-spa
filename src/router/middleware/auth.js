export default function auth({ next, store, nextMiddleware }) {
  const user = store.getters.USER

  if (!user) {
    store
      .dispatch('GET_USER')
      .then(() => {
        nextMiddleware()
      })
      .catch(() => {
        console.log('catch auth middle')
        next({ name: 'Login', query: { loginError: true } })
      })
    return
  }
  return nextMiddleware()
}
