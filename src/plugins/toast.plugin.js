import ToastService from 'primevue/toastservice'

const noticeType = {
  success: 'success',
  warn: 'warn',
  error: 'error',
  info: 'info'
}

const defaultValues = {
  [noticeType.success]: {
    title: 'Успех!',
    detail: 'Действие успешно завершено'
  },
  [noticeType.warn]: {
    title: 'Предупреждение!',
    detail: 'Что то пошло не так'
  },
  [noticeType.error]: {
    title: 'Ошибка!',
    detail: 'Возникла ошибка при выполнении'
  },
  [noticeType.info]: {
    title: 'Инфо!',
    detail: 'Информационное сообщение'
  }
}

export default {
  install(app) {
    app.use(ToastService)

    // eslint-disable-next-line prettier/prettier
    app.config.globalProperties.$notice =
      app.config.globalProperties.$store.$notice = ({
        type,
        detail,
        title,
        life
      }) => {
        type = Object.keys(noticeType).includes(type)
          ? type
          : noticeType.success

        app.config.globalProperties.$toast.add({
          severity: type,
          summary: title || defaultValues[type].title,
          detail: detail || defaultValues[type].detail,
          life: life ?? 5000
        })
      }
  }
}
