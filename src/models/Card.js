import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const CardSchema = new mongoose.Schema({
    person_name:{
        type: String,
        required: true,
    },
    person_email:{
      type: String,
      unique: true,
      required:true,
    },
    person_password:{
      type: String,
      required:true,
    },
    person_cpf:{
        type: String,
        unique: true,
        required: true
    },
    card_number:{
        type: String,
        unique: true,
        required: true
    },
    card_cvv:{
        type: String,
        required: true
    },
    card_exp:{
        type: String,
        required: true
    },
    card_limit:{
        type: String,
        required: true
    },
    card_saldo:{
        type: String,
        required:true
    },
    card_fat:[{
        type:String,
    }],
    active:{
        type: Boolean,
        default: true
    },
    createdAt:{
      type: Date,
      default: Date.now
    }
})

CardSchema.pre('save', async function(next){
  const hash = await bcrypt.hash(this.person_password,10);
  this.person_password = hash;
  
  next();
})

export default mongoose.model('Card', CardSchema);