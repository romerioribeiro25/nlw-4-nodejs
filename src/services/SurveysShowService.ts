import { SurveysRepository } from '../repositories/SurveysRepository';
import { AppError } from '../errors/AppError';

class SurveysShowService {
  constructor(private readonly surveysRepository: SurveysRepository) {}

  async execute(id: string) {
    const surveyAlreadyExists = await this.surveysRepository.findOne({ id });

    if (!surveyAlreadyExists) {
      throw new AppError('Survey not found!');
    }

    return surveyAlreadyExists;
  }
}

export { SurveysShowService };
