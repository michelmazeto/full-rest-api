import mongoose from 'mongoose';
import Reservation from './Reserve';
import { Document } from 'mongoose';

interface IReservation extends Document {
  start_date: Date;
  end_date: Date;
  id_car: mongoose.Types.ObjectId;
  id_user: mongoose.Types.ObjectId;
  final_value: number;
}

describe('Reservation model', () => {
  const validReservationData = {
    start_date: new Date('2023-04-11'),
    end_date: new Date('2023-04-13'),
    id_car: new mongoose.Types.ObjectId(),
    id_user: new mongoose.Types.ObjectId(),
    final_value: 100
  };

  it('should create a valid reservation', async () => {
    const reservation = new Reservation(validReservationData);
    const savedReservation = await reservation.save();
    expect(savedReservation._id).toBeDefined();
    expect(savedReservation.start_date).toEqual(validReservationData.start_date);
    expect(savedReservation.end_date).toEqual(validReservationData.end_date);
    expect(savedReservation.id_car).toEqual(validReservationData.id_car);
    expect(savedReservation.id_user).toEqual(validReservationData.id_user);
    expect(savedReservation.final_value).toEqual(validReservationData.final_value);
  });

  it('should fail validation when start_date is not provided', () => {
    const reservationData = { ...validReservationData, start_date: undefined };
    const reservation = new Reservation(reservationData);
    expect(() => reservation.validateSync()).toThrowError(
      'Reservation validation failed: start_date: Path `start_date` is required.'
    );
  });

  it('should fail validation when end_date is not provided', () => {
    const reservationData = { ...validReservationData, end_date: undefined };
    const reservation = new Reservation(reservationData);
    expect(() => reservation.validateSync()).toThrowError(
      'Reservation validation failed: end_date: Path `end_date` is required.'
    );
  });

  it('should fail validation when id_car is not provided', () => {
    const reservationData = { ...validReservationData, id_car: undefined };
    const reservation = new Reservation(reservationData);
    expect(() => reservation.validateSync()).toThrowError(
      'Reservation validation failed: id_car: Path `id_car` is required.'
    );
  });

  it('should fail validation when id_user is not provided', () => {
    const reservationData = { ...validReservationData, id_user: undefined };
    const reservation = new Reservation(reservationData);
    expect(() => reservation.validateSync()).toThrowError(
      'Reservation validation failed: id_user: Path `id_user` is required.'
    );
  });

  it('should fail validation when final_value is not provided', () => {
    const reservationData = { ...validReservationData, final_value: undefined };
    const reservation = new Reservation(reservationData);
    expect(() => reservation.validateSync()).toThrowError(
      'Reservation validation failed: final_value: Path `final_value` is required.'
    );
  });
});
