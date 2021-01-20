import { IUsersRepository } from "../repository";
import { User } from "../../../entities/User";
import { knexInstance } from "../../../config/knex";
import { clearObject } from "../../../utils";
import {
  Pagination,
  paginationLimit,
  paginationOffset,
} from "../../../utils/pagination";
import { queryBuilder } from "../../../utils/query-builder";

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
    try {
      await knexInstance<User>("users").insert(user);
    } catch (error) {
      console.log(error)
    }
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

  public async list(filters: any): Promise<Pagination<User>> {
    const { email, name, id, offset, limit } = filters;
    const payload = clearObject({
      email,
      name,
      id,
    });

    let count = 0;

    const query: any = {};

    // Formatting the query object
    Object.keys(payload).forEach((key) => {
      if (key === "name" || key === "email") {
        query[key] = {
          operator: "ilike",
          value: String(payload[key]).toLowerCase(),
        };
      } else {
        query[key] = {
          operator: "=",
          value: payload[key],
        };
      }
    });

    // Counting entries
    knexInstance<User>("users")
      .count("id")
      .where((builder) => {
        queryBuilder(builder, query);
      })
      .first()
      .then((total: any) => {
        count = total.count;
      });

    // Selecting results
    const users = await knexInstance<User>("users")
      .select("name", "email", "created_at", "updated_at", "id")
      .where((builder) => {
        queryBuilder(builder, query);
      })
      .limit(limit ? limit : paginationLimit)
      .offset(offset ? offset : paginationOffset);

    // Creating a new pagination object
    return new Pagination({
      count: Number(count),
      data: users,
      next: limit ? !!(count > limit) : !!(count > paginationLimit),
    });
  }

  public async read(id: number) {
    return {} as any;
  }
}
