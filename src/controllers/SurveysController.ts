import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveysIndexService } from '../services/SurveysIndexService';
import { SurveysShowService } from '../services/SurveysShowService';
import { SurveysCreateService } from '../services/SurveysCreateService';

class SurveysController {
  async index(req: Request, res: Response) {
    const surveysRepository = getCustomRepository(SurveysRepository);

    const surveysIndexService = new SurveysIndexService(surveysRepository);

    const surveys = await surveysIndexService.execute();

    return res.status(200).json({
      surveys: surveys[0],
      count: surveys[1],
    });
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const surveyRepository = getCustomRepository(SurveysRepository);

    const surverysShowService = new SurveysShowService(surveyRepository);

    const survery = await surverysShowService.execute(id);

    return res.status(200).json(survery);
  }

  async create(req: Request, res: Response) {
    const { title, description } = req.body;

    const surveysRepository = getCustomRepository(SurveysRepository);

    const surverysCreateService = new SurveysCreateService(surveysRepository);

    const survey = await surverysCreateService.execute({ title, description });

    return res.status(201).json(survey);
  }
}

export { SurveysController };
