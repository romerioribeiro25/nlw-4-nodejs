import path from 'path';

import { UsersRepository } from '../repositories/UsersRepository';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveysUserRepository } from '../repositories/SurveysUserRepository';
import { SurveyUserSendMailDTO } from '../dtos/SurveyUserSendMailDTO';
import { AppError } from '../errors/AppError';
import SendMailService from './SendMailServices';
import { SurveyUser } from '../models/SurveyUser';

class SurveyUserSendMailService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly surveysRepository: SurveysRepository,
    private readonly surveysUserRepository: SurveysUserRepository
  ) {}

  async execute({
    email,
    survey_id,
  }: SurveyUserSendMailDTO): Promise<SurveyUser> {
    const user = await this.usersRepository.findOne({ email });

    if (!user) {
      throw new AppError('User does not exists!');
    }

    const survey = await this.surveysRepository.findOne({ id: survey_id });

    if (!survey) {
      throw new AppError('Survey does not exists!');
    }

    const npsPath = path.resolve(
      __dirname,
      '..',
      'views',
      'emails',
      'npsMail.hbs'
    );

    const surveyUserAlreadyExists = await this.surveysUserRepository.findOne({
      where: { user_id: user.id, value: null },
      relations: ['user', 'survey'],
    });

    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      id: '',
      link: process.env.URL_MAIL,
    };

    if (surveyUserAlreadyExists) {
      variables.id = surveyUserAlreadyExists.id;
      await SendMailService.execute(email, survey.title, variables, npsPath);
      return surveyUserAlreadyExists;
    }

    // Salvar as informações na Tabela surveyUser
    const surveyUser = this.surveysUserRepository.create({
      user_id: user.id,
      survey_id,
    });

    await this.surveysUserRepository.save(surveyUser);

    variables.id = surveyUser.id;

    await SendMailService.execute(email, survey.title, variables, npsPath);

    return surveyUser;
  }
}

export { SurveyUserSendMailService };
