import { Schema, model } from 'mongoose';
import { validateCPF } from '../services/validateCPF';
import { viaCep } from '../services/CEP';

export interface IUser {
    name: string;
    cpf: string;
    birth: string;
    email: string;
    password: string;
    qualified: 'yes' | 'no';
    cep: string;
    logradouro: string;
    bairro: string;
    cidade: string;
    uf: string;
  }

const userSchema: Schema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    trim: true,
    minlength: [2, 'A user name must have more or equal than 2 characters'],
    maxlength: [20, 'A user name must have less or equal than 20 characters']
  },
  cpf: {
    type: String,
    required: [true, 'A user must have a CPF'],
    unique: true,
    trim: true,
    validate: {
      validator: validateCPF,
      message: 'Invalid CPF format or number'
    }
  },
  birth: {
    type: String,
    required: [true, 'A user must have a birthdate'],
    validate: {
      validator: function (value: string) {
        const currentDate = new Date();
        const birthdate = new Date(value);
        return currentDate.getFullYear() - birthdate.getFullYear() >= 18;
      },
      message: 'The user must be at least 18 years old'
    }
  },
  email: {
    type: String,
    required: [true, 'A user must have an email'],
    unique: true,
    trim: true,
    validate: {
      validator: function (value: string) {
        const validator = require('validator');
        return validator.isEmail(value);
      },
      message: 'Invalid email address'
    }
  },
  password: {
    type: String,
    required: [true, 'A user must have a password'],
    minlength: [6, 'A user password must have at least 6 characters']
  },
  qualified: {
    type: String,
    required: [true, 'A user must have a qualified field'],
    enum: ['yes', 'no']
  },
  cep: {
    type: String,
    required: [true, 'A user must have a CEP']
  },
  logradouro: String,
  bairro: String,
  cidade: String,
  uf: String
});

userSchema.pre<IUser>('save', viaCep);

const User = model<IUser>('User', userSchema);

export default User;
