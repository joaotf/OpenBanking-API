import mongoose from 'mongoose';

class Database {
  constructor(){
    this.init();
  }

  init(){
    mongoose.connect(
      "mongodb+srv://joaotomefarias:yjQXVMiuTNmmD0NA@cluster0-fwv4i.mongodb.net/Cards?retryWrites=true&w=majority",{
      useUnifiedTopology:true,
      useNewUrlParser:true
    })
    mongoose.Promise = global.Promise;

  }
}

export default new Database();