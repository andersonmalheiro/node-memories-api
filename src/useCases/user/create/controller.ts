import { Request, Response } from "express";
import { CreateUserUseCase } from "./use-case";
import bcrypt from "bcrypt";

const saltRounds = 10;

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    try {
      await this.createUserUseCase.execute({
        name,
        email,
        password: hash,
      });

      return response.status(201).send();
    } catch (error) {
      return response.status(400).json({
        message: error.message || "Unespected error",
      });
    }
  }
}
