import Fastify from "fastify";
import cors from "@fastify/cors";
import { clientsRoutes } from "./routes/clients";
import { authRoutes } from "./routes/auth";

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  });

  await fastify.register(clientsRoutes);
  await fastify.register(authRoutes);

  await fastify.listen({ port: 3333 });
}

bootstrap();
