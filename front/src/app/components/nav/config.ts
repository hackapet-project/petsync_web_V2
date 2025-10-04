export type UserRole = 'admin' | 'moderator' | 'regular';

export interface NavConfig {
  [role: string]: NavItem[];
}

export interface NavItem {
  label: string;
  icon: string;
  route: string;
  permission?: string[];
}

export const config: NavConfig = {
  admin: [
    { label: 'All Shelters', icon: 'home', route: '/shelters' },
    { label: 'Animals', icon: 'pets', route: '/animals' },
    { label: 'Users', icon: 'people', route: '/users' },
    { label: 'Accounts', icon: 'account_circle', route: '/accounts' },
    { label: 'Reports', icon: 'assessment', route: '/reports' }
  ],
  moderator: [
    { label: 'My Shelter', icon: 'home', route: '/my-shelter' },
    { label: 'Animals', icon: 'pets', route: '/animals' },
    { label: 'Volunteers', icon: 'people', route: '/volunteers' },
    { label: 'Reports', icon: 'assessment', route: '/reports' }
  ],
  regular: [
    { label: 'Shelters', icon: 'home', route: '/shelters' },
    { label: 'Animals', icon: 'pets', route: '/animals' },
    { label: 'My Profile', icon: 'account_circle', route: '/profile' }
  ]
};