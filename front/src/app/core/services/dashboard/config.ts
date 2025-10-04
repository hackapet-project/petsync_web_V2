export type Widget = {
  title: string,
  type: string,
  dataSource: string,
  icon: string,
  route: string
}

export interface DashConfig {
  role: string,
  widgets: Widget[]
}


export const dashConfig = {
  admin: {
    role: 'admin',
    widgets: [
      { title: 'Total Shelters', type: 'stat', dataSource: 'shelters', icon: 'home' },
      { title: 'Total Users', type: 'stat', dataSource: 'users', icon: 'people' },
      { title: 'Total Animals', type: 'stat', dataSource: 'animals', icon: 'pets' },
      { title: 'Recent Users', type: 'list', dataSource: 'users', icon: 'person_add', route: '/users' }
    ]
  },
  moderator: {
    role: 'moderator',
    widgets: [
      { title: 'My Shelter', type: 'detail', dataSource: 'shelters', icon: 'home' },
      { title: 'Animals in Shelter', type: 'stat', dataSource: 'animals', icon: 'pets' },
      { title: 'Volunteers', type: 'list', dataSource: 'users', icon: 'people', route: '/volunteers' },
      { title: 'Recent Animals', type: 'list', dataSource: 'animals', icon: 'pets_add', route: '/animals' }
    ]
  },
  regular: {
    role: 'regular',
    widgets: [
      { title: 'Available Animals', type: 'list', dataSource: 'animals', icon: 'pets' },
      { title: 'My Shelters', type: 'list', dataSource: 'shelters', icon: 'home', route: '/shelters' }
    ]
  }
};