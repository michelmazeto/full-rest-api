import { Request, Response } from 'express';
import Reserve from '../models/Reserve';
import User from '../models/User';
import Car from '../models/Car';
import { isValidObjectId } from 'mongoose';
import APIError from '../../utils/APIError';
import mongoose from 'mongoose';

export const createReserve = async (req: Request, res: Response) => {
  try {
    const { start_date, end_date, id_car, id_user } = req.body;

    const startDateParts = start_date.split('/');
    const endDateParts = end_date.split('/');

    const startDate = new Date(`${startDateParts[2]}-${startDateParts[1]}-${startDateParts[0]}`);
    startDate.setUTCHours(0, 0, 0, 0);

    const endDate = new Date(`${endDateParts[2]}-${endDateParts[1]}-${endDateParts[0]}`);
    endDate.setUTCHours(0, 0, 0, 0);

    const currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0);

    if (startDate < currentDate) {
      return res.status(400).json({ message: 'Start date cannot be earlier than today' });
    }

    if (endDate < startDate) {
      return res.status(400).json({ message: 'End date cannot be earlier than start date' });
    }

    const user = await User.findById(id_user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const car = await Car.findById(id_car);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

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

    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const final_value = days * car.value_per_day;

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
    return res.status(500).json({ message: 'Failed to create reservation' });
  }
};


export const listAllReserves = async (req: Request, res: Response): Promise<void> => {
  try {
    const queryParams: any = req.query;
    const limit: number = parseInt(queryParams.limit) || 100;
    const offset: number = parseInt(queryParams.offset) || 1;

    const query: any = {};
    if (queryParams.start_date) {
      query.start_date = { $gte: new Date(queryParams.start_date) };
    }
    if (queryParams.end_date) {
      query.end_date = { $lte: new Date(queryParams.end_date) };
    }
    if (queryParams.id_car) {
      query.id_car = queryParams.id_car;
    }
    if (queryParams.id_user) {
      query.id_user = queryParams.id_user;
    }
    if (queryParams.final_value) {
      query.final_value = queryParams.final_value;
    }

    const reserves = await Reserve.find(query)
      .skip((offset - 1) * limit)
      .limit(limit);

    const totalReserves: number = await Reserve.countDocuments(query);

    if (reserves.length === 0) {
      res.status(404).json({ message: 'No reserves found.' });
    } else {
      res.status(200).json({
        data: {
          total: totalReserves,
          limit: limit,
          offset: offset,
          reserves: reserves,
        },
      });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error listing reserves.' });
  }
};

export const getReserveById = async (req: Request, res: Response): Promise<void> => {
  const reserveId = req.params.id;

  try {
    if (!isValidObjectId(reserveId)) {
      res.status(404).json({ message: 'Reserve not found' });
      return;
    }

    const reserve: any | null = await Reserve.findById(reserveId);

    if (!reserve) {
      res.status(404).json({ message: 'Reserve not found' });
      return;
    }

    res.status(200).json(reserve);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving reserve.' });
  }
};

export const updateReserve = async (req: Request, res: Response): Promise<void> => {
  const reserveId = req.params.id;
  const reserveData = req.body;

  try {
    if (!mongoose.isValidObjectId(reserveId)) {
      throw new APIError('id', 'Invalid reserve ID');
    }

    const reserveToUpdate = await Reserve.findById(reserveId);
    if (!reserveToUpdate) {
      res.status(404).json({ error: 'Reserve not found' });
      return;
    }

    const carId = reserveToUpdate.id_car;
    const userId = reserveToUpdate.id_user;

    const currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0);

    const nextDay = new Date();
    nextDay.setUTCHours(0, 0, 0, 0);
    nextDay.setDate(nextDay.getDate() + 1);

    const startDateParts = reserveData.start_date.split('/');
    const endDateParts = reserveData.end_date.split('/');

    const startDateISO = `${startDateParts[2]}-${startDateParts[1]}-${startDateParts[0]}`;
    const endDateISO = `${endDateParts[2]}-${endDateParts[1]}-${endDateParts[0]}`;

    const startDate = new Date(startDateISO);
    startDate.setUTCHours(0, 0, 0, 0);

    const endDate = new Date(endDateISO);
    endDate.setUTCHours(0, 0, 0, 0);

    if (reserveToUpdate.start_date.toDateString() === currentDate.toDateString()) {
      res.status(400).json({ error: 'Reserve cannot be updated if scheduled to start today' });
      return;
    }

    if (reserveToUpdate.start_date.toDateString() === nextDay.toDateString()) {
      res.status(400).json({ error: 'Reserve cannot be updated if scheduled to start tomorrow' });
      return;
    }

    if (startDate > endDate) {
      res.status(400).json({ error: 'end_date cannot be earlier than start_date' });
      return;
    }

    const overlappingReserve = await Reserve.findOne({
      id_car: carId,
      $or: [
        {
          start_date: { $lte: startDate },
          end_date: { $gte: startDate }
        },
        {
          start_date: { $lte: endDate },
          end_date: { $gte: endDate }
        }
      ]
    });

    if (overlappingReserve && overlappingReserve.id !== reserveId) {
      res.status(400).json({ error: 'Car already has an overlapping reservation' });
      return;
    }

    const userReserve = await Reserve.findOne({
      id_user: userId,
      $or: [
        {
          start_date: { $lte: startDate },
          end_date: { $gte: startDate }
        },
        {
          start_date: { $lte: endDate },
          end_date: { $gte: endDate }
        }
      ]
    });

    if (userReserve && userReserve.id_car !== carId && userReserve.id !== reserveId) {
      res.status(400).json({ error: 'User already has a reservation with another car within the specified date range' });
      return;
    }

    const updatedReserve = await Reserve.findByIdAndUpdate(
      reserveId,
      { $set: { start_date: startDate, end_date: endDate, ...reserveData } },
      { new: true, runValidators: true }
    );

    if (!updatedReserve) {
      res.status(404).json({ error: 'Reserve not found' });
      return;
    }

    res.status(200).json({ data: updatedReserve });
  } catch (err) {
    APIError.handleErrorResponse(res, err);
  }
};

export const deleteReserve = async (req: Request, res: Response): Promise<void> => {
  try {
    const reserveId: string = req.params.id;

    if (!reserveId) {
      res.status(400).json({ error: 'Reserve ID is required.' });
      return;
    }

    const reserve = await Reserve.findByIdAndDelete(reserveId);

    if (reserve) {
      res.status(200).send();
    } else {
      res.status(404).json({ message: 'Reserve not found.' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error deleting reserve.' });
  }
};