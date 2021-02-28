import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysUserRepository } from '../repositories/SurveysUserRepository';
import { AppError } from '../errors/AppError';

class AnswerController {
  async execute(req: Request, res: Response) {
    const { value } = req.params;
    const { u } = req.query;

    const surveyUsersRepo = getCustomRepository(SurveysUserRepository);

    const surveyUser = await surveyUsersRepo.findOne({ id: String(u) });

    if (!surveyUser) {
      throw new AppError('Survey User does not exists!');
    }

    surveyUser.value = Number(value);

    await surveyUsersRepo.save(surveyUser);

    return res.json(surveyUser);
  }
}

export { AnswerController };
