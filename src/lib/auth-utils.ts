import { auth } from "@/lib/auth";

export type Permission = {
  resource: string;
  action: string;
};

export type UserRole = {
  id: string;
  name: string;
  permissions: Permission[];
};

/**
 * Verifica si un usuario tiene permiso para una acción sobre un recurso.
 * Super Admin tiene acceso a todo (manage).
 */
export function hasPermission(
  roles: UserRole[],
  resource: string,
  action: string
): boolean {
  return roles.some((role) => {
    if (role.name === "super_admin") return true;
    return role.permissions.some(
      (p) =>
        (p.resource === resource || p.resource === "*") &&
        (p.action === action || p.action === "manage")
    );
  });
}

/**
 * Obtiene el usuario autenticado con sus roles.
 */
export async function getAuthUser() {
  const session = await auth();
  if (!session?.user) return null;
  return {
    id: session.user.id,
    email: session.user.email!,
    name: session.user.name || "",
    // @ts-expect-error - custom field
    roles: (session.user.roles || []) as UserRole[],
  };
}

/**
 * Middleware helper: requiere que el usuario tenga cierto permiso.
 */
export async function requirePermission(
  resource: string,
  action: string
): Promise<{ allowed: boolean; redirect?: string }> {
  const user = await getAuthUser();
  if (!user) return { allowed: false, redirect: "/ingresar" };

  const allowed = hasPermission(user.roles, resource, action);
  if (!allowed) return { allowed: false, redirect: "/?error=unauthorized" };

  return { allowed: true };
}
