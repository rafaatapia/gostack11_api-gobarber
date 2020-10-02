import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

import UserMap from '@modules/users/mappers/UsersMap';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const userProfile = await showProfile.execute({ user_id });

    const user = UserMap.toDTO(userProfile);

    return response.json(user);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, password, old_password } = request.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const userUpdated = await updateProfile.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });

    const user = UserMap.toDTO(userUpdated);

    return response.json(user);
  }
}
