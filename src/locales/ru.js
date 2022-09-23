export default {
  rules: {
    required: 'обязательное поле',
    email: 'Must be a valid email address',
    min: 'минимальное число символов { min }',
    max: 'максимальное число символов { max }',
    pswMinLength: 'мин. количество символов { minLength }',
    pswMismatch: 'должно совпадать с полем { fieldName }',
    dateIsFew: 'некорректная дата',
    dateIsLot: 'некорректная дата',
    containsNumber: 'поле должно содержать цифры',
    containsSymbol: 'поле должно содержать спецсимволы',
    containsUpperCase: 'поле должно содержать символы в верхнем регистре',
    containsLowerCase: 'поле должно содержать символы в нижнем регистре'
  },
  loginForm: {
    signup: 'Sign up',
    signin: 'Sign in',
    title: 'Hey there!',
    submit: 'Войти',
    labelEmail: 'Эл. почта',
    placeholderEmail: 'Your email address',
    labelPassword: 'Пароль',
    placeholderPassword: 'Pick a password',
    btnForgot: 'Я забыл',
    registerLink: {
      text1: 'Don\'t have an account?',
      text2: 'Sign up'
    }
  },
  registerForm: {
    title: 'Sign Up',
    placeholderName: 'Full name',
    labelEmail: 'Эл. почта',
    placeholderEmail: 'Your email address',
    labelPassword: 'Пароль',
    placeholderPassword: 'Pick a password',
    labelPasswordRepeat: 'Повторите пароль',
    placeholderPasswordRepeat: 'Repeat a password',
    placeholderCompanyName: 'Your company name',
    placeholderCompanyProfile: 'Company profile',
    placeholderCompanyStaffQuantity: 'Company staff quantity',
    aboutYourSelfTitle: 'Расскажите нам о себе',
    labelGender: 'Выберите ваш пол',
    placeholderGender: 'выберите ваш пол',
    genderList: {
      female: 'Женский',
      male: 'Мужской',
      hidden: 'Я не хочу указывать'
    },
    labelCountry: 'Укажите вашу страну',
    placeholderCountry: 'укажите вашу страну',
    labelBirthDay: 'Дата рождения',
    labelAgreement: ['I agree to', 'Terms & Conditions'],
    loginLink: ['Уже регистрировались?', 'Войти'],
    submitSuccessMessage: 'Регистрация успешна',
    rules: {
      minAge: 'ваш возраст должен быть больше { minAge }',
      maxAge: 'ваш возраст должен быть меньше { maxAge }'
    }
  },
  authConfirmForm: {
    submit: 'Подтвердить',
    title: 'Confirm your email',
    description1: `Thank you for signing up with GrandTime!`,
    description2: `Enter the verification code that was sent to `,
    repeatTimeoutInfo: 'Вы можете отправить код заново после { second } секунд',
    repeatBtn: 'Resend code',
    placeholderCode: 'Введите 6-значный код',
    btnBack: 'Назад',
    notReceive: 'Не получили наше сообщение?',
    submitSuccessMessage: 'Авторизация успешна'
  },
  resetPasswordForm: {
    submit: 'Сбросить мой пароль',
    title: 'Сброс пароля',
    labelEmail: 'Эл. почта',
    placeholderEmail: 'введите email',
    lonkLogin: 'Войти',
    submitSuccessMessage:
      'Инструкции по сбросу пароля были направлены на вашу эл. почту. Конечно, если вы были зарегистрированы до этого.'
  },
  transferGrandDialog: {
    title: 'Перевести GRAND пользователю',
    labelUsername: 'Кому:',
    placeholderUsername: 'Введите имя или ID пользователя',
    labelValue: 'Сумма:',
    placeholderValue: 'Введите сумму GRAND',
    amountTitle: 'Сумма перевода:',
    send: 'Отправить',
    confirm: 'Подтвердить',
    back: 'назад',
    successConfirmMessage: 'запрос на P2P перевод отправлен успешно'
  },
  withdrawalGrandDialog: {
    title: 'Вывод Grand Токенов',
    labelAddress: 'Polygon Network Grand адрес вывода',
    labelAmount: 'Сумма:',
    placeholderAmount: 'Введите количество токенов Grand',
    back: 'назад',
    confirm: 'Вывести мои награды',
    stepOne: {
      title: 'Бесплатное снятие вознаграждений Grand Token',
      description: `Форма вывода Grand Tokens дает вам возможность бесплатно вывести Grand Tokens с платформы Grand Time на подключенный кошелек вывода в сети Polygon. Grand Tokens будут зачислены на ваш подключенный адрес для вывода средств в течение 48-72 часов после получения запроса и завершения проверки безопасности перевода.`,
      confirm: 'Подтвердите бесплатный вывод токенов Grand'
    },
    stepTwo: {
      title: '',
      description: `Мы получили ваш запрос на вывод токенов Grand. Grand Tokens будут зачислены на ваш подключенный адрес вывода в сети Polygon в течение 48-72 часов после завершения проверки безопасности перевода.`
    },
    successConfirmMessage: 'Запрос на вывод средств успешно отправлен'
  },
  withdrawsTable: {
    cancelConfirmQuestion: 'Вы уверены, что хотите отменить операцию?',
    cancelRequestMessage: 'Запрос на отмену успешно отправлен',
    cancelConfirmPopup: {
      yes: 'Да',
      no: 'Нет'
    },
    cancel: 'Отмена',
    headers: {
      id: 'ID',
      rank: '№ в очереди',
      status: 'Статус',
      value: 'Сумма',
      wallet: 'На кошелёк',
      date: 'Дата',
      actions: 'Действия'
    }
  },
  transactionsTable: {
    headers: {
      id: 'ID',
      status: 'Статус',
      value: 'Сумма',
      title: 'Операция',
      fromUser: 'From',
      toUser: 'To',
      date: 'Дата'
    },
    emptyMessage: 'Пока не было транзакций'
  },
  tableGlobal: {
    tablePageReport: ['Показаны с', 'по', 'из']
  },
  needWalletPopup: {
    message: 'Необходимо добавить кошелёк для выводов Grand',
    acceptLabel: 'Добавить кошелёк',
    rejectLabel: 'Понятно'
  },
  needGrandPopup: {
    message: 'У вас недостаточно токенов GRAND на счету',
    acceptLabel: 'Получить Grand',
    rejectLabel: 'Понятно'
  },
  setGrandWithdrawalWalletDialog: {
    header: 'Установить мой адрес для вывода Grand в сети Polygon',
    description: [
      'Адрес',
      'должен поддерживать депозиты монет Matic в сети Polygon',
      `. Мы отправим ваше реферальное вознаграждение в размере 20% в Matic Coin (Polygon) только на этот адрес! Дважды проверьте свой адрес; ввод адреса, который не поддерживает Matic Coins в сети Polygon, или неверный адрес приведет к безвозвратной потере токенов.`
    ],
    addressLabel: 'Адрес для выдачи средств в сети Polygon',
    addressPlaceholder: '0x0000****0000',
    addressConfirmLabel: 'Адрес для выдачи средств в сети Polygon',
    addressConfirmPlaceholder: '0x0000****0000',
    sutitle: 'или',
    stepOneDescription: `Используйте Wallet Connect, чтобы отсканировать QR-код и подключить
    свой кошелек`,
    agreementLabel: ['Я согласен с', 'Условиями продажи токенов Grand Time'],
    stepTwoDescription: `Не волнуйтесь, мы поможем вам его создать. Пожалуйста, следуйте
    нашим видео инструкциям, чтобы создать и добавить свой кошелек.`,
    grandTokenAddressLabel: 'Адрес токена Grand:',
    cardActionsСompletedText:
      'Адрес для выводов Grand успешно сохранен, теперь вам доступны функции вывода',
    btnNoWallet: 'У меня нет кошелька ERC-20 в сети Polygon',
    btnConfirmWallet: 'Подтвердить адрес',
    btnSetWallet: 'Указать адрес',
    noticeCopy: 'адрес скопирован в буфер обмена',
    cantChangeAddress: [
      `У вас есть незавершенные транзакции с подключенным кошельком. По соображениям безопасности вы не можете изменить адрес в данный момент, пока все ожидающие транзакции, связанные с этим кошельком на платформе, не будут завершены или отменены.`,
      `Если у вас есть незавершенные платежные транзакции и средства не были отправлены, транзакция будет автоматически отменена в течение 24 часов. Если у вас есть незавершенные транзакции на вывод средств Grand, вы можете отменить их на странице Grand Wallet в разделе «Запросы на снятие средств».`
    ]
  },
  launchpadWelcomeCard: {
    title: 'Добро пожаловать на Лаунчпад Токена Grand',
    description: `Поздравляем! Вы нашли панель запуска Grand Token и являетесь одним из
    первых покупателей токенов для главного криптопроекта 2022 года. Панель запуска будет продолжена
    на 201 фазу, и цена токена будет увеличиваться с каждой фазой. Все токены будут
    депонированы покупателям токенов в течение 24 часов с момента инвестирования. Токен будет указан на
    несколько криптобирж по цене последней фазы, достигнутой после окончания
    панель запуска. После этого рынок возьмет на себя оценку и удовольствие начинается. Команда, стоящая за Grand Token, наделена полномочиями на 4 года и сделает все
    для достижения долгосрочных целей экосистемы Grand Time и токена Grand.`,
    account: 'Профиль',
    tokenAddress: 'Адрес вывода Grand Token',
    btnChange: 'Изменить мой адрес для вывода Grand',
    btnSet: 'Установить мой адрес для вывода Grand Token',
    statuses: {
      none: 'Нет',
      confirmation: 'В обработке',
      confirmed: 'Подтверждён'
    }
  },
  phaseInfoCard: {
    title: 'Grand Token Sale Launchpad Progress',
    phaseOneOf: 'Фаза {phase} из 201',
    phasePercent: '{percent} в фазе',
    amountInPhase: 'из {amount} в этой фазе',
    currentGrandPrice: 'Текущая цена GRAND',
    priceInNextPhase: '${price} в следующей фазе',
    totalCollected: 'Всего собрано'
  },
  investCards: {
    title: 'Инвестировать в Токен Grand',
    appedText: 'Для крупных транзакций, пожалуйста, свяжитесь с нами',
    investMethods: {
      coinpayments: {
        title: 'С любой криптовалютой',
        btnName: 'Купить за любую криптовалюту'
      },
      matic: {
        title: 'Прямой депозит Matic',
        btnName: 'Купить с прямым депозитом Matic Coin'
      },
      card: {
        title: 'Дебетовая или кредитная карта',
        btnName: 'Купить через Visa или MasterCard'
      }
    }
  },
  affiliateProgramInfoCard: {
    title: 'Партнерская программа токена Grand',
    description: ` Поделитесь лаунчпадом токена Grand с друзьями. Все, что вам нужно сделать, это отправить свою уникальную реферальную ссылку в личном сообщении, опубликовать ее в социальных сетях, видео или статье в своем сообществе. Мы вознаградим вас за каждого инвестора, пришедшего по вашей рекомендации. Ваша реферальная доля составит 20% от каждой инвестиции, сделанной вашими рефералами по вашей партнерской ссылке.`,
    link: 'Узнать больше о партнёрской программе'
  },
  launchpadTransactionsTable: {
    title: 'История транзакций',
    headers: {
      ethValueLabel: 'Сумма MATIC',
      valueLabel: 'Сумма GRAND',
      method: 'Метод'
    },
    ethValueLabelTooltip: `Это сумма вашей покупки, конвертированная в Matic Coin
    что наш смарт-контракт получил после всех комиссий и
    комиссии, взимаемые платежными провайдерами и сетью Polygon.
    Смарт-контракт использует эту окончательную сумму для расчета количества
    Гранд-токенов, которые будут отправлены на ваш кошелек для вывода средств.`
  },
  referralTransactionsTable: {
    headers: {
      date: 'Дата',
      userID: 'ID пользователя',
      grandPurchaseAmount: 'Сумма покупки Grand',
      referralPurchaseAmount: 'Сумма покупки реферала',
      yourReferralBonus: 'Ваш реферальный бонус',
      status: 'Статус'
    },
    emptyMessage: 'Ваши рефералы ещё не произвели транзакций'
  },
  affiliateReferredStatusCard: {
    title: 'Партнерская программа Лаунчпада',
    peopleReferred: 'Приглашенные люди',
    referralEarnings: 'Реферальный доход'
  },
  aboutAffiliateProgram: {
    title: 'Как работает партнерская программа?',
    description: `Поделитесь лаунчпадом токена Grand с друзьями. Все, что вам нужно сделать, это отправить свою уникальную реферальную ссылку в личном сообщении, опубликовать ее в социальных сетях, видео или статье в своем сообществе. Мы вознаградим вас за каждого инвестора, пришедшего по вашей рекомендации. Ваша реферальная доля составит 20% от каждой инвестиции, сделанной вашими рефералами по вашей партнерской ссылке. Эта сумма будет переведена в Matic Coin на ваш подключенный кошелек для вывода реферальных вознаграждений.`
  },
  createRefLinkForm: {
    title: 'Coздать свою уникальную реферальную ссылку',
    checkBoxLavelAgree: ['Я принимаю', 'правила пользования'],
    btnSubmit: {
      get: 'Получить ссылку',
      getNew: 'Получить новую ссылку'
    },
    affiliatesSupportLink: 'Чат поддержки партнеров',
    copyMessage: 'ссылка скопирована в буфер обмена',
    setWalletPopupText: 'Чтобы получить реферальную ссылку, пожалуйста, сначала укажите свой адрес для вывода средств.',
    linkNotCreated: 'Ссылка еще не создавалась'
  },
  myRefLinkCard: {
    title: 'Моя реферальная ссылка',
    subTitle: 'Реферальная ссылка на 20% Matic',
    linkNotCreated: 'Ссылка еще не создавалась'
  },
  referralAddressCard: {
    title: 'Адрес вывода реферальных вознаграждений',
    btnSubmit: {
      change: 'Изменить адрес для вывода моих реферальных вознаграждений',
      set: 'Установить адрес для вывода моих реферальных вознаграждений'
    }
  },
  infoActionCards: {
    yourBalance: 'Ваш баланс',
    transferP2P: 'P2P перевод',
    transferFund: 'Перевести средства',
    grandTokensWithdrawal: 'Вывод Токенов Гранд',
    withdrawFunds: 'Вывести средства',
    partners: 'Партнеры',
    inactive: 'неактивные',
    new: 'новые'
  },
  userStatusList: {
    title: 'Ваш статус'
  },
  allTransactions: 'Все транзакции',
  withdrawRequests: 'Запросы на снятие средств',
  statusCard: {
    partnerLevel: 'Уровень дохода с партнёров',
    balanceRequired: 'Необходимый баланс Grand'
  },
  appSidebar: {
    myTasks: 'My tasks',
    createNew: 'Create new',
    taskList: 'Task list',
    myProfile: 'My profile',
    knowledgeHelp: 'Knowledge help',

    grandTokenLaunchpad: 'Лаунчпад Токен Grand',
    wallet: 'Кошелек Grand',
    blogs: 'Крипто-новости',
    buyGrandTokens: 'Купить токены Grand',
    affiliateProgram: 'Партнерская программа Grand',
    tokenSaleFAQ: 'FAQ по продаже токенов Grand',
    DEV: 'DEV',
    DEVComponents: 'Components',
    DEVIcons: 'Icons'
  },
  routeNames: {
    Dashboard: 'Аккаунт',
    Launchpad: 'Купить токены Grand',
    'Grand Wallet': 'Кошелёк Grand',
    'Crypto News': 'Крипто-новости',
    'Launchpad affiliate': 'Партнерская программа Grand',
    'DEV Components': 'DEV Components',
    'DEV Icons': 'DEV Icons'
  }
}
