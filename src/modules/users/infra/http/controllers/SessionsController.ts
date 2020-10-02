import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

import UserMap from '@modules/users/mappers/UsersMap';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user: userAuthenticated, token } = await authenticateUser.execute({
      email,
      password,
    });

    const user = UserMap.toDTO(userAuthenticated);

    return response.json({ user, token });
  }
}
