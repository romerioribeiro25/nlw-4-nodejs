import { SurveysRepository } from '../repositories/SurveysRepository';
// import { AppError } from '../errors/AppError';
import { ISurveysCreateDTO } from '../dtos/SurveysCreateDTO';

class SurveysCreateService {
  constructor(private readonly surveysRepository: SurveysRepository) {}

  async execute({ title, description }: ISurveysCreateDTO) {
    const survey = this.surveysRepository.create({ title, description });

    await this.surveysRepository.save(survey);

    return survey;
  }
}

export { SurveysCreateService };
