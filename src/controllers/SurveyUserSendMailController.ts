import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { SurveysRepository } from '../repositories/SurveysRepository';
import { UsersRepository } from '../repositories/UsersRepository';
import { SurveysUserRepository } from '../repositories/SurveysUserRepository';
import { SurveyUserSendMailService } from '../services/SurveyUserSendMailService';

class SurveyUserSendMailController {
  async handle(req: Request, res: Response) {
    const { email, survey_id } = req.body;

    const usersRepository = getCustomRepository(UsersRepository);

    const surveysRepository = getCustomRepository(SurveysRepository);

    const surveysUserRepository = getCustomRepository(SurveysUserRepository);

    const surveyUserSendMailService = new SurveyUserSendMailService(
      usersRepository,
      surveysRepository,
      surveysUserRepository
    );

    const surveyUser = await surveyUserSendMailService.execute({
      email,
      survey_id,
    });

    return res.json(surveyUser);
  }
}

export { SurveyUserSendMailController };
