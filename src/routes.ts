import { Router } from 'express';

import { SendMailController } from './controllers/SendMailController';
import { SurveysController } from './controllers/SurveysController';
import { UserController } from './controllers/UserController';
import { AnswerController } from './controllers/AnswerController';
import { NpsController } from './controllers/NpsController';
import { schemaValidate } from './middlewares/schemaValidate';
import { SurveysCreateValidator } from './validators/SurveysCreateValidator';
import { UserCreateValidator } from './validators/UserCreateValidator';

const router = Router();

const userController = new UserController();
const surveysController = new SurveysController();
const sendMailController = new SendMailController();
const answerController = new AnswerController();
const npsController = new NpsController();

router.get('/users', userController.index);
router.post(
  '/users',
  schemaValidate(UserCreateValidator),
  userController.create
);
router.delete('/users/:id', userController.delete);

router.get('/surveys', surveysController.index);
router.get('/surveys/:id', surveysController.show);
router.post(
  '/surveys',
  schemaValidate(SurveysCreateValidator),
  surveysController.create
);

router.post('/sendMail', sendMailController.execute);

router.get('/answers/:value', answerController.execute);

router.get('/nps/:survey_id', npsController.show);

export { router };
