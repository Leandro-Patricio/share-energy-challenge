import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.clients.create({
    data: {
      name: "ClienteNome1",
      email: "cliente1@email.com",
      phone: "(00)900000000",
      adress: "Rua dos bobos, numero 0",
      cpf: "00000000000",
    },
  });
  await prisma.clients.create({
    data: {
      name: "ClienteNome2",
      email: "cliente2@email.com",
      phone: "(11)911111111",
      adress: "Rua dos bobos, numero 1",
      cpf: "11111111111",
    },
  });
}

main();
