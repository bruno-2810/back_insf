create database bd_insf;
use bd_insf;

create table tb_usuarios (
id_usuario int primary key auto_increment,
id_login int,
nm_usuario varchar (100),
	foreign key (id_login) references tb_login(id_usuario)
);

create table tb_chamados (
id_chamado int primary key auto_increment,
id_usuario int,
id_login int,
nm_chamado varchar (100),
ds_chamado varchar (255),
ds_impacto varchar (10),
dt_ocorrencia date,
	foreign key (id_usuario) references tb_usuarios(id_usuario),
    foreign key (id_login) references tb_login(id_usuario)
);

create table tb_login ( 
id_usuario int primary key auto_increment, 
ds_email varchar(100), 
ds_senha varchar(100) 
);