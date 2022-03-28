
/**
 * @enum
 */
export enum UserRoles {
  ADMIN = 'admin', //sees everything
  MODERATOR = 'moderator',
  USER = 'user',
  RESTRICTED = 'restricted',
  SPECIAL = 'special',
  ALL = "all"
}

function isQualified(role: UserRoles, Qualification: UserRoles): boolean {
  console.log(role,Qualification)
  if (Qualification == "all" || role == "admin") return true;
  return false
}

export function checkRight(userRole: string, role: UserRoles): boolean {
  const userRoleExists = (Object.values(UserRoles) as string[]).includes(userRole)
  return userRoleExists && isQualified(userRole as UserRoles, role);
}

