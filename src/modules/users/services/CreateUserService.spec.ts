import 'reflect-metadata';
import AppError from '@shared/errors/AppError';

import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const hashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(fakeUsersRepository, hashProvider);

    const user = await createUser.execute({
      email: 'john@doe.com',
      name: 'John Doe',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a user with an email that is already used', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const hashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(fakeUsersRepository, hashProvider);

    await createUser.execute({
      email: 'john@doe.com',
      name: 'John Doe',
      password: '123456',
    });

    await expect(
      createUser.execute({
        email: 'john@doe.com',
        name: 'John Doe',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
