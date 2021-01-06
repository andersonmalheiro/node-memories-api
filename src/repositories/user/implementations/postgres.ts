import { IUsersRepository } from "../repository";
import { User } from "../../../entities/User";
import { knexInstance } from "../../../config/knex";

export class PostgresUserRepository implements IUsersRepository {
  public async findByEmail(
    email: string
  ): Promise<Omit<User, "password"> | undefined> {
    const user = await knexInstance<User>("users")
      .select("id", "name", "email", "created_at", "updated_at")
      .where({
        email: email,
      })
      .first();

    return user;
  }

  public async create(user: User): Promise<void> {
    await knexInstance<User>("users").insert(user);
  }

  public async update(userId: string, user: User): Promise<void> {
    const userRes = await knexInstance<User>("users")
      .where({
        id: userId,
      })
      .first();

    if (userRes) {
      await knexInstance<User>("users")
        .where({
          id: userId,
        })
        .update({
          email: user.email,
          name: user.name,
          password: user.password,
        });
    }
  }

  public async delete(id: number) {}

  public async list(filters: any) {
    return [];
  }

  public async read(id: number) {
    return {} as any;
  }
}
