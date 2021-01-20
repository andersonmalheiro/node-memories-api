import { IUsersRepository } from "../../../repositories/user/repository";
import { IMailProvider } from "../../../providers/IMailProvider";
import { ICreateUserRequestDTO } from "./dto";
import { User } from "../../../entities/User";

/**
 * SRP — Single Responsibility Principle
 */
export class CreateUserUseCase {
  constructor(
    private repository: IUsersRepository,
    private mailProvider: IMailProvider
  ) {}

  public async execute(data: ICreateUserRequestDTO): Promise<void> {
    const userAlreadyExists = await this.repository.findByEmail(
      data.email
    );

    if (userAlreadyExists) {
      throw new Error("This email is already in use.");
    }

    const user = new User(data);

    await this.repository.create(user);

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
