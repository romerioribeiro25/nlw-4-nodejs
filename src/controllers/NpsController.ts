import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysUserRepository } from '../repositories/SurveysUserRepository';
import { NpsShowService } from '../services/NpsShowService';

/***
 * 1 2 3 4 5 6 7 8 9
 * Detratores => 0 - 6
 * Passivos => 7 - 8
 * Promotores => 9 - 1 0
 * ((promotores - detratores) / número de respondentes) * 100
 */

class NpsController {
  async show(req: Request, res: Response) {
    const { survey_id } = req.params;

    const surveysUsersRepo = getCustomRepository(SurveysUserRepository);

    const npsShowService = new NpsShowService(surveysUsersRepo);

    const {
      detractor,
      promoters,
      passive,
      totalAnswers,
      nps,
    } = await npsShowService.execute(survey_id);

    return res.json({
      detractor,
      promoters,
      passive,
      totalAnswers,
      nps,
    });
  }
}

export { NpsController };
