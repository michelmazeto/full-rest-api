import { Request, Response } from 'express';
import Reserve from '../models/Reserve';
import User from '../models/User';
import Car from '../models/Car';

// Function to create a reservation
export const createReserve = async (req: Request, res: Response) => {
  try {
    // Extract data from request
    const { start_date, end_date, id_car, id_user } = req.body;

    // Convert date strings to date objects
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    // Check if user exists
    const user = await User.findById(id_user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if car exists
    const car = await Car.findById(id_car);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Check if the car already has a reservation for the same dates
    const existingReserve = await Reserve.findOne({
      id_car,
      $or: [
        { start_date: { $gte: startDate, $lte: endDate } },
        { end_date: { $gte: startDate, $lte: endDate } }
      ]
    });

    if (existingReserve) {
      return res.status(400).json({ message: 'Car already has a reservation for the specified dates' });
    }

    // Check if the user already has another reservation for the same period
    const existingUserReserve = await Reserve.findOne({
      id_user,
      $or: [
        { start_date: { $gte: startDate, $lte: endDate } },
        { end_date: { $gte: startDate, $lte: endDate } }
      ]
    });

    if (existingUserReserve) {
      return res.status(400).json({ message: 'User already has another reservation for the same period' });
    }

    // Calculate final value of reservation based on car's value per day
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const final_value = days * car.value_per_day;

    // Create the reservation
    const reserve = new Reserve({
      start_date: startDate,
      end_date: endDate,
      id_car,
      id_user,
      final_value
    });

    await reserve.save();

    return res.status(201).json({ message: 'Reservation created successfully', reserve });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to create reservation' });
  }
};
