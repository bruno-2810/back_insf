import con from './connection.js'

export async function adicionarChamado (chamado) {
    let comando = `
    insert into tb_chamados (id_usuario, id_login, nm_chamado, ds_chamado, ds_impacto, dt_ocorrencia)
        values (?, ?, ?, ?, ?, ?)
    `
    let resposta = await con.query(comando, [chamado.idUsuario, chamado.id, chamado.nome, chamado.descricao, chamado.impacto, chamado.data])
    let info = resposta[0]
    return info.insertId
}

export async function consultarChamados () {
    let comando = `
        SELECT 
            c.id_chamado AS id, 
            c.id_usuario AS idUsuario, 
            l.id_usuario AS idLogin, 
            u.nm_usuario AS nomeUsuario, 
            c.nm_chamado AS nome, 
            c.ds_chamado AS descricao, 
            c.ds_impacto AS impacto, 
            c.dt_ocorrencia AS data
        FROM tb_chamados c
        JOIN tb_usuarios u 
            ON c.id_usuario = u.id_usuario
        JOIN tb_login l 
            ON c.id_login = l.id_usuario;
    `
    let resposta = await con.query(comando)
    let info = resposta[0]
    return info
}

export async function consultarChamadoPorId (id) {
    let comando = `
     select id_chamado   id, id_usuario  idUsuario, id_login    idLogin, nm_chamado   nome, ds_chamado    descricao, ds_impacto   impacto, dt_ocorrencia    data
        from tb_chamados
        where id_chamado = ?
    `
    let resposta = await con.query(comando, [id])
    let info = resposta[0]
    return info
}

export async function alterarChamado (chamado, id) {
    let comando = `
    update tb_chamados
        set id_usuario = ?,
            id_login = ?,
            nm_chamado = ?,
            ds_chamado = ?,
            ds_impacto = ?,
            dt_ocorrencia = ?
        where id_chamado = ?
    `
    let resposta = await con.query(comando, [chamado.idUsuario, chamado.id, chamado.nome, chamado.descricao, chamado.impacto, chamado.data, id])
    let info = resposta[0]
    return info.affectedRows
}

export async function removerChamado (id) {
    let comando = `
    delete from tb_chamados
        where id_chamado = ?
    `
    let resposta = await con.query(comando, [id])
    let info = resposta[0]
    return info.affectedRows
}

