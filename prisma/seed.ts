import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const dummyUsers = [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      role: Role.USER,
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: Role.USER,
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      role: Role.USER,
      image:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Alice Brown",
      email: "alice.brown@example.com",
      role: Role.USER,
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Charlie Wilson",
      email: "charlie.wilson@example.com",
      role: Role.USER,
      image:
        "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Diana Davis",
      email: "diana.davis@example.com",
      role: Role.USER,
      image:
        "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Eve Martinez",
      email: "eve.martinez@example.com",
      role: Role.USER,
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Frank Garcia",
      email: "frank.garcia@example.com",
      role: Role.USER,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: " Marga Emrik",
      email: "marga.emrik@example.com",
      role: Role.USER,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Erwan Darrin",
      email: "erwan.darrin@example.com",
      role: Role.USER,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ];

  for (const user of dummyUsers) {
    try {
      const createdUser = await prisma.user.create({
        data: user,
      });
      console.log(`Created user: ${createdUser.name} (${createdUser.email})`);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes("Unique constraint")
      ) {
        console.log(`User ${user.email} already exists, skipping...`);
      } else {
        console.error(`Failed to create user ${user.email}:`, error);
      }
    }
  }

  console.log("✨ Seeding completed!");
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
