const express = require('express') 
const router = express.Router();

const tutorController = require('./controllers/tutorController') 
const petController = require('./controllers/petController')

router.get('/tutor', tutorController.buscarTodos)
router.get('/pet', petController.buscarTodosP)
router.get('/tutor/:id', tutorController.buscarUm)
router.get('/pet/:id', petController.buscarUmP)
router.post('/tutor', tutorController.inserir)
router.post('/pet', petController.inserirP)
router.put('/tutor/:id', tutorController.alterar)
router.delete('/tutor/:id', tutorController.excluir)



module.exports = router;