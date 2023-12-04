const db = require('../db')

module.exports = {

    buscarTodosP: () => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM pet;', (error, results) => {
                if(error) {rejeitado(error); return}
                aceito(results)
            })
        })
        
    },

    buscarUmP: (id) =>{
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM pet WHERE id = ?;', [id],(error,results)=>{
                if(error) { rejeitado(error); return;}
                if(results.length > 0 ){
                    aceito(results[0])
                }else{
                    aceito(false)
                } 
            })
        })
    },

    inserirP: (codigo_pet, nome_pet, genero_pet, tutor_id, altura, desc_altura) =>{
        return new Promise((aceito, rejeitado)=>{

        

            if(altura < 15){
                desc_altura = "pequeno"
            }else if(altura >= 15 && altura < 45){
                desc_altura = "medio"
            }else{
                desc_altura = "alto"
            }

            
            
            db.query('INSERT INTO pet (codigo_pet, nome_pet, genero_pet, tutor_id, altura) VALUES (?, ?, ?, ?, ?);' , [codigo_pet, nome_pet, genero_pet, tutor_id,  altura],(error,results)=>{
                if(error) { rejeitado(error); return;}
                aceito(results)                
            })
        })

    },

    
}



    
