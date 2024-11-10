// -- ./src/config/menus.ts

import {
  GraduationCap,
  Users,
  User,
  SquareUser,
  LayoutDashboardIcon,
  SchoolIcon,
  Calendar,
  HouseIcon,
} from 'lucide-react';
import { ClientRole } from 'src/lib/type';

// Types for the new configuration of menusConfig
export type Role = 'admin' | 'blank';

export type NavItem = {
  title: string;
  icon?: any; // Replace 'any' with the appropriate icon type if available
  href?: string;
  requiredRoles?: ClientRole[];
  child?: NavItem[];
  nested?: NavItem[]; // Added nested property to support deeper levels
  isHeader?: boolean;
};

// Type for the main navigation, which is shared by all roles
export type MainNavType = NavItem;

// Type for each role's sidebar navigation configuration (modern or classic)
export type SidebarNavType = {
  modern: NavItem[];
  classic: NavItem[];
};

// Type for each role-specific configuration in menusConfig
export type RoleMenuConfig = {
  mainNav: MainNavType[];
  sidebarNav: SidebarNavType;
};

// The overall type for menusConfig now that it includes role-specific configurations
export type MenusConfigType = {
  [key in Role]: RoleMenuConfig;
};

// Export the actual configuration with the updated type
export const menusConfig: MenusConfigType = {
  admin: {
    mainNav: [
      {
        title: 'Home',
        icon: LayoutDashboardIcon,
        href: '/',
        requiredRoles: [ClientRole.ADMIN],
      },
    ],
    sidebarNav: {
      modern: [
        {
          title: 'Task Tracker',
          icon: SchoolIcon,
          requiredRoles: [ClientRole.ADMIN],
          child: [
            {
              title: 'Clients',
              href: '/dashboard/clients',
              icon: Users,
              requiredRoles: [ClientRole.ADMIN],
            },
            {
              title: 'Tasks',
              href: '/dashboard/tasks',
              icon: Calendar,
              requiredRoles: [ClientRole.ADMIN],
            },
            // {
            //   title: 'Attendance',
            //   icon: Calendar,
            //   requiredRoles: [ClientRole.ADMIN],
            //   nested: [
            //     {
            //       title: 'History',
            //       href: '/dashboard/attendances-history',
            //       icon: Calendar,
            //       requiredRoles: [ClientRole.ADMIN],
            //     },
            //   ],
            // },
          ],
        },
      ],
      classic: [
        {
          isHeader: true,
          title: 'Menu',
        },
        {
          title: 'Blank',
          icon: LayoutDashboardIcon,
          href: '/blank',
        },
      ],
    },
  },
  blank: {
    mainNav: [
      {
        title: 'NotFound',
        icon: LayoutDashboardIcon,
        href: '/',
      },
    ],
    sidebarNav: {
      modern: [
        {
          title: 'NotFound',
          icon: LayoutDashboardIcon,
          href: '/',
        },
      ],
      classic: [],
    },
  },
};
