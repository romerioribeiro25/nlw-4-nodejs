import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import * as yup from 'yup';
import { AppError } from '../errors/AppError';

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

    // let schema = yup.object().shape({
    //   name: yup.string().required(),
    //   email: yup.string().email().required(),
    // });

    // try {
    //   await schema.validate(req.body, { abortEarly: false });
    // } catch (err) {
    //   throw new AppError(err);
    // }

    const usersRepository = getCustomRepository(UsersRepository);

    const userAlreadyExists = await usersRepository.findOne({
      email,
    });

    if (userAlreadyExists) {
      throw new AppError('User already exists');
    }

    const user = usersRepository.create({
      name,
      email,
    });

    await usersRepository.save(user);

    return res.status(201).json(user);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const userRepo = getCustomRepository(UsersRepository);

    const userAlreadyExists = await userRepo.findOne({ id });

    if (!userAlreadyExists) {
      throw new AppError('User does not exists');
    }

    await userRepo.delete(id);

    return res.status(200).json();
  }
}

export { UserController };
