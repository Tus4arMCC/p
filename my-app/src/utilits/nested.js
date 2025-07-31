export default function filterMenuByRole(menu, role) {
  return menu
    .filter(item => item.roles.includes(role))
    .map(item => ({
      ...item,
      submenu: filterMenuByRole(item.submenu, role)
    }));
}
