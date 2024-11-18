import con from './connection.js'

export async function adicionarUsuario (usuario) {
    let comando = `
    insert into tb_usuarios (nm_usuario, id_login)
        values (?, ?)
    `
    let resposta = await con.query(comando, [usuario.nome, usuario.id])
    let info = resposta[0]
    return info.insertId
}

export async function consultarUsuarios () {
    let comando = `
    select id_usuario   id, nm_usuario  nome, id_login  login
        from tb_usuarios
    `
    let resposta = await con.query(comando)
    let info = resposta[0]
    return info
}

export async function consultarUsuarioPorId (id) {
    let comando = `
    select id_usuario   id, nm_usuario  nome, id_login  login
        from tb_usuarios
        where id_usuario = ?
    `
    let resposta = await con.query(comando, [id])
    let info = resposta[0]
    return info
}

export async function alterarUsuario (usuario, id) {
    let comando = `
    update tb_usuarios
        set nm_usuario = ?,
            id_login = ?
        where id_usuario = ?
    `
    let resposta = await con.query(comando, [usuario.nome, id])
    let info = resposta[0]
    return info.affectedRows
}

export async function removerUsuario (id) {
    let comando = `
    delete from tb_usuarios
        where id_usuario = ?
    `
    let resposta = await con.query(comando, [id])
    let info = resposta[0]
    return info.affectedRows
}

