import { UsersRepository } from '../repositories/UsersRepository';
// import { AppError } from '../errors/AppError';

class UserIndexService {
  constructor(private readonly usersRepositoy: UsersRepository) {}

  async execute() {
    const users = await this.usersRepositoy.findAndCount();

    return users;
  }
}

export { UserIndexService };
