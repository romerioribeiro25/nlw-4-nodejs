import { Request, Response } from 'express';
import { getCustomRepository, Not, IsNull } from 'typeorm';
import { SurveysUserRepository } from '../repositories/SurveysUserRepository';

/***
 * 1 2 3 4 5 6 7 8 9
 * Detratores => 0 - 6
 * Passivos => 7 - 8
 * Promotores => 9 - 1 0
 * ((promotores - detratores) / número de respondentes) * 100
 */

class NpsController {
  async execute(req: Request, res: Response) {
    const { survey_id } = req.params;

    const surveysUsersRepo = getCustomRepository(SurveysUserRepository);

    const surveysUsers = await surveysUsersRepo.find({
      survey_id,
      value: Not(IsNull()),
    });

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

    return res.json({
      detractor,
      promoters,
      passive,
      totalAnswers,
      nps: Number(calculate),
    });
  }
}

export { NpsController };
