import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is required");

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seed de JuliJo Carteras...\n");

  // ─── Permisos ───
  console.log("🔑 Creando permisos...");
  const resources = ["product", "order", "user", "role", "blog", "coupon", "stock"];
  const actions = ["create", "read", "update", "delete", "manage"];

  for (const resource of resources) {
    for (const action of actions) {
      await prisma.permission.upsert({
        where: { id: `${resource}:${action}` },
        update: {},
        create: { id: `${resource}:${action}`, resource, action },
      });
    }
  }
  console.log(`✅ ${resources.length * actions.length} permisos creados`);

  // ─── Roles ───
  console.log("\n👥 Creando roles...");
  const allPerms = await prisma.permission.findMany();

  const roles = [
    {
      name: "super_admin", description: "Control total del sistema", isSystem: true,
      perms: allPerms,
    },
    {
      name: "ventas", description: "Gestiona productos (sin eliminar) y órdenes", isSystem: true,
      perms: allPerms.filter(p => !(p.resource === "product" && p.action === "delete") && !["user", "role", "coupon"].includes(p.resource)),
    },
    {
      name: "inventario", description: "Gestiona stock y variantes", isSystem: true,
      perms: allPerms.filter(p => ["product", "stock"].includes(p.resource) || p.action === "read"),
    },
    {
      name: "contenido", description: "Gestiona blog y páginas", isSystem: true,
      perms: allPerms.filter(p => ["blog"].includes(p.resource) || (p.action === "read" && ["product", "order"].includes(p.resource))),
    },
  ];

  for (const role of roles) {
    const created = await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: { name: role.name, description: role.description, isSystem: role.isSystem },
    });
    for (const perm of role.perms) {
      await prisma.rolePermission.upsert({
        where: { roleId_permissionId: { roleId: created.id, permissionId: perm.id } },
        update: {},
        create: { roleId: created.id, permissionId: perm.id },
      });
    }
    console.log(`  ✅ ${role.name} — ${role.perms.length} permisos`);
  }

  // ─── Super Admin ───
  console.log("\n👤 Creando Super Admin...");
  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "gerarios26@gmail.com" },
    update: {},
    create: {
      email: "gerarios26@gmail.com",
      name: "Gerardo Ríos",
      password: adminPassword,
    },
  });
  const superRole = await prisma.role.findUnique({ where: { name: "super_admin" } });
  if (superRole) {
    await prisma.userRole.upsert({
      where: { userId_roleId: { userId: admin.id, roleId: superRole.id } },
      update: {},
      create: { userId: admin.id, roleId: superRole.id },
    });
  }
  console.log(`  ✅ ${admin.email} — password: admin123`);

  // ─── Categorías ───
  console.log("\n📁 Creando categorías...");
  const categories = [
    { name: "Carteras", slug: "carteras", description: "Carteras de cuero artesanales para todo estilo", order: 1 },
    { name: "Carteritas", slug: "carteritas", description: "Carteritas pequeñas y elegantes", order: 2 },
    { name: "Billeteras", slug: "billeteras", description: "Billeteras de cuero", order: 3 },
    { name: "Mochilas", slug: "mochilas", description: "Mochilas y bolsos artesanales", order: 4 },
    { name: "Accesorios", slug: "accesorios", description: "Cinturones, llaveros y más", order: 5 },
  ];
  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug }, update: {}, create: cat,
    });
  }
  console.log(`  ✅ ${categories.length} categorías`);

  // ─── Materiales ───
  console.log("\n🧵 Creando materiales...");
  const materials = [
    { name: "Cuero vacuno", slug: "cuero-vacuno" },
    { name: "Cuero cordobán", slug: "cuero-cordoban" },
    { name: "Badana", slug: "badana" },
    { name: "Cuero grabado", slug: "cuero-grabado" },
    { name: "Cuero liso", slug: "cuero-liso" },
  ];
  for (const mat of materials) {
    await prisma.material.upsert({
      where: { slug: mat.slug }, update: {}, create: mat,
    });
  }
  console.log(`  ✅ ${materials.length} materiales`);

  console.log("\n🎉 Seed completado exitosamente!");
}

main()
  .catch(e => { console.error("❌ Error:", e); process.exit(1); })
  .finally(() => prisma.$disconnect());
