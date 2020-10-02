import 'reflect-metadata';

import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let listProvidersMonthAvailability: ListProviderMonthAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProvidersMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProvidersMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'fakeUser_id',
      user_id: 'fakeUser_id2',
      date: new Date(2020, 6, 10, 8),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'fakeUser_id',
      user_id: 'fakeUser_id2',
      date: new Date(2020, 6, 10, 9),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'fakeUser_id',
      user_id: 'fakeUser_id2',
      date: new Date(2020, 6, 10, 10),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'fakeUser_id',
      user_id: 'fakeUser_id2',
      date: new Date(2020, 6, 10, 11),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'fakeUser_id',
      user_id: 'fakeUser_id2',
      date: new Date(2020, 6, 10, 12),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'fakeUser_id',
      user_id: 'fakeUser_id2',
      date: new Date(2020, 6, 10, 13),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'fakeUser_id',
      user_id: 'fakeUser_id2',
      date: new Date(2020, 6, 10, 14),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'fakeUser_id',
      user_id: 'fakeUser_id2',
      date: new Date(2020, 6, 10, 15),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'fakeUser_id',
      user_id: 'fakeUser_id2',
      date: new Date(2020, 6, 10, 16),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'fakeUser_id',
      user_id: 'fakeUser_id2',
      date: new Date(2020, 6, 10, 17),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'fakeUser_id',
      user_id: 'fakeUser_id2',
      date: new Date(2020, 6, 11, 8),
    });

    const availability = await listProvidersMonthAvailability.execute({
      provider_id: 'fakeUser_id',
      year: 2020,
      month: 7,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 9, available: true },
        { day: 10, available: false },
        { day: 11, available: true },
      ]),
    );
  });
});
