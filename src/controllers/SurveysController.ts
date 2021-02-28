import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';

class SurveysController {
  async index(req: Request, res: Response) {
    const surveysRepo = getCustomRepository(SurveysRepository);

    const surveys = await surveysRepo.findAndCount();

    return res.status(200).json({
      surveys: surveys[0],
      count: surveys[1],
    });
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const surveyRepo = getCustomRepository(SurveysRepository);

    const surveyAlreadyExists = await surveyRepo.findOne({ id });

    if (!surveyAlreadyExists) {
      return res.status(400).json({
        error: 'Survey not found!',
      });
    }

    return res.status(200).json(surveyAlreadyExists);
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
