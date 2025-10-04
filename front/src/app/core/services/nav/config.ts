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
    { label: 'Inicio', icon: 'home', route: '/shelters' },
    { label: 'Animales', icon: 'pets', route: '/animals' },
    { label: 'Usuarios', icon: 'people', route: '/users' },
    { label: 'Accounts', icon: 'account_circle', route: '/accounts' },
    { label: 'Reports', icon: 'assessment', route: '/reports' },
    { label: 'Configuración', icon: 'settings', route: '/settings' },
  ],
  moderator: [
    { label: 'Inicio', icon: 'home', route: '/dashboard' },
    { label: 'Animales', icon: 'pets', route: '/animals' },
    { label: 'Adopciones', icon: 'favorite', route: '/animals' },
    { label: 'Voluntarios', icon: 'people', route: '/volunteers' },
    { label: 'Calendario', icon: 'today', route: '/callendar' },
    { label: 'Configuración', icon: 'settings', route: '/settings' },

  ],
  regular: [
    { label: 'Inicio', icon: 'home', route: '/dashboard' },
    { label: 'Animals', icon: 'pets', route: '/animals' },
    { label: 'My Profile', icon: 'account_circle', route: '/profile' },
    { label: 'Configuración', icon: 'settings', route: '/settings' },
  ]
};