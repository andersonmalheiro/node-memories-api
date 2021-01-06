import { PostgresUserRepository } from "../../../repositories/user";
import { UpdateUserController } from "./controller";
import { UpdateUserUseCase } from "./use-case";

const postgresUserRepository = new PostgresUserRepository();

const updateUserUseCase = new UpdateUserUseCase(postgresUserRepository);

const updateUserController = new UpdateUserController(updateUserUseCase);

export { updateUserUseCase, updateUserController };
