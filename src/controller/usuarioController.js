import * as bd from '../repository/usuarioRepository.js'
import { Router } from 'express'
import { autenticar } from '../utils/jwt.js'

const endpoints = Router()

endpoints.post('/usuario', autenticar, async (req, resp) => {
    try {

        let usuario = req.body
        usuario.id = req.user.id
        let id = await bd.adicionarUsuario(usuario)
        resp.send({
            novoId: id
        })

    } catch (error) {
        resp.status(400).send({
            erro: error.message
        })
    }
})

endpoints.get('/usuarios', autenticar, async (req, resp) => {
    try {

        let usuarios = await bd.consultarUsuarios()
        resp.send(usuarios)

    } catch (error) {
        resp.status(400).send({
            erro: error.message
        })
    }
})

endpoints.get('/usuario/:id', autenticar, async (req, resp) => {
    try {

        let id = req.params.id
        let usuarios = await bd.consultarUsuarioPorId(id)
        resp.send(usuarios)

    } catch (error) {
        resp.status(400).send({
            erro: error.message
        })
    }
})

endpoints.put('/usuario/:id', autenticar, async (req, resp) => {
    try {

        let usuario = req.body
        let id = req.params.id
        let registro = await bd.alterarUsuario(usuario, id)

        if(registro){
            resp.send({
                mensagem: 'alterado com sucesso'
            })
        }
        else[
            resp.send({
                mensagem: 'usuario inexistente'
            })
        ]

    } catch (error) {
        resp.status(400).send({
            erro: error.message
        })
    }
})

endpoints.delete('/usuario/:id', autenticar, async (req, resp) => {
    try {
        
        let id = req.params.id
        let registro = await bd.removerUsuario(id)

        if(registro){
            resp.send({
                mensagem: 'usuario excluído'
            })
        }
        else{
            resp.send({
                mensagem: 'usuario inexistente'
            })
        }
        

    } catch (error) {
        resp.status(400).send({
            erro: error.message
        })   
    }
})

export default endpoints