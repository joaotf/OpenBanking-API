import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Card from '../models/Card.js';
import authConfig from '../config/auth.json';

function generateToken(params = {}){
    return jwt.sign(params , authConfig.secret,{
        expiresIn : 86400,
    });
}

class CardController {
  async index(req,res){
    const card = await Card.find();

    return res.json(card);
  }

  async create(req,res){
    const { person_cpf } = req.body;
    try {
      if(await Card.findOne({ person_cpf }))
        return res.status(400).send("Cliente está cadastrado!");
    
      const card = await Card.create(req.body);

      return res.json(card);
    } catch (error) {
        return res.status(400).send({ error: 'Falha no registro!' }) ; 
    }
    
  }

  async show(req,res){
    try {
      const card = await Card.findById(req.params.id);

      return res.status(200).json(card);  
    } catch (error) {
        return res.status(400).send({ error: 'Cliente não encontrado!'});
    }
    
  }

  async update(req,res){
    const { id } = req.body;

    if(await Card.findOne({ id })){
      const card = await Card.findByIdAndUpdate(req.params.id,req.body, { new: true });

      return res.status(200).json(card);  
    } else
        return res.status(400).send({ error: "Cliente não foi encontrado!"})
  }

  async destroy(req,res){
    const { id } = req.body;
    
    if(await Card.findOne({ id })){
      await Card.findByIdAndRemove(req.params.id);

      return res.status(200).send({sucesso : 'Cliente removido com sucesso!'});
    }else
      return res.status(400).send({ error: "Cliente não foi encontrado!"})
  }

  async getFatura(req,res){
    const { id } = req.body;

    if(await Card.findOne({ id })){
      const card = await Card.findById(req.params.id);

      return res.status(200).send({ Fatura: card.card_fat });
    } else
       return res.status(400).send({ error: "Cliente não foi encontrado!"})
  }

  async getLimite(req,res){
    const { id } = req.body;

    if(await Card.findOne({ id })){
      const card = await Card.findById(req.params.id);

      return res.status(200).send({ Limite: card.card_limit });
    } else
       return res.status(400).send({ error: "Cliente não foi encontrado!"})
  }

  async getSaldo(req,res){
    const { id } = req.body;

    if(await Card.findOne({ id })){
      const card = await Card.findById(req.params.id);

      return res.status(200).send({ Saldo: card.card_saldo });
    } else
       return res.status(400).send({ error: "Cliente não foi encontrado!"})
  }

  async auth(req,res){
    try {
        const { person_email , person_password } = req.body;
        const user = await Card.findOne({ person_email }).select('+person_password')
        if(!user){
            return res.status(400).json({error:"Cliente não foi encontrado!"})
        }
        if(!await bcrypt.compare(person_password,user.person_password)){
            return res.status(400).json({error:"Senha inválida!"})
        }
        user.person_password = undefined;
        
        return res.status(200).send({user,token: generateToken({id:user.id})});
           
    }catch (err) {
        return res.status(400).json({error:"Falha na Autenticação!"})
    }

}

}

export default new CardController();