export type UserRole = 'admin' | 'moderator' | 'regular';

export interface NavItem {
  label: string;
  icon: string;
  route: string;
  permission?: string[];
}

export interface RoleConfig {
  navigation: NavItem[];
  widgets: WidgetConfig[];
}

export interface WidgetConfig {
  component: string; // Component class name
  position?: number; // Optional: for ordering
  config?: any; // Optional: widget-specific configuration
}

export interface NavConfig {
  [role: string]: RoleConfig;
}

export const config: NavConfig = {
  admin: {
    navigation: [
      { label: 'Inicio', icon: 'home', route: '/shelters' },
      { label: 'Animales', icon: 'pets', route: '/animals' },
      { label: 'Usuarios', icon: 'people', route: '/users' },
      { label: 'Accounts', icon: 'account_circle', route: '/accounts' },
      { label: 'Reports', icon: 'assessment', route: '/reports' },
      { label: 'Configuración', icon: 'settings', route: '/settings' },
    ],
    widgets: [
      { component: 'AnimalList', position: 1 },
      // { component: 'EventsWidgetComponent', position: 2 },
      // { component: 'ReportsWidgetComponent', position: 3 },
    ]
  },
  moderator: {
    navigation: [
      { label: 'Inicio', icon: 'home', route: '/dashboard' },
      { label: 'Animales', icon: 'sound_detection_dog_barking', route: '/animals' },
      { label: 'Adopciones', icon: 'book', route: '/adoptions' },
      { label: 'Voluntarios', icon: 'people', route: '/volunteers' },
      { label: 'Calendario', icon: 'today', route: '/callendar' },
      { label: 'Configuración', icon: 'settings', route: '/settings' },
    ],
    widgets: [
      // { component: 'AnimalList', position: 2 },
      { component: 'AnimalList', position: 1 },
      // { component: 'AnimalList', position: 3 },
    ]
  },
  regular: {
    navigation: [
      { label: 'Inicio', icon: 'home', route: '/dashboard' },
      { label: 'Animals', icon: 'pets', route: '/animals' },
      { label: 'My Profile', icon: 'account_circle', route: '/profile' },
      { label: 'Configuración', icon: 'settings', route: '/settings' },
    ],
    widgets: []
  }
};
