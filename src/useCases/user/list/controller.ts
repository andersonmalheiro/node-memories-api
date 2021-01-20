import { Request, Response } from "express";
import { ListUserUseCase } from "./use-case";
import { IListUsersRequestDTO } from "./dto";
import { clearObject } from "../../../utils";

export class ListUserController {
  constructor(private listUserUseCase: ListUserUseCase) {}

  public async handle(request: Request, response: Response) {
    const { email, name, limit, offset, desc, order } = <IListUsersRequestDTO>(
      request.query
    );

    const payload: IListUsersRequestDTO = clearObject({
      desc,
      email,
      limit,
      name,
      offset,
      order,
    });

    try {
      const users = await this.listUserUseCase.execute(payload);

      return response.status(200).send(users);
    } catch (error) {
      return response.status(400).json({
        message: error.message || "Unespected error",
      });
    }
  }
}
