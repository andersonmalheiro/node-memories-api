import { Request, Response } from "express";
import { User } from "../../../entities/User";
import { UpdateUserUseCase } from "./use-case";

export class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}

  public async handle(request: Request, response: Response) {
    const { email, name, password } = <User>request.body;
    const { id } = request.params;

    try {
      await this.updateUserUseCase.execute(id, {
        email,
        name,
        password,
      });

      return response.status(204).send();
    } catch (error) {
      return response.status(400).json({
        message: error.message || "Unespected error",
      });
    }
  }
}
