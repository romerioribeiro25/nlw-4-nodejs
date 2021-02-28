import * as yup from 'yup';

class SurveysDto {
  create = () =>
    yup.object().shape({
      title: yup.string().trim().min(5).max(30).required(),
      description: yup.string().trim().min(5).max(300).required(),
    });
}

export { SurveysDto };
