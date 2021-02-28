import { UsersRepository } from '../repositories/UsersRepository';
import { IUserCreateDTO } from '../dtos/UserCreateDTO';
import { AppError } from '../errors/AppError';

class UserCreateService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({ email, name }: IUserCreateDTO) {
    const userAlreadyExists = await this.usersRepository.findOne({
      email,
    });

    if (userAlreadyExists) {
      throw new AppError('User already exists');
    }

    const user = this.usersRepository.create({
      name,
      email,
    });

    await this.usersRepository.save(user);

    return user;
  }
}

export { UserCreateService };
