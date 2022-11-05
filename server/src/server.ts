import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";
import Fastify from "fastify";

const prisma = new PrismaClient({
  log: ["query"],
});

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: "true",
  });

  fastify.get("/betting-pools/count", async () => {
    const count = await prisma.bettingPool.count();

    return { count };
  });

  await fastify.listen({ port: 3333 });
}

bootstrap();