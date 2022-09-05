export default {
  rules: {
    required: 'required field',
    email: 'Must be a valid e-mail address',
    min: 'min. { min }',
    max: 'max. { max }',
    pswMinLength: 'min. characters { minLength }',
    pswMismatch: 'must match the { fieldName } field',
    dateIsFew: 'invalid date',
    dateIsLot: 'invalid date',
    containsNumber: 'field must contain numbers',
    containsSymbol: 'field must contain special characters',
    containsUpperCase: 'field must contain uppercase characters',
    containsLowerCase: 'field must contain lowercase characters'
  },
  loginForm: {
    signup: 'Sign up',
    title: 'Hey there!',
    submit: 'Login',
    labelEmail: 'E-mail',
    placeholderEmail: 'Your email address',
    labelPassword: 'Password',
    placeholderPassword: 'enter password',
    btnForgot: 'I forgot',
    registerLink: {
      text1: 'Don`t have an account yet?',
      text2: 'Register'
    }
  },
  registerForm: {
    title: 'Create an account',
    submit: 'Join',
    labelEmail: 'E-mail',
    placeholderEmail: 'enter e-mail',
    labelPassword: 'Password',
    placeholderPassword: 'enter password',
    labelPasswordRepeat: 'Repeat password',
    placeholderPasswordRepeat: 'repeat password',
    aboutYourSelfTitle: 'Tell us about yourself',
    labelGender: 'Choose your gender',
    placeholderGender: 'choose your gender',
    genderList: {
      female: 'Female',
      male: 'Male',
      hidden: 'I don`t want to specify'
    },
    labelCountry: 'Select your country',
    placeholderCountry: 'select your country',
    labelBirthDay: 'Date of Birth',
    labelAgreement: ['I accept', 'license agreement'],
    loginLink: ['Already registered?', 'Login'],
    submitSuccessMessage: 'Registration successful',
    rules: {
      minAge: 'your age must be greater than { minAge }',
      maxAge: 'your age must be less than { maxAge }'
    }
  },
  authConfirmForm: {
    submit: 'Confirm',
    title: 'Confirm it`s you',
    description: `We have sent a verification code to your email. Enter code from
    email in the box below.`,
    repeatTimeoutInfo: 'You can resend the code after { second } seconds',
    repeatBtn: 'Send again',
    placeholderCode: 'Enter 6 digit code',
    btnBack: 'Back',
    notReceive: 'Didn`t receive our message?',
    submitSuccessMessage: 'Authorization successful'
  },
  resetPasswordForm: {
    submit: 'Reset my password',
    title: 'Password reset',
    labelEmail: 'E-mail',
    placeholderEmail: 'enter e-mail',
    lonkLogin: 'Login',
    submitSuccessMessage:
      'Password reset instructions have been sent to your email. mail. Of course, if you were registered before.'
  },
  transferGrandDialog: {
    title: 'Transfer GRAND to a user',
    labelUsername: 'To:',
    placeholderUsername: 'Enter username or user ID',
    labelValue: 'Amount:',
    placeholderValue: 'Enter amount of GRAND',
    amountTitle: 'Transfer amount:',
    send: 'Send',
    confirm: 'Confirm',
    back: 'back',
    successConfirmMessage: 'P2P transfer request sent successfully'
  },
  withdrawalGrandDialog: {
    title: 'Grand Tokens Withdrawal',
    labelAddress: 'Polygon Network Grand Withdrawal Address',
    labelAmount: 'Amount:',
    placeholderAmount: 'Enter the amount of Grand tokens',
    back: 'back',
    confirm: 'Withdraw my rewards',
    stepOne: {
      title: 'Free Grand Token Rewards Withdrawal',
      description: `Grand Tokens withdrawal form gives you the opportunity to withdraw
      Grand Tokens for free from the Grand Time platform to your connected
      withdrawal wallet in the Polygon network. Grand Tokens will be
      deposited to your connected withdrawal address within 48-72 hours
      when the request is received and a security check of the transfer is
      completed.`,
      confirm: 'Confirm Free Grand Tokens Withdrawal'
    },
    stepTwo: {
      title: '',
      description: `We received your Grand Tokens withdrawal request. Grand Tokens will
      be deposited to your connected withdrawal address in the Polygon
      network within 48-72 hours when the security check of the transfer
      is completed.`
    },
    successConfirmMessage: 'Withdrawal request sent successfully'
  },
  stakeGrandDialog: {
    title: 'Choose the stacking type',
    submit: 'Coming soon',
  },
  withdrawsTable: {
    cancelConfirmQuestion: 'Are you sure you want to cancel the operation?',
    cancelRequestMessage: 'Cancel request sent successfully',
    cancelConfirmPopup: {
      yes: 'Yes',
      no: 'No'
    },
    cancel: 'Cancel',
    headers: {
      id: 'ID',
      rank: 'Queue pos.',
      status: 'Status',
      value: 'Amount',
      wallet: 'To wallet',
      date: 'Date',
      actions: 'Actions'
    }
  },
  transactionsTable: {
    headers: {
      id: 'ID',
      status: 'Status',
      value: 'Amount',
      title: 'Operation',
      fromUser: 'From',
      toUser: 'To',
      date: 'Date'
    },
    emptyMessage: 'No transactions was made yet.'
  },
  tableGlobal: {
    tablePageReport: ['Showing', 'to', 'of']
  },
  needWalletPopup: {
    message: 'You need to add a wallet for Grand withdrawals',
    acceptLabel: 'Add wallet',
    rejectLabel: 'I understand'
  },
  needGrandPopup: {
    message: 'You don`t have enough GRAND tokens on your account',
    acceptLabel: 'Get Grand',
    rejectLabel: 'I understand'
  },
  setGrandWithdrawalWalletDialog: {
    header: 'Set my Grand withdrawal address on the Polygon network',
    description: [
      'The address',
      'must support Matic coins deposits on Polygon Network',
      `. We will send your 20% referral reward in Matic Coin (Polygon) to
      this address only! Double check your address; entering an address
      that does not support Matic Coins on Polygon Network or invalid
      address will result in a permanent loss of tokens.`
    ],
    addressLabel: 'Address for issuing funds in the Polygon network',
    addressPlaceholder: '0x0000****0000',
    addressConfirmLabel: 'Address for issuing funds in the Polygon network',
    addressConfirmPlaceholder: '0x0000****0000',
    sutitle: 'или',
    stepOneDescription: `Use Wallet Connect to scan the QR code and connect
    your wallet`,
    agreementLabel: ['I agree with', 'Grand Time Token Sale Terms'],
    stepTwoDescription: `Don't worry, we'll help you create it. Please follow
    our video instructions to create and add your wallet.`,
    grandTokenAddressLabel: 'Grand token address:',
    cardActionsСompletedText:
      'Grand withdrawal address successfully saved, withdrawal functions are now available to you',
    btnNoWallet: 'I don`t have an ERC-20 wallet on the Polygon network',
    btnConfirmWallet: 'Confirm address',
    btnSetWallet: 'Set address',
    noticeCopy: 'address copied to clipboard',
    cantChangeAddress: [
      `You have pending transactions with a wallet that is connected. For security reasons, you are not able to change the address at this moment until all pending transactions associated with this wallet on the platform are completed or canceled.`,
      `If you have pending payment transactions and funds were not submitted, the transaction will be canceled automatically within 24 hours. If you have pending Grand withdrawal transactions, you can cancel them at the Grand Wallet page, in the “Withdrawal Requests” section.`
    ]
  },
  launchpadWelcomeCard: {
    title: 'Welcome to Grand Token Launchpad',
    description: `Congratulations! You have found the Grand Token Launchpad, and you are one of the
    early token buyers for the top crypto project of 2022. The launchpad will continue
    for 201 phases, and the token price will increase each phase. All tokens will be
    deposited to token buyers within 24 hours of the investment. Token will be listed on
    multiple crypto exchanges for the price of the last phase achieved after the end of
    the launchpad. After that, the market will take over the valuation and the fun
    begins. The team behind the Grand Token is vested for 4 years and will do everything
    to reach the long-term goals for the Grand Time ecosystem and Grand token.`,
    account: 'Account',
    tokenAddress: 'Grand Token withdrawal address',
    btnChange: 'Change my Grand withdrawal address',
    btnSet: 'Set my Grand Token withdrawal address',
    statuses: {
      none: 'None',
      confirmation: 'Confirmation',
      confirmed: 'Confirmed'
    }
  },
  phaseInfoCard: {
    title: 'Grand Token Sale Launchpad Progress',
    phaseOneOf: 'Phase {phase} of 201',
    phasePercent: '{percent} in phase',
    amountInPhase: 'of {amount} for current phase',
    currentGrandPrice: 'Current Grand Price',
    priceInNextPhase: '${price} next phase',
    totalCollected: 'Total Raised'
  },
  investCards: {
    title: 'Invest in the grand token with',
    appedText: 'For large transactions please contact us via',
    investMethods: {
      coinpayments: {
        title: 'Any Cryptocurrency',
        btnName: 'Buy with Any Cryptocurrency'
      },
      matic: {
        title: 'Direct Matic deposit',
        btnName: 'Buy with Direct Matic Coin Deposit'
      },
      card: {
        title: 'Debit & Credit Card',
        btnName: 'Buy with Visa or MasterCard'
      }
    }
  },
  affiliateProgramInfoCard: {
    title: 'Grand token affiliate program',
    description: `Share the Grand Token Launchpad with friends. All you need to do is to
    send your unique referral link via private message, post it in your social
    media, video or article in your community. We will reward you for every
    investor made from your recommendation. Your referral share is 20% of
    every investment made by your referrals using your affiliate link.`,
    link: 'Find more about affiliate program'
  },
  launchpadTransactionsTable: {
    title: 'Transaction history',
    headers: {
      ethValueLabel: 'MATIC Value',
      valueLabel: 'GRAND Value',
      method: 'Method'
    },
    ethValueLabelTooltip: `This is the amount of your purchase, converted to Matic Coin
      that our smart contract has received after all fees &
      commissions deducted by payment providers and Polygon network.
      Smart contract uses this final amount to calculate a quantity
      of Grand Tokens that will be sent to your withdrawal wallet.`
  },
  referralTransactionsTable: {
    headers: {
      date: 'Date',
      userID: 'User ID',
      grandPurchaseAmount: 'Grand Purchase Amount',
      referralPurchaseAmount: 'Referral Purchase Amount',
      yourReferralBonus: 'Your Referral Bonus',
      status: 'Status'
    },
    emptyMessage: 'No transaction was made by your referral yet'
  },
  affiliateReferredStatusCard: {
    title: 'Launchpad affiliate programs',
    peopleReferred: 'People referred',
    referralEarnings: 'Referral Earnings'
  },
  aboutAffiliateProgram: {
    title: 'How do the affiliate program work?',
    description: `Share the Grand Token Launchpad with friends. All you need to do is to
    send your unique referral link via private message, post it in your social
    media, video or article in your community. We will reward you for every
    investor made from your recommendation. Your referral share is 20% of
    every investment made by your referrals using your affiliate link. This
    amount will be deposited in Matic Coin to your connected referral
    withdrawal wallet.`
  },
  createRefLinkForm: {
    title: 'Create your unique ref link',
    checkBoxLavelAgree: ['I accept the', 'terms of use'],
    btnSubmit: {
      get: 'Get ref link',
      getNew: 'Get a new ref link'
    },
    affiliatesSupportLink: 'Affiliates Support Chat',
    copyMessage: 'link copied to clipboard',
    setWalletPopupText: 'In order to receive a referral link, please connect your withdrawal address first.',
    linkNotCreated: 'Link not created yet'
  },
  myRefLinkCard: {
    title: 'My referral link',
    subTitle: '20% Matic Referral Link',
    linkNotCreated: 'Link not created yet'
  },
  referralAddressCard: {
    title: 'Referral rewards withdrawal address',
    btnSubmit: {
      change: 'Change My Referral Rewards Withdrawal Address',
      set: 'Set My Referral Rewards Withdrawal Address'
    }
  },
  infoActionCards: {
    yourBalance: 'Your balance',
    transferP2P: 'P2P transfer',
    transferFund: 'Transfer fund',
    grandTokensWithdrawal: 'Grand Tokens Withdrawal',
    withdrawFunds: 'Withdraw funds',
    partners: 'Partners',
    inactive: 'inactive',
    new: 'new'
  },
  userStatusList: {
    title: 'Your status'
  },
  allTransactions: 'All transactions',
  withdrawRequests: 'Withdraw Requests',
  statusCard: {
    partnerLevel: 'Partner revenue level',
    balanceRequired: 'Grand Balance Required'
  },
  appSidebar: {
    dashboard: 'Dashboard',
    grandTokenLaunchpad: 'Grand Token Launchpad',
    wallet: 'Grand Wallet',
    blogs: 'Crypto News',
    buyGrandTokens: 'Buy Grand Tokens',
    affiliateProgram: 'Grand Token Affiliate Program',
    tokenSaleFAQ: 'Grand Token Sale FAQ',
    DEV: 'DEV',
    DEVComponents: 'Components',
    DEVIcons: 'Icons'
  },
  routeNames: {
    Dashboard: 'Dashboard',
    Launchpad: 'Launchpad',
    'Grand Wallet': 'Grand Wallet',
    'Crypto News': 'Crypto News',
    'Launchpad affiliate': 'Launchpad affiliate',
    'DEV Components': 'DEV Components',
    'DEV Icons': 'DEV Icons'
  }
}
