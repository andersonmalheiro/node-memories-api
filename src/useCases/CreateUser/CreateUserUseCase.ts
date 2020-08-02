import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IMailProvider } from "../../providers/IMailProvider";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
import { User } from "../../entities/User";

/**
 * SRP — Single Responsibility Principle
 */
export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider
  ) {}

  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(
      data.email
    );

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const user = new User(data);

    await this.usersRepository.save(user);

    await this.mailProvider.sendMail({
      to: {
        email: data.email,
        name: data.name,
      },
      from: {
        email: "equipe@meuapp.com",
        name: "Desenvolvedores",
      },
      subject: "Seja bem vindo!",
      body:
        "<p>VocÊ está pronto para seguir com o acesso a nossa plataforma.</p>",
    });
  }
}
