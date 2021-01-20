import { Request, Response } from "express";
import { User } from "../../../entities/User";
import { UpdateUserUseCase } from "./use-case";
import bcrypt from "bcrypt";
import { IUpdateUserRequestDTO } from "./dto";
import { clearObject } from "../../../utils";

const saltRounds = 10;

export class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}

  public async handle(request: Request, response: Response) {
    const { email, name, password } = <User>request.body;
    const { id } = request.params;

    let hashedPassword = "";

    if (password) {
      const salt = bcrypt.genSaltSync(saltRounds);
      hashedPassword = bcrypt.hashSync(password, salt);
    }

    const payload: IUpdateUserRequestDTO = clearObject({
      email,
      name,
      password: password ? hashedPassword : "",
    });

    try {
      await this.updateUserUseCase.execute(id, payload);

      return response.status(204).send();
    } catch (error) {
      return response.status(400).json({
        message: error.message || "Unespected error",
      });
    }
  }
}
