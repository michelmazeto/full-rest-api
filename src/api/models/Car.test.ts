import Car, { ICar } from './Car';

describe('Car model', () => {
  const validCarData: ICar = {
    model: 'Example Model',
    color: 'Example Color',
    year: '2000',
    value_per_day: 50,
    accessories: [
      {
        description: 'Accessory 1'
      },
      {
        description: 'Accessory 2'
      }
    ],
    number_of_passengers: 5
  };

  it('should create a valid car object', () => {
    const car = new Car(validCarData);
    expect(car.validateSync()).toBeUndefined();
  });

  it('should fail validation when model is not provided', () => {
    const carData = { ...validCarData, model: undefined };
    const car = new Car(carData);
    const validationResult = car.validateSync();
    expect(validationResult?.errors['model'].message).toEqual('A car must have a model');
  });

  it('should fail validation when color is not provided', () => {
    const carData = { ...validCarData, color: undefined };
    const car = new Car(carData);
    const validationResult = car.validateSync();
    expect(validationResult?.errors['color'].message).toEqual('A car must have a color');
  });

  it('should fail validation when year is not provided', () => {
    const carData = { ...validCarData, year: undefined };
    const car = new Car(carData);
    const validationResult = car.validateSync();
    expect(validationResult?.errors['year'].message).toEqual('A car must have a year');
  });

  it('should fail validation when value_per_day is not provided', () => {
    const carData = { ...validCarData, value_per_day: undefined };
    const car = new Car(carData);
    const validationResult = car.validateSync();
    expect(validationResult?.errors['value_per_day'].message).toEqual('A car must have a value per day');
  });

  it('should fail validation when value_per_day is less than 1', () => {
    const carData = { ...validCarData, value_per_day: 0 };
    const car = new Car(carData);
    const validationResult = car.validateSync();
    expect(validationResult?.errors['value_per_day'].message).toEqual('A car value per day must be at least 1');
  });

  it('should fail validation when value_per_day is greater than 100000', () => {
    const carData = { ...validCarData, value_per_day: 100001 };
    const car = new Car(carData);
    const validationResult = car.validateSync();
    expect(validationResult?.errors['value_per_day'].message).toEqual('A car value per day must be at most 100000');
  });

  it('should fail validation when accessories are not provided', () => {
    const carData = { ...validCarData, accessories: undefined };
    const car = new Car(carData);
    const validationResult = car.validateSync();
    expect(validationResult?.errors['accessories'].message).toEqual('A car must have at least one accessory');
  });
});
