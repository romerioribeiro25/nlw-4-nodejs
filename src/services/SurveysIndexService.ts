import { SurveysRepository } from '../repositories/SurveysRepository';

class SurveysIndexService {
  constructor(private readonly surveysRepository: SurveysRepository) {}

  async execute() {
    const surveys = await this.surveysRepository.findAndCount();

    return surveys;
  }
}

export { SurveysIndexService };
