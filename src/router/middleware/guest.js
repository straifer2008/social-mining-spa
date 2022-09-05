export default function guest({ next, store, nextMiddleware }) {
  const user = store.getters.USER
  const token = localStorage.getItem('grand_auth_token')

  if (token) {
    if (!user) {
      store
        .dispatch('GET_USER')
        .then(() => next({ name: 'Dashboard' }))
        .catch(() => nextMiddleware())
      return
    }
    next({ name: 'Dashboard' })
  }

  return nextMiddleware()
}
