import 'reflect-metadata';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list the providers', async () => {
    const userExample1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });

    const userExample2 = await fakeUsersRepository.create({
      name: 'John Toe',
      email: 'john@Toe.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'John Foe',
      email: 'john@Foe.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([userExample1, userExample2]);
  });
});
