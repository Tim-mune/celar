import { prisma } from "../prisma/prisma";

async function createUsers() {
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: "psp0@example.com",
        password: await Bun.password.hash("psp0pass"),
        role: "psp",
        balance: 1500,
      },
    }),
    prisma.user.create({
      data: {
        email: "dev1@example.com",
        password: await Bun.password.hash("dev1pass"),
        role: "dev",
        balance: 2300,
      },
    }),
    prisma.user.create({
      data: {
        email: "psp2@example.com",
        password: await Bun.password.hash("psp2pass"),
        role: "psp",
        balance: 4000,
      },
    }),
  ]);

  console.log("✅ Created users with passwords:");
  console.log("- Email: psp0@example.com, Password: psp0pass");
  console.log("- Email: dev1@example.com, Password: dev1pass");
  console.log("- Email: psp2@example.com, Password: psp2pass");

  return users;
}

async function createTransactions(users: { id: string; email: string }[]) {
  await prisma.transaction.createMany({
    data: [
      {
        amount: 100,
        currency: "USD",
        userId: users[0].id,
        recipientId: users[1].id,
      },
      {
        amount: 250,
        currency: "KES",
        userId: users[0].id,
        recipientId: users[2].id,
      },
      {
        amount: 75,
        currency: "EUR",
        userId: users[1].id,
        recipientId: users[0].id,
      },
    ],
  });
}

async function main() {
  await prisma.transaction.deleteMany();
  await prisma.user.deleteMany();

  const users = await createUsers();
  await createTransactions(users);

  console.log(`✅ Seeded ${users.length} users and 3 transactions`);
}

main()
  .catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
