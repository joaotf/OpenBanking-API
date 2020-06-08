import mongoose from 'mongoose';

class Database {
  constructor(){
    this.init();
  }

  init(){
    mongoose.connect(
      "mongodb+srv://user1:1secret2life3@abf-gyvot.mongodb.net/test?retryWrites=true&w=majority",{
      useUnifiedTopology:true,
      useNewUrlParser:true
    })
    mongoose.Promise = global.Promise;

  }
}

export default new Database();