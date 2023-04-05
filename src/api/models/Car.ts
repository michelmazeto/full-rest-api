import { Schema, model } from 'mongoose';

export interface ICar {
  model: string;
  color: string;
  year: string;
  value_per_day: number;
  accessories: { description: string }[];
  number_of_passenger: number;
}

const carSchema: Schema = new Schema<ICar>({
  model: {
    type: String,
    required: [true, 'A car must have a model'],
    trim: true,
    minlength: [2, 'A car model must have more or equal then 2 characters'],
    maxlength: [20, 'A car model must have less or equal then 20 characters']
  },
  color: {
    type: String,
    required: [true, 'A car must have a color'],
    trim: true,
    minlength: [2, 'A car color must have more or equal then 2 characters'],
    maxlength: [20, 'A car color must have less or equal then 20 characters']
  },
  year: {
    type: String,
    required: [true, 'A car must have a year'],
    validate: {
      validator: function (value: string) {
        const year = parseInt(value);
        return year >= 1950 && year <= 2023;
      },
      message: 'The year must be between 1950 and 2023'
    }
  },
  value_per_day: {
    type: Number,
    required: [true, 'A car must have a value per day'],
    min: [1, 'A car value per day must be at least 1'],
    max: [100000, 'A car value per day must be at most 100000']
  },
  accessories: {
    type: [
      {
        description: {
          type: String,
          required: [true, 'An accessory must have a description'],
          trim: true,
          minlength: [
            2,
            'An accessory description must have more or equal then 2 characters'
          ],
          maxlength: [
            40,
            'An accessory description must have less or equal then 40 characters'
          ]
        }
      }
    ],
    required: [true, 'A car must have at least one accessory']
  },
  number_of_passenger: {
    type: Number,
    required: [true, 'A car must have a number of passenger'],
    min: [1, 'A car must have at least one passenger'],
    max: [20, 'A car can have at most 20 passengers']
  }
});

const Car = model<ICar>('Car', carSchema);

export default Car;
