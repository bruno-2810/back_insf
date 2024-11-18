import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import con from './repository/connection.js'

import adicionarRota from './rotas.js'

const servidor = express()
servidor.use(cors())
servidor.use(express.json())

adicionarRota(servidor)

servidor.listen(process.env.porta, () => console.log(`--> API subiu <--`))
