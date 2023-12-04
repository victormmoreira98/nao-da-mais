const tutorService = require('../services/tutorService')
const petService = require('../services/petService')

module.exports = {

    buscarTodosP: async (req, res) => {
        let json = {error: '', result: []}

        let pet = await petService.buscarTodosP()

        for ( let i in pet){
            json.result.push({
                codigo: pet[i].codigo_pet,
                nome: pet[i].nome_pet,
                genero: pet[i].genero_pet,
                altura: pet[i].altura
            })
        }

        res.json(json)
    },

    buscarUmP: async (req, res) =>{
        let json = {error:'', result:{}}

        let id = req.params.id;
        let pet = await petService.buscarUmP(id)

        if(pet){
            json.result = pet;
        }
        res.json(json);
    },

    inserirP: async (req, res) =>{
        let json = {error:'', result:{}}

                   
        
        let codigo_pet = req.body.codigo_pet
        let nome_pet = req.body.nome_pet
        let genero_pet = req.body.genero_pet
        let tutor_id = req.body.tutor_id
        let altura = req.body.altura
        
        


        if(codigo_pet&& nome_pet && genero_pet && tutor_id && altura){
         await petService.inserirP(codigo_pet, nome_pet, genero_pet, tutor_id, altura)

            json.result = {
                codigo_pet, nome_pet, genero_pet, tutor_id, altura, desc_altura
            };
        }else{
            json.error = 'campos nao eviados'
        }
        res.json(json);
    },

    
}