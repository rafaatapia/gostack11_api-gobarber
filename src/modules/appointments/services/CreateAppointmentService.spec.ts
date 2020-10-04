import 'reflect-metadata';
import AppError from '@shared/errors/AppError';

import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeCacheProvider: FakeCacheProvider;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 10, 10).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 10, 1, 8),
      provider_id: '123',
      user_id: '456',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123');
  });

  it('should not be able to create two or more appointments on the same date/time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 1, 10, 10).getTime();
    });

    const appointmentDate = new Date(2020, 10, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123',
      user_id: '456',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '123',
        user_id: '456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 10, 10).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 1, 1, 10),
        provider_id: '123',
        user_id: '456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new appointment for himself', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 10, 10).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 10, 1, 10),
        provider_id: '123',
        user_id: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 1, 10).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 10, 1, 7),
        provider_id: '123',
        user_id: '456',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 10, 1, 18),
        provider_id: '123',
        user_id: '456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
