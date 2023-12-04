const db = require('../db')

module.exports = {
    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM tutor;', (error, results) => {
                if(error) {rejeitado(error); return}
                aceito(results)
            })
        })
    },

    buscarUm: (id) =>{
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM tutor WHERE id = ?;', [id],(error,results)=>{
                if(error) { rejeitado(error); return;}
                if(results.length > 0 ){
                    aceito(results[0])
                }else{
                    aceito(false)
                } 
            })
        })

    },

    inserir: ( cpf, nome, email) =>{
        return new Promise((aceito, rejeitado)=>{
            
            db.query('INSERT INTO tutor (cpf, nome, email) VALUES (?, ?, ?);', [cpf, nome, email],(error,results)=>{
                if(error) { rejeitado(error); return;}
                aceito(results.insertCodigo)                
            })
        })

    },

    alterar: (id, cpf, nome , email) =>{
        return new Promise((aceito, rejeitado)=>{

            db.query('UPDATE tutor SET cpf = ?, nome = ?, email = ? WHERE id = ?;', [cpf, nome, email, id],(error,results)=>{
                if(error) { rejeitado(error); return;}
                aceito(results)

            })
        })

    },

    excluir: (id)=>{
        return new Promise((aceito, rejeitado)=>{
            db.query('DELETE FROM tutor WHERE id = ?;',[id], (error, results)=>{
                if(error) { rejeitado(error); return;}
                aceito(results)
            })
        })

    }

};