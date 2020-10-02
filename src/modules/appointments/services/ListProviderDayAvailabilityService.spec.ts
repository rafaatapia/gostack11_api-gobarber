import 'reflect-metadata';

import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let listProviderDayAvailability: ListProviderDayAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the day availability from provider', async () => {
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

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 10, 10).getTime();
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'fakeUser_id',
      day: 10,
      year: 2020,
      month: 7,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 11, available: true },
        { hour: 12, available: false },
        { hour: 13, available: false },
        { hour: 14, available: true },
        { hour: 15, available: true },
      ]),
    );
  });
});
