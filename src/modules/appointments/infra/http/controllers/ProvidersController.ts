import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';

import UserMap from '@modules/users/mappers/UsersMap';

export default class AppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listProviders = container.resolve(ListProvidersService);

    const providersList = await listProviders.execute({ user_id });

    const providers = providersList.map(provider => UserMap.toDTO(provider));

    return response.json(providers);
  }
}
