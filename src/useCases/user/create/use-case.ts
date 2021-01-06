import { IUsersRepository } from "../../../repositories/user/repository";
import { IMailProvider } from "../../../providers/IMailProvider";
import { ICreateUserRequestDTO } from "./dto";
import { User } from "../../../entities/User";

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

    await this.usersRepository.create(user);

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
        "<p>Você está pronto para seguir com o acesso a nossa plataforma.</p>",
    });
  }
}
