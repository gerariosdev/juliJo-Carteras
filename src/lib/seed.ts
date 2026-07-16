import { PrismaClient } from "../generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Iniciando seed de JuliJo Carteras...\n");

  // ──────────────────────────────────
  // Categorías
  // ──────────────────────────────────
  console.log("📁 Creando categorías...");

  const categories = [
    {
      name: "Carteras",
      slug: "carteras",
      description:
        "Carteras de cuero artesanales para todo estilo y ocasión.",
      order: 1,
    },
    {
      name: "Mochilas",
      slug: "mochilas",
      description:
        "Mochilas de cuero cómodas y duraderas para el día a día.",
      order: 2,
    },
    {
      name: "Billeteras",
      slug: "billeteras",
      description:
        "Billeteras y tarjeteros de cuero genuino, compactos y elegantes.",
      order: 3,
    },
    {
      name: "Accesorios",
      slug: "accesorios",
      description:
        "Cinturones, llaveros y más accesorios de cuero artesanal.",
      order: 4,
    },
    {
      name: "Bandoleras",
      slug: "bandoleras",
      description: "Bolso bandolera de cuero, ideal para el uso diario.",
      order: 5,
    },
    {
      name: "Mochilas Ejecutivas",
      slug: "mochilas-ejecutivas",
      description:
        "Mochilas de cuero con estilo profesional para la oficina.",
      order: 6,
    },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
  }
  console.log(`  ✅ ${categories.length} categorías creadas.`);

  // ──────────────────────────────────
  // Materiales
  // ──────────────────────────────────
  console.log("🧵 Creando materiales...");

  const materials = [
    {
      name: "Cuero Vacuno",
      slug: "cuero-vacuno",
      description:
        "Cuero vacuno de primera calidad, durable y con carácter propio.",
    },
    {
      name: "Cuero Vacuno Premium",
      slug: "cuero-vacuno-premium",
      description:
        "Cuero vacuno seleccionado, de grano fino y terminación impecable.",
    },
    {
      name: "Cuero Pull Up",
      slug: "cuero-pull-up",
      description:
        "Cuero con aceites que le dan un aspecto vintage y se oscurece al estirarse.",
    },
    {
      name: "Cuero Grabado",
      slug: "cuero-grabado",
      description:
        "Cuero con texturas y grabados decorativos únicos.",
    },
    {
      name: "Cuero Liso",
      slug: "cuero-liso",
      description:
        "Cuero de acabado liso, clásico y elegante.",
    },
    {
      name: "Cuero Reciclado",
      slug: "cuero-reciclado",
      description:
        "Cuero proveniente de retazos reciclados, ecológico y sostenible.",
    },
  ];

  for (const mat of materials) {
    await prisma.material.upsert({
      where: { slug: mat.slug },
      update: mat,
      create: mat,
    });
  }
  console.log(`  ✅ ${materials.length} materiales creados.`);

  // ──────────────────────────────────
  // Roles y permisos
  // ──────────────────────────────────
  console.log("🔐 Creando roles y permisos...");

  const permissionsData = [
    { resource: "products", action: "manage" },
    { resource: "categories", action: "manage" },
    { resource: "orders", action: "manage" },
    { resource: "users", action: "manage" },
    { resource: "roles", action: "manage" },
    { resource: "blog", action: "manage" },
    { resource: "coupons", action: "manage" },
    { resource: "reports", action: "view" },
  ];

  const createdPermissions: Record<string, string> = {};
  for (const perm of permissionsData) {
    const key = `${perm.resource}_${perm.action}`;
    const created = await prisma.permission.upsert({
      where: {
        id: `${perm.resource}_${perm.action}`,
      },
      update: perm,
      create: {
        id: `${perm.resource}_${perm.action}`,
        ...perm,
      },
    });
    createdPermissions[key] = created.id;
  }

  // Rol Super Admin
  const superAdminRole = await prisma.role.upsert({
    where: { name: "super_admin" },
    update: {},
    create: {
      name: "super_admin",
      description: "Super administrador con acceso completo al sistema",
      isSystem: true,
    },
  });

  // Rol Admin
  const adminRole = await prisma.role.upsert({
    where: { name: "admin" },
    update: {},
    create: {
      name: "admin",
      description: "Administrador con permisos de gestión",
      isSystem: true,
    },
  });

  // Asignar todos los permisos a super_admin
  for (const perm of Object.values(createdPermissions)) {
    await prisma.rolePermission
      .upsert({
        where: {
          roleId_permissionId: {
            roleId: superAdminRole.id,
            permissionId: perm,
          },
        },
        update: {},
        create: {
          roleId: superAdminRole.id,
          permissionId: perm,
        },
      })
      .catch(() => {}); // Ignorar duplicados
  }

  // Asignar permisos principales a admin
  const adminPerms = ["products_manage", "categories_manage", "orders_manage", "blog_manage"];
  for (const key of adminPerms) {
    const permId = createdPermissions[key];
    if (permId) {
      await prisma.rolePermission
        .upsert({
          where: {
            roleId_permissionId: {
              roleId: adminRole.id,
              permissionId: permId,
            },
          },
          update: {},
          create: {
            roleId: adminRole.id,
            permissionId: permId,
          },
        })
        .catch(() => {});
    }
  }

  console.log("  ✅ Roles y permisos configurados.");

  // ──────────────────────────────────
  // Usuario administrador
  // ──────────────────────────────────
  console.log("👤 Creando usuario administrador...");

  const adminEmail = "admin@julijocarteras.com";
  const adminPassword = await bcrypt.hash("Admin123!", 12);

  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: "Admin JuliJo",
      email: adminEmail,
      password: adminPassword,
    },
  });

  // Asignar rol super_admin al usuario admin
  await prisma.userRole
    .upsert({
      where: {
        userId_roleId: {
          userId: adminUser.id,
          roleId: superAdminRole.id,
        },
      },
      update: {},
      create: {
        userId: adminUser.id,
        roleId: superAdminRole.id,
      },
    })
    .catch(() => {});

  console.log(`  ✅ Admin creado: ${adminEmail}`);
  console.log("  🔑 Contraseña: Admin123!");

  console.log("\n✨ Seed completado exitosamente!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Error durante el seed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
