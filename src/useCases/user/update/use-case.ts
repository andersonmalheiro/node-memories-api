import { IUsersRepository } from "../../../repositories/user";
import { IUpdateUserRequestDTO } from "./dto";

export class UpdateUserUseCase {
  constructor(private repository: IUsersRepository) {}

  public async execute(id: string, data: IUpdateUserRequestDTO) {
    await this.repository.update(id, data);
  }
}
