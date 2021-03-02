import { SurveysUserRepository } from '../repositories/SurveysUserRepository';
import { Not, IsNull } from 'typeorm';
import { AppError } from '../errors/AppError';

class NpsShowService {
  constructor(private readonly surveysUsersRepository: SurveysUserRepository) {}

  async execute(survey_id: string) {
    const surveysUsers = await this.surveysUsersRepository.find({
      survey_id,
      value: Not(IsNull()),
    });

    if (!surveysUsers.length) {
      throw new AppError(
        'The survey does not exist or has not yet received responses.'
      );
    }

    const detractor = surveysUsers.filter(
      (survey) => survey.value >= 0 && survey.value <= 6
    ).length;

    const promoters = surveysUsers.filter(
      (survey) => survey.value >= 9 && survey.value <= 10
    ).length;

    const passive = surveysUsers.filter(
      (survey) => survey.value >= 7 && survey.value <= 8
    ).length;

    const totalAnswers = surveysUsers.length;

    const calculate = (((promoters - detractor) / totalAnswers) * 100).toFixed(
      2
    );

    return {
      detractor,
      promoters,
      passive,
      totalAnswers,
      nps: Number(calculate),
    };
  }
}

export { NpsShowService };
