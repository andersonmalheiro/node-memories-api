export class User {
  public readonly id!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public created_at!: string;
  public updated_at!: string;

  constructor(props: Omit<User, "id" | "created_at" | "updated_at">) {
    Object.assign(this, props);
  }
}
