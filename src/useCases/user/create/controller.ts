import { Request, response, Response } from "express";
import { CreateUserUseCase } from "./use-case";
import bcrypt from "bcrypt";
import * as yup from "yup";
import { ICreateUserRequestDTO } from "./dto";
import { User } from "../../../entities/User";

const schema: yup.SchemaOf<ICreateUserRequestDTO> = yup.object({
  name: yup.string().required().min(3),
  password: yup.string().required().min(6).max(32),
  email: yup.string().required(),
});

const saltRounds = 10;

export class CreateUserController {
  constructor(private useCase: CreateUserUseCase) {}

  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const user = new User({ name, email, password });

    try {
      await schema.validate(user);
    } catch (err) {
      console.error(err);

      return response
        .status(400)
        .json({
          message: "ValidationError",
          details: err.errors,
        })
        .send();
    }

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    try {
      await this.useCase.execute({
        name,
        email,
        password: hash,
      });

      return response.status(201).send();
    } catch (error) {
      console.log(error);
      return response
        .status(400)
        .json({
          message: error.message || "Unespected error",
        })
        .send();
    }
  }
}
