import { PrismaClient, Category } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const trip = await prisma.trip.create({
    data: {
      name: 'Testowa wycieczka',
      plannedBudget: 1000,
    },
  });

  await prisma.expense.create({
    data: {
      amount: 123.45,
      currency: 'PLN',
      category: Category.FOOD,
      tripId: trip.id,
    },
  });

  await prisma.participant.create({
    data: {
      email: 'jan.kowalski@example.com',
      name: 'Jan Kowalski',
      amountToPay: 500,
      tripId: trip.id,
    },
  });

  console.warn("bazka z seedowana")
}

main()
  .catch((error: unknown) => {
    console.error(error);
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
