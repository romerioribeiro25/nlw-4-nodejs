import { Router } from 'express';
import { SendMailController } from './controllers/SendMailController';
import { SurveysController } from './controllers/SurveysController';
import { UserController } from './controllers/UserController';
import { AnswerController } from './controllers/AnswerController';
import { NpsController } from './controllers/NpsController';

import { schemaValidate } from './middlewares/schemaValidate';
import { UserDto } from './dtos/userDto';
import { SurveysDto } from './dtos/surveysDto';

const router = Router();

const userController = new UserController();
const surveysController = new SurveysController();
const sendMailController = new SendMailController();
const answerController = new AnswerController();
const npsController = new NpsController();

const userDto = new UserDto();
const surveysDto = new SurveysDto();

router.get('/users', userController.index);
router.post('/users', schemaValidate(userDto.create()), userController.create);
router.delete('/users/:id', userController.delete);

router.get('/surveys', surveysController.index);
router.get('/surveys/:id', surveysController.show);
router.post(
  '/surveys',
  schemaValidate(surveysDto.create()),
  surveysController.create
);

router.post('/sendMail', sendMailController.execute);

router.get('/answers/:value', answerController.execute);

router.get('/nps/:survey_id', npsController.execute);

export { router };
