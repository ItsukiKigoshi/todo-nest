import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const tasks = [
    '#ARW Annotated Bibliography',
    '#MTH Solve the Exercises',
    '#LED Worksheet 2-4',
  ];

  await Promise.all(
    tasks.map((task) => {
      return prisma.task.create({
        data: {
          title: task,
        },
      });
    }),
  );
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
