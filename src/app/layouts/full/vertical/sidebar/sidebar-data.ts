import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/dashboards/dashboard1',
  },

  {
    navCap: 'Academic',
  },
  {
    displayName: 'Students',
    iconName: 'users',
    route: '/students/list',
  },
  {
    displayName: 'Teachers',
    iconName: 'chalkboard',
    route: '/teachers/list',
  },
  {
    displayName: 'Classes',
    iconName: 'school',
    route: '/classes/list',
  },
  {
    displayName: 'Subjects',
    iconName: 'book',
    route: '/subjects/list',
  },

  {
    navCap: 'Operations',
  },
  {
    displayName: 'Attendance',
    iconName: 'calendar-check',
    route: '/attendance',
  },
  {
    displayName: 'Timetable',
    iconName: 'clock',
    route: '/timetable',
  },
  {
    displayName: 'Exams & Grades',
    iconName: 'pencil',
    route: '/exams',
  },

  {
    navCap: 'Finance',
  },
  {
    displayName: 'Fee Management',
    iconName: 'cash',
    route: '/fees/list',
  },
  {
    displayName: 'Payments',
    iconName: 'credit-card',
    route: '/payments/list',
  },

  {
    navCap: 'Administration',
  },
  {
    displayName: 'Staff',
    iconName: 'id-badge',
    route: '/staff/list',
  },
  {
    displayName: 'Announcements',
    iconName: 'speakerphone',
    route: '/announcements',
  },
  {
    displayName: 'Reports',
    iconName: 'chart-bar',
    route: '/reports',
  },
  {
    displayName: 'Settings',
    iconName: 'settings',
    route: '/settings',
  },
];
