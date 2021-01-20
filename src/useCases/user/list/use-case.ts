import { IUsersRepository } from "../../../repositories/user";
import { IListUsersRequestDTO } from "./dto";

export class ListUserUseCase {
  constructor(private repository: IUsersRepository) {}

  public async execute(data: IListUsersRequestDTO) {
    return await this.repository.list(data);
  }
}
