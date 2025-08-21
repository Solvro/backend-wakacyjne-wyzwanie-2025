import {PrismaClient, Role} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const trip = await prisma.trip.create({
        data: {
            name: 'Testowa wycieczka',
            plannedBudget: 1000,
        },
    });

    await prisma.user.createMany({
        data: [
            {
                email: 'jan.kowalski@example.com',
                name: 'Jan Kowalski',
                password: '$2b$12$va3nsup7yqWJP9Ae9adYE.CJ4GqSxa8Lr3T0Dx93tSgPp7g1R.R7y', //password
                role: Role.ADMIN,
                isEnabled: true
            },
            {
                email: 'edyt@gmail.com',
                name: 'Edyta Kowalska',
                password: '$2b$12$va3nsup7yqWJP9Ae9adYE.CJ4GqSxa8Lr3T0Dx93tSgPp7g1R.R7y', //password
                role: Role.USER,
                isEnabled: true
            },
            {
                email: 'marek@gmail.com',
                name: 'Marek Kowalski',
                password: '$2b$12$va3nsup7yqWJP9Ae9adYE.CJ4GqSxa8Lr3T0Dx93tSgPp7g1R.R7y', //password
                role: Role.USER,
                isEnabled: false
            }
        ]})

    await prisma.participant.createMany({
        data: [
            {
                email: 'jan.kowalski@example.com',
                amountToPay: 500,
                tripId: trip.id,
            },
        ]})

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
