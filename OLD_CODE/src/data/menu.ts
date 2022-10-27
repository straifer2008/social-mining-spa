export default {
  data: [
    {
      path: '/',
      title: 'appSidebar.myTasks',
      icon: 'my-tasks',
      type: 'sub',
      badgeType: 'primary',
      badgeValue: '',
      active: true,
      children: [
        {
          path: '/create-new',
          title: 'appSidebar.createNew',
          type: 'link'
        },
        {
          path: '/my-tasks',
          title: 'appSidebar.taskList',
          type: 'link'
        }
      ]
    },
    {
      path: '/my-profile',
      title: 'appSidebar.myProfile',
      icon: 'my-profile',
      type: 'link',
      exact: true,
      bookmark: true
    },
    {
      path: '/knowledge-help',
      title: 'appSidebar.knowledgeHelp',
      icon: 'knowledge-help',
      type: 'link',
      exact: true,
      bookmark: true
    },
  ]
}
