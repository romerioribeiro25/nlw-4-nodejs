import { UsersRepository } from '../repositories/UsersRepository';
import { AppError } from '../errors/AppError';

class UserDeleteService {
  constructor(private readonly usersRepositoy: UsersRepository) {}

  async execute(id: string) {
    const userAlreadyExists = await this.usersRepositoy.findOne({ id });

    if (!userAlreadyExists) {
      throw new AppError('User does not exists');
    }

    await this.usersRepositoy.delete(id);
  }
}

export { UserDeleteService };
