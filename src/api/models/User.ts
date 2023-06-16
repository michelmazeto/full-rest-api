import { Schema, model } from 'mongoose';
import { validateCPF, validateCEP } from '../services/userServices';
import { viaCep } from '../services/userServices';
import validator from 'validator';
import bcrypt from 'bcrypt';

export interface IUser {
  name: string;
  cpf: string;
  birth: string;
  email: string;
  password: string;
  correctPassword(candidatePassword: string): Promise<boolean>;
  qualified: 'yes' | 'no';
  cep: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  uf: string;
  viaCep: () => Promise<void>;
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
        return validator.isEmail(value);
      },
      message: 'Invalid email address'
    }
  },
  password: {
    type: String,
    required: [true, 'A user must have a password'],
    minlength: [8, 'A user password must have more or equal then 8 characters'],
    validate: {
      validator: function (password: string) {
        return !password.includes(' ');
      },
      message: 'The password must not contain whitespaces'
    },
    select: false
  },
  qualified: {
    type: String,
    required: [true, 'A user must have a qualified field'],
    enum: ['yes', 'no'],
    validate: {
      validator: function (value: string) {
        return value !== 'no';
      },
      message: 'Must be qualified'
    }
  },
  cep: {
    type: String,
    required: [true, 'A user must have a CEP'],
    validate: {
      validator: validateCEP,
      message: 'Invalid CEP format or number'
    },
    trim: true
  },
  logradouro: {
    type: String,
    trim: true
  },
  bairro: {
    type: String,
    trim: true
  },
  cidade: {
    type: String,
    trim: true
  },
  uf: {
    type: String,
    trim: true
  }
});

userSchema.pre('save', async function (next) {
  if (!this.isNew) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword: string
) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.viaCep = viaCep;

const User = model<IUser>('User', userSchema);

export default User;
