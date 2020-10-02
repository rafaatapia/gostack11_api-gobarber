import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

import UserMap from '@modules/users/mappers/UsersMap';

export default class UsersControllers {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const userCreated = await createUser.execute({ name, email, password });

    const user = UserMap.toDTO(userCreated);

    return response.json(user);
  }
}
