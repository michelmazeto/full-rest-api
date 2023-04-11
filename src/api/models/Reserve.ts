import mongoose, { Schema, Document } from 'mongoose';

interface IReservation extends Document {
  start_date: Date;
  end_date: Date;
  id_car: mongoose.Types.ObjectId;
  id_user: mongoose.Types.ObjectId;
  final_value: number;
}

const ReservationSchema = new Schema<IReservation>({
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  },
  id_car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: true
  },
  id_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  final_value: {
    type: Number,
    required: true
  }
});

export default mongoose.model<IReservation>('Reservation', ReservationSchema);