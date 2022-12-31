import { prisma } from "../lib/prisma";
import { z } from "zod";
import { FastifyInstance } from "fastify";

export async function clientsRoutes(fastify: FastifyInstance) {
  fastify.get("/clients", async () => {
    const clients = await prisma.clients.findMany();
    console.log({ clients });
    return { clients };
  });

  fastify.post("/clients", async (req, res) => {
    const createClientBody = z.object({
      name: z.string(),
      email: z.string().email(),
      phone: z.string(),
      adress: z.string(),
      cpf: z.string(),
    });

    const { name, email, phone, adress, cpf } = createClientBody.parse(
      req.body
    );

    const clientExist = await prisma.clients.findFirst({
      where: {
        cpf: cpf,
      },
    });

    if (clientExist) return res.status(409).send("Client already exists");

    await prisma.clients.create({
      data: {
        name: name,
        email: email,
        phone: phone,
        adress: adress,
        cpf: cpf,
      },
    });
    return res.status(201).send(`Client ${name} created`);
  });

  fastify.delete("/clients", async (req, res) => {
    const createClientBody = z.object({
      id: z.string(),
    });

    const { id } = createClientBody.parse(req.body);

    const clientExist = await prisma.clients.findFirst({
      where: {
        id: id,
      },
    });

    if (!clientExist) return res.status(409).send("Client don't exists");

    await prisma.clients.delete({
      where: {
        id: id,
      },
    });

    return res.status(200).send(`Client deleted`);
  });

  fastify.put("/clients", async (req, res) => {
    const createClientBody = z.object({
      id: z.string(),
      name: z.string(),
      email: z.string().email(),
      phone: z.string(),
      adress: z.string(),
      cpf: z.string(),
    });

    const { id, name, email, phone, adress, cpf } = createClientBody.parse(
      req.body
    );

    const clientExist = await prisma.clients.findFirst({
      where: {
        id: id,
      },
    });

    if (!clientExist) return res.status(409).send("Client not found");

    await prisma.clients.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        email: email,
        phone: phone,
        adress: adress,
        cpf: cpf,
      },
    });
    return res.status(201).send(`Client ${name} updated`);
  });
}
