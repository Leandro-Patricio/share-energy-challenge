import { z } from "zod";
import { FastifyInstance } from "fastify";

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post("/login", async (req, res) => {
    const createClientBody = z.object({
      username: z.string(),
      password: z.string(),
    });

    const { username, password } = createClientBody.parse(req.body);

    if (username != "desafiosharenergy")
      return res.status(403).send("Wrong username");

    if (password != "sh@r3n3rgy") return res.status(403).send("Wrong password");

    return res.status(200).send(`Acess allowed`);
  });
}
