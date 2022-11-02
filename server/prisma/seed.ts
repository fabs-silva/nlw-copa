import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	const user = await prisma.user.create({
		data: {
			name: 'JohnDoe',
			email: 'john.doe@gmail.com',
			avatarUrl:
				'https://this-person-does-not-exist.com/img/avatar-918c8b765ce7638584a120a7b368b22a.jpg',
		},
	});

	const pool = await prisma.pool.create({
		data: {
			title: 'Example Pool',
			code: 'BOL123',
			ownerId: user.id,
			participants: {
				create: {
					userId: user.id,
				},
			},
		},
	});

	await prisma.game.create({
		data: {
			date: '2022-11-24T16:00:00.000Z',
			firstTeamCountryCode: 'BR',
			secondTeamCountryCode: 'RS',
		},
	});

	await prisma.game.create({
		data: {
			date: '2022-11-28T13:00:00.000Z',
			firstTeamCountryCode: 'BR',
			secondTeamCountryCode: 'CH',

			guesses: {
				create: {
					firstTeamsPoints: 2,
					secondTeamPoints: 1,

					participant: {
						connect: {
							userId_poolId: {
								userId: user.id,
								poolId: pool.id,
							},
						},
					},
				},
			},
		},
	});
}

main();
