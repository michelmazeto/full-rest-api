import { Request, Response } from 'express';
import Reserve from '../models/Reserve';
import User from '../models/User';
import Car from '../models/Car';

export const createReserve = async (req: Request, res: Response) => {
  try {
    const { start_date, end_date, id_car, id_user } = req.body;

    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

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
    console.error(error);
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