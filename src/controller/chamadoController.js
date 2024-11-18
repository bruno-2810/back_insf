import * as bd from '../repository/chamadoRepository.js'
import { Router } from 'express'
import { autenticar } from '../utils/jwt.js'

const endpoints = Router()

endpoints.post('/chamado', autenticar, async (req, resp) => {
    try {

        let chamado = req.body
        chamado.id = req.user.id
        let id = await bd.adicionarChamado(chamado)
        resp.send({
            novoId: id
        })

    } catch (error) {
        resp.status(400).send({
            erro: error.message
        })
    }
})

endpoints.get('/chamados', autenticar, async (req, resp) => {
    try {

        let chamados = await bd.consultarChamados()
        resp.send(chamados)

    } catch (error) {
        resp.status(400).send({
            erro: error.message
        })
    }
})

endpoints.get('/chamado/:id', autenticar, async (req, resp) => {
    try {

        let id = req.params.id
        let chamados = await bd.consultarChamadoPorId(id)
        resp.send(chamados)

    } catch (error) {
        resp.status(400).send({
            erro: error.message
        })
    }
})

endpoints.put('/chamado/:id', autenticar, async (req, resp) => {
    try {

        let chamado = req.body
        let id = req.params.id
        let registro = await bd.alterarChamado(chamado, id)

        if(registro){
            resp.send({
                mensagem: 'alterado com sucesso'
            })
        }
        else[
            resp.send({
                mensagem: 'chamado inexistente'
            })
        ]

    } catch (error) {
        resp.status(400).send({
            erro: error.message
        })
    }
})

endpoints.delete('/chamado/:id', autenticar, async (req, resp) => {
    try {
        
        let id = req.params.id
        let registro = await bd.removerChamado(id)

        if(registro){
            resp.send({
                mensagem: 'chamado excluído'
            })
        }
        else{
            resp.send({
                mensagem: 'chamado inexistente'
            })
        }
        

    } catch (error) {
        resp.status(400).send({
            erro: error.message
        })   
    }
})

export default endpoints