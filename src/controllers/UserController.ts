import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import { AppError } from '../errors/AppError';
import { UserCreateService } from '../services/UserCreateService';
import { UserDeleteService } from '../services/UserDeleteService';

class UserController {
  async index(req: Request, res: Response) {
    const usersRepo = getCustomRepository(UsersRepository);

    const users = await usersRepo.findAndCount();

    return res.status(200).json({
      users: users[0],
      count: users[1],
    });
  }

  async create(req: Request, res: Response) {
    const { name, email } = req.body;

    const usersRepository = getCustomRepository(UsersRepository);

    // const userAlreadyExists = await usersRepository.findOne({
    //   email,
    // });

    // if (userAlreadyExists) {
    //   throw new AppError('User already exists');
    // }

    // const user = usersRepository.create({
    //   name,
    //   email,
    // });

    // await usersRepository.save(user);

    const userCreateService = new UserCreateService(usersRepository);

    const user = await userCreateService.execute({ name, email });

    return res.status(201).json(user);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const usersRepository = getCustomRepository(UsersRepository);

    const userDeleteService = new UserDeleteService(usersRepository);

    await userDeleteService.execute(id);

    return res.status(200).json();
  }
}

export { UserController };
