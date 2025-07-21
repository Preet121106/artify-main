/* eslint-disable prettier/prettier */
import type { TabType } from './types';

export const TAB_ICONS: Record<TabType, string> = {
  profile: 'i-ph:user-circle-fill',
  settings: 'i-ph:gear-six-fill',
  notifications: 'i-ph:bell-fill',
  features: 'i-ph:star-fill',
  data: 'i-ph:database-fill',
  'cloud-providers': 'i-ph:cloud-fill',
  'local-providers': 'i-ph:desktop-fill',
  'service-status': 'i-ph:activity-bold',
  connection: 'i-ph:wifi-high-fill',
  debug: 'i-ph:bug-fill',
  'event-logs': 'i-ph:list-bullets-fill',
  update: 'i-ph:arrow-clockwise-fill',
  'task-manager': 'i-ph:chart-line-fill',
  'tab-management': 'i-ph:squares-four-fill',
};

export const TAB_LABELS: Record<TabType, string> = {
  profile: 'Profile',
  settings: 'Settings',
  notifications: 'Notifications',
  features: 'Features',
  data: 'Data Management',
  'cloud-providers': 'Cloud Providers',
  'local-providers': 'Local Providers',
  'service-status': 'Service Status',
  connection: 'Connection',
  debug: 'Debug',
  'event-logs': 'Event Logs',
  update: 'Updates',
  'task-manager': 'Task Manager',
  'tab-management': 'Tab Management',
};

export const TAB_DESCRIPTIONS: Record<TabType, string> = {
  profile: 'Manage your profile and account settings',
  settings: 'Customize application configuration',
  notifications: 'Review and administer your notifications',
  features: 'Discover new and upcoming features',
  data: 'Configure data and storage preferences',
  'cloud-providers': 'Set up cloud-based AI models',
  'local-providers': 'Manage settings for local AI models',
  'service-status': 'Track cloud LLM service health',
  connection: 'Check network connection and configuration',
  debug: 'Access Debug Tools and System Info',
  'event-logs': 'Monitor system activity and logs',
  update: 'Check for the latest updates and changelog',
  'task-manager': 'View system resource usage and running processes',
  'tab-management': 'Define tab display settings and layout order',
};

export const DEFAULT_TAB_CONFIG = [
  // User Window Tabs (Always visible by default)
  { id: 'features', visible: true, window: 'user' as const, order: 0 },
  { id: 'data', visible: true, window: 'user' as const, order: 1 },
  { id: 'cloud-providers', visible: true, window: 'user' as const, order: 2 },
  { id: 'local-providers', visible: true, window: 'user' as const, order: 3 },
  { id: 'connection', visible: true, window: 'user' as const, order: 4 },
  { id: 'notifications', visible: true, window: 'user' as const, order: 5 },

  // { id: 'event-logs', visible: true, window: 'user' as const, order: 6 },

  // User Window Tabs (In dropdown, initially hidden)

  // { id: 'profile', visible: false, window: 'user' as const, order: 7 },
  { id: 'settings', visible: false, window: 'user' as const, order: 8 },
  { id: 'task-manager', visible: false, window: 'user' as const, order: 9 },
  { id: 'service-status', visible: false, window: 'user' as const, order: 10 },

  // User Window Tabs (Hidden, controlled by TaskManagerTab)
  { id: 'debug', visible: false, window: 'user' as const, order: 11 },
  { id: 'update', visible: false, window: 'user' as const, order: 12 },

  // Developer Window Tabs (All visible by default)
  { id: 'features', visible: true, window: 'developer' as const, order: 0 },
  { id: 'data', visible: true, window: 'developer' as const, order: 1 },
  { id: 'cloud-providers', visible: true, window: 'developer' as const, order: 2 },
  { id: 'local-providers', visible: true, window: 'developer' as const, order: 3 },
  { id: 'connection', visible: true, window: 'developer' as const, order: 4 },
  { id: 'notifications', visible: true, window: 'developer' as const, order: 5 },

  // { id: 'event-logs', visible: true, window: 'developer' as const, order: 6 },

  // { id: 'profile', visible: true, window: 'developer' as const, order: 7 },
  { id: 'settings', visible: true, window: 'developer' as const, order: 8 },
  { id: 'task-manager', visible: true, window: 'developer' as const, order: 9 },
  { id: 'service-status', visible: true, window: 'developer' as const, order: 10 },
  { id: 'debug', visible: true, window: 'developer' as const, order: 11 },
  { id: 'update', visible: true, window: 'developer' as const, order: 12 },
];
