const tutorService = require('../services/tutorService')
const petService = require('../services/petService')

module.exports = {

    buscarTodos: async (req, res) => {
        let json = {error: '', result: []}

        let tutor = await tutorService.buscarTodos()

        for ( let i in tutor){
            json.result.push({
                cpf: tutor[i].cpf,
                nome: tutor[i].nome,
                email: tutor[i].email
            })
        }

        res.json(json)
    },

    buscarUm: async (req, res) =>{
        let json = {error:'', result:{}}

        let id = req.params.id;
        let tutor = await tutorService.buscarUm(id)

        if(tutor){
            json.result = tutor;
        }
        res.json(json);
    },

    inserir: async (req, res) =>{
        let json = {error:'', result:{}}

        let cpf = req.body.cpf            
        let nome = req.body.nome
        let email = req.body.email


        if(cpf && nome && email){
            let tutorCodigo = await tutorService.inserir(cpf, nome, email)

            json.result = {
                id_tutor: tutorCodigo,
                cpf,
                nome,
                email
            };
        }else{
            json.error = 'campos nao eviados'
        }
        res.json(json);
    },

    alterar: async (req, res) =>{
        let json = {error:'', result:{}}
      
        let id = req.params.id 
        let cpf = req.body.cpf            
        let nome = req.body.nome
        let email = req.body.email
        
       
        if(id && nome && email && cpf ){
            await tutorService.alterar(id, nome, email,cpf)

            json.result = {

                cpf,
                nome,
                email
            };
        }else{
            json.error = 'EU NAO AGUENTO MAIS  '
        }
        res.json(json);

    },

    excluir: async(req, res) => {
        let json = {error:'', result:{}}

        await tutorService.excluir(req.params.id)

        res.json(json)
    }
    

}