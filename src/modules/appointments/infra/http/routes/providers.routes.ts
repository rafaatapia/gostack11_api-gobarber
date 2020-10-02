import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailability from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailability from '../controllers/ProviderDayAvailabilityController';

const providersRouter = Router();
const providersController = new ProvidersController();
const providersMonthAvailabilityController = new ProviderMonthAvailability();
const providersDayAvailabilityController = new ProviderDayAvailability();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:provider_id/month-availability',
  celebrate({
    [Segments.BODY]: {
      month: Joi.number().min(1).max(12).required(),
      year: Joi.number().required(),
    },
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providersMonthAvailabilityController.index,
);
providersRouter.get(
  '/:provider_id/day-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      day: Joi.number().min(1).max(31).required(),
      month: Joi.number().min(1).max(12).required(),
      year: Joi.number().required(),
    },
  }),
  providersDayAvailabilityController.index,
);

export default providersRouter;
