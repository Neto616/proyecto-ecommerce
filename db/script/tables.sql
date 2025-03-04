create table usuarios(
	id serial primary key,
	nombre varchar(50),
	apellido varchar(50),
	whatsapp varchar(10),
	correo varchar(250),
	contrasena varchar(100),
	fecha_alta timestamp default now()
)

create table catalogo_estados(
	id serial primary key,
	codigo varchar(10), 
	nombre varchar(10),
	fecha_alta timestamp
)

create table catalogo_ciudades(
	id serial primary key,
	codigo varchar(10),
	nombre varchar(100),
	estado int references catalogo_estados(id),
	fecha_alta timestamp
)

create table productos(
	id serial primary key,
	sku varchar(10) not null,
	nombre varchar(100),
	precio numeric,
	imagen varchar(100),
	existencia numeric,
	estatus int,
	fecha_alta timestamp
)

create table direcciones(
	id serial primary key,
	usuario int references usuarios(id),
	alias varchar(30),
	calle varchar(100),
	colonia varchar(100),
	numero_interno varchar(10),
	numero_exnterno varchar(10),
	entre_calles varchar(100),
	estado int,
	ciudad int,
	fecha_alta timestamp
)

create table pedidos(
	id serial primary key,
	id_usuario int references usuarios(id),
	direccion int references direcciones(id),
	calle varchar(100), 
	colonia varchar(100),
	numero_interno varchar(10),
	numero_externo varchar(10),
	estado int references catalogo_estados(id),
	ciudad int references catalogo_ciudades(id),
	fecha_pedido timestamp
)

create table pedidos_partidas (
	id serial primary key,
	id_pedido int references pedidos(id),
	id_producto int references productos(id),
	producto varchar(100),
	precio numeric,
	cantidad numeric,
	precio_total numeric,
	estatus int,
	fecha_alta timestamp
)
