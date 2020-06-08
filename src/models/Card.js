import mongoose from 'mongoose';

const CardSchema = new mongoose.Schema({
    person_name:{
        type: String,
        required: true,
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
    }
})

export default mongoose.model('Card', CardSchema);