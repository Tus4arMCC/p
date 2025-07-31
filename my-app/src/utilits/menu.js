export const roles = ["admin", "user", "contractor"];
export const menuData = [
  {
    title: "Dashboard",
    link: "/dashboard",
    roles: ["admin", "user", "contractor"],
    submenu: []
  },
  {
    title: "User Management",
    link: "/users",
    roles: ["admin"],
    submenu: [
      {
        title: "Add User",
        link: "/users/add",
        roles: ["admin"],
        submenu: []
      },
      {
        title: "Edit User",
        link: "/users/edit",
        roles: ["admin"],
        submenu: []
      }
    ]
  },
  {
    title: "Projects",
    link: "/projects",
    roles: ["admin", "contractor"],
    submenu: [
      {
        title: "My Projects",
        link: "/projects/my",
        roles: ["contractor"],
        submenu: [
          {
            title: "Project Reports",
            link: "/projects/my/reports",
            roles: ["contractor"],
            submenu: []
          }
        ]
      },
      {
        title: "All Projects",
        link: "/projects/all",
        roles: ["admin"],
        submenu: []
      }
    ]
  },
  {
    title: "Settings",
    link: "/settings",
    roles: ["admin", "user"],
    submenu: [
      {
        title: "Profile",
        link: "/settings/profile",
        roles: ["admin", "user"],
        submenu: []
      },
      {
        title: "Security",
        link: "/settings/security",
        roles: ["admin"],
        submenu: []
      }
    ]
  },
  {
    title: "Help",
    link: "/help",
    roles: ["admin", "user", "contractor"],
    submenu: []
  }
];

// 🛠️ How this works

// roles: Defines all available roles.

// selectedRole: Can be set dynamically (e.g., "admin", "user", "contractor").

// menu: An array of menu items. Each item can have:

// title: Display text.

// link: Navigation URL/path.

// roles: Array of roles that can access this item.

// submenu: Nested array of the same structure, enabling unlimited depth.