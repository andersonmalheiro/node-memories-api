import { PostgresUserRepository } from "../../../repositories/user";
import { ListUserController } from "./controller";
import { ListUserUseCase } from "./use-case";

const postgresUserRepository = new PostgresUserRepository();

const listUserUseCase = new ListUserUseCase(postgresUserRepository);

const listUserController = new ListUserController(listUserUseCase);

export { listUserUseCase, listUserController };
