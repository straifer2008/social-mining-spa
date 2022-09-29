export default function local({ next, nextMiddleware }) {
  const isLocal = import.meta.env.DEV

  if (isLocal) {
    nextMiddleware()
    return
  }

  return next({ name: 'Dashboard' })
}
