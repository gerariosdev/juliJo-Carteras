-- Seed SQL para JuliJo Carteras
-- Correr con: PGPASSWORD=julijo123 psql -h 127.0.0.1 -p 5433 -U julijo -d julijo_carteras -f seed.sql

BEGIN;

-- Permisos
INSERT INTO "Permission" (id, resource, action) VALUES
  ('product:create', 'product', 'create'),
  ('product:read', 'product', 'read'),
  ('product:update', 'product', 'update'),
  ('product:delete', 'product', 'delete'),
  ('product:manage', 'product', 'manage'),
  ('order:create', 'order', 'create'),
  ('order:read', 'order', 'read'),
  ('order:update', 'order', 'update'),
  ('order:delete', 'order', 'delete'),
  ('order:manage', 'order', 'manage'),
  ('user:create', 'user', 'create'),
  ('user:read', 'user', 'read'),
  ('user:update', 'user', 'update'),
  ('user:delete', 'user', 'delete'),
  ('user:manage', 'user', 'manage'),
  ('role:create', 'role', 'create'),
  ('role:read', 'role', 'read'),
  ('role:update', 'role', 'update'),
  ('role:delete', 'role', 'delete'),
  ('role:manage', 'role', 'manage'),
  ('blog:create', 'blog', 'create'),
  ('blog:read', 'blog', 'read'),
  ('blog:update', 'blog', 'update'),
  ('blog:delete', 'blog', 'delete'),
  ('blog:manage', 'blog', 'manage'),
  ('coupon:create', 'coupon', 'create'),
  ('coupon:read', 'coupon', 'read'),
  ('coupon:update', 'coupon', 'update'),
  ('coupon:delete', 'coupon', 'delete'),
  ('coupon:manage', 'coupon', 'manage'),
  ('stock:create', 'stock', 'create'),
  ('stock:read', 'stock', 'read'),
  ('stock:update', 'stock', 'update'),
  ('stock:delete', 'stock', 'delete'),
  ('stock:manage', 'stock', 'manage')
ON CONFLICT (id) DO NOTHING;

-- Roles (con updatedAt explícito)
INSERT INTO "Role" (id, name, description, "isSystem", "updatedAt") VALUES
  ('role-super-admin', 'super_admin', 'Control total del sistema', true, NOW()),
  ('role-ventas', 'ventas', 'Gestiona productos (sin eliminar) y órdenes', true, NOW()),
  ('role-inventario', 'inventario', 'Gestiona stock y variantes', true, NOW()),
  ('role-contenido', 'contenido', 'Gestiona blog y páginas', true, NOW())
ON CONFLICT (name) DO NOTHING;

-- RolePermission
INSERT INTO "RolePermission" ("roleId", "permissionId")
SELECT 'role-super-admin', id FROM "Permission"
ON CONFLICT DO NOTHING;

INSERT INTO "RolePermission" ("roleId", "permissionId")
SELECT 'role-ventas', id FROM "Permission"
WHERE resource IN ('product', 'order') AND action != 'delete'
ON CONFLICT DO NOTHING;

INSERT INTO "RolePermission" ("roleId", "permissionId")
SELECT 'role-inventario', id FROM "Permission"
WHERE resource IN ('product', 'stock')
ON CONFLICT DO NOTHING;

INSERT INTO "RolePermission" ("roleId", "permissionId")
SELECT 'role-contenido', id FROM "Permission"
WHERE resource = 'blog'
ON CONFLICT DO NOTHING;

-- Super Admin (con updatedAt explícito)
INSERT INTO "User" (id, email, name, password, "updatedAt")
VALUES (
  'admin-001',
  'gerarios26@gmail.com',
  'Gerardo Ríos',
  '$2b$10$rwEgUdNWDHf9r/fnRYee4Of236briTivTnXsLegnDbs8JjCOrqafW',
  NOW()
)
ON CONFLICT (email) DO NOTHING;

INSERT INTO "UserRole" ("userId", "roleId")
VALUES ('admin-001', 'role-super-admin')
ON CONFLICT DO NOTHING;

-- Categorías (con updatedAt explícito)
INSERT INTO "Category" (id, name, slug, description, "order", "updatedAt") VALUES
  ('cat-1', 'Carteras', 'carteras', 'Carteras de cuero artesanales para todo estilo', 1, NOW()),
  ('cat-2', 'Carteritas', 'carteritas', 'Carteritas pequeñas y elegantes', 2, NOW()),
  ('cat-3', 'Billeteras', 'billeteras', 'Billeteras de cuero para hombre y mujer', 3, NOW()),
  ('cat-4', 'Mochilas', 'mochilas', 'Mochilas y bolsos artesanales', 4, NOW()),
  ('cat-5', 'Accesorios', 'accesorios', 'Cinturones, llaveros y más', 5, NOW())
ON CONFLICT (slug) DO NOTHING;

-- Materiales
INSERT INTO "Material" (id, name, slug) VALUES
  ('mat-1', 'Cuero vacuno', 'cuero-vacuno'),
  ('mat-2', 'Cuero cordobán', 'cuero-cordoban'),
  ('mat-3', 'Badana', 'badana'),
  ('mat-4', 'Cuero grabado', 'cuero-grabado'),
  ('mat-5', 'Cuero liso', 'cuero-liso')
ON CONFLICT (slug) DO NOTHING;

COMMIT;

\echo '✅ Seed completado!'
