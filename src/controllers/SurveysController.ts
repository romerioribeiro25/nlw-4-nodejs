import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveysIndexService } from '../services/SurveysIndexService';
import { SurveysShowService } from '../services/SurveysShowService';

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

    const survey = surveysRepository.create({ title, description });

    await surveysRepository.save(survey);

    return res.status(201).json(survey);
  }
}

export { SurveysController };
