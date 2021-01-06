import { PostgresUserRepository } from "../../../repositories/user/implementations/postgres";
import { MailTrapProvider } from "../../../providers/implementations/MailTrapProvider";
import { CreateUserUseCase } from "./use-case";
import { CreateUserController } from "./controller";

const postgresUserRepository = new PostgresUserRepository();
const mailTrapProvider = new MailTrapProvider();

const createUserUseCase = new CreateUserUseCase(
  postgresUserRepository,
  mailTrapProvider
);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
