import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";
import Fastify from "fastify";
import ShortUniqueId from "short-unique-id";
import { z } from "zod";

(async () => {
  const prisma = new PrismaClient({
    log: ["query"],
  });

  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: "http://localhost:3000",
  });

  fastify.get("/betting-pools/count", async () => {
    const count = await prisma.bettingPool.count();

    return { count };
  });

  fastify.post("/betting-pools", async (request, reply) => {
    const createBettingPoolBody = z.object({
      title: z.string(),
    });

    const { title } = createBettingPoolBody.parse(request.body);

    const generate = new ShortUniqueId({ length: 6 });
    const code = String(generate()).toUpperCase();

    await prisma.bettingPool.create({
      data: {
        title,
        code,
      },
    });

    return reply.status(201).send({ code });
  });

  fastify.get("/users/count", async () => {
    const count = await prisma.user.count();

    return { count };
  });

  fastify.get("/guesses/count", async () => {
    const count = await prisma.guess.count();

    return { count };
  });

  await fastify.listen({ port: 3333 });
})();
