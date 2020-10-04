import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass, plainToClass } from 'class-transformer';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';
import User from '@modules/users/infra/typeorm/entities/User';

export default class AppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listProviders = container.resolve(ListProvidersService);

    const providersList = await listProviders.execute({ user_id });

    const providers = providersList.map(provider => {
      const providerObject = plainToClass(User, provider);
      return classToClass(providerObject);
    });

    return response.json(providers);
  }
}
