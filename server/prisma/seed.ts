import { PrismaClient } from "@prisma/client";
(async () => {
  const prisma = new PrismaClient();

  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john.doe@gmail.com",
      avatar_url: "https://github.com/guiireal.png",
    },
  });

  const bettingPool = await prisma.bettingPool.create({
    data: {
      title: "Example Pool",
      code: "BOL123",
      owner_id: user.id,
      participants: {
        create: {
          user_id: user.id,
        },
      },
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-02T12:00:00.000Z",
      first_team_country_code: "DE",
      second_team_country_code: "BR",
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-07T12:00:00.000Z",
      first_team_country_code: "BR",
      second_team_country_code: "AR",
      guesses: {
        create: {
          first_team_points: 2,
          second_team_points: 0,
          participant: {
            connect: {
              user_id_betting_pool_id: {
                user_id: user.id,
                betting_pool_id: bettingPool.id,
              },
            },
          },
        },
      },
    },
  });
})();
