import usuarioController from './controller/usuarioController.js'
import chamadoController from  './controller/chamadoController.js'
import loginController from  './controller/loginController.js'

export default function adicionarRota (servidor) {
    servidor.use(usuarioController)
    servidor.use(chamadoController)
    servidor.use(loginController)
}