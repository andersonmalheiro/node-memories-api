import { PostgresUserRepository } from "../../repositories/implementations/PostgresUserRepository";
import { MailTrapProvider } from "../../providers/implementations/MailTrapProvider";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { CreateUserController } from "./CreateUserController";

const postgresUserRepository = new PostgresUserRepository();
const mailTrapProvider = new MailTrapProvider();

const createUserUseCase = new CreateUserUseCase(
  postgresUserRepository,
  mailTrapProvider
);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
