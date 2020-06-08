import Card from '../models/Card.js';

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

}

export default new CardController();