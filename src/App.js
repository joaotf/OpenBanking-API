import express from 'express';
import routes from './routes.js';
import database from './database/connection.js';

class App {
  constructor(){
    this.server = express();
    
    this.database();
    this.middlewares();
    this.routes();
  }

  middlewares(){
    this.server.use(express.json());
  }

  routes(){
    this.server.use(routes);
  }

  database(){
    database.init();
  }
  
}

export default new App().server;