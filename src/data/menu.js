export default {
  data: [
    {
      path: '/',
      title: 'appSidebar.dashboard',
      icon: 'home',
      type: 'link',
      exact: true,
      bookmark: true
    },
    {
      title: 'appSidebar.grandTokenLaunchpad',
      icon: 'activity',
      type: 'sub',
      badgeType: 'primary',
      badgeValue: '',
      active: false,
      children: [
        {
          path: '/launchpad',
          title: 'appSidebar.buyGrandTokens',
          type: 'link'
        },
        {
          path: '/affiliate',
          title: 'appSidebar.affiliateProgram',
          type: 'link'
        },
        {
          path: 'https://grandtime88.zendesk.com/hc/en-us',
          title: 'appSidebar.tokenSaleFAQ',
          type: 'extTabLink'
        }
      ]
    },
    {
      path: '/wallet',
      title: 'appSidebar.wallet',
      icon: 'list',
      type: 'link',
    },
    {
      path: '/blogs',
      title: 'appSidebar.blogs',
      icon: 'hash',
      type: 'link',
    },
    {
      title: 'appSidebar.DEV',
      icon: 'code',
      type: 'sub',
      badgeType: 'warning',
      badgeValue: 'local',
      active: false,
      hidden: !import.meta.env.DEV,
      children: [
        {
          path: '/components',
          title: 'appSidebar.DEVComponents',
          type: 'link'
        },
        { path: '/icons', title: 'appSidebar.DEVIcons', type: 'link' }
      ]
    }
  ]
}
