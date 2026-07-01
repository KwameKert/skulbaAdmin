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
    iconName: 'user-search',
    route: '/students/search',
  },
  {
    displayName: 'Guardians',
    iconName: 'users',
    route: '/guardians/search',
  },
  {
    displayName: 'Staff',
    iconName: 'id-badge-2',
    route: '/staffs/search',
  },
  // {
  //   navCap: 'Operations',
  // },
  // {
  //   displayName: 'Attendance',
  //   iconName: 'calendar-check',
  //   route: '/attendance',
  // },
  // {
  //   displayName: 'Timetable',
  //   iconName: 'clock',
  //   route: '/timetable',
  // },
  // {
  //   displayName: 'Exams & Grades',
  //   iconName: 'pencil',
  //   route: '/exams',
  // },

  // {
  //   navCap: 'Finance',
  // },
  // {
  //   displayName: 'Fee Management',
  //   iconName: 'cash',
  //   route: '/fees/list',
  // },
  // {
  //   displayName: 'Payments',
  //   iconName: 'credit-card',
  //   route: '/payments/list',
  // },

  {
    navCap: 'Payroll',
  },
  {
    displayName: 'Statutory Deductions',
    iconName: 'file-certificate',
    route: '/payroll/statutory',
  },
  {
    displayName: 'PAYE Bands',
    iconName: 'percentage',
    route: '/payroll/paye-bands',
  },

  {
    navCap: 'Administration',
  },
  {
    displayName: 'Subscriptions',
    iconName: 'receipt-2',
    route: '/subscription/list',
  },
  {
    displayName: 'Tenants',
    iconName: 'building',
    route: '/tenants/list',
  },
  // {
  //   displayName: 'Settings',
  //   iconName: 'settings',
  //   route: '/settings',
  // },
];
