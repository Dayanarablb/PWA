create table productos(
	id serial primary key,
	nombre text,
	descripcion text,
	stock int,
	precio numeric(10,2),
	imagen text
);

create table usuarios (
	id serial primary key,
	nombre text not null,
	correo text not null,
	password text not null
);

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL UNIQUE
);

INSERT INTO roles (nombre) VALUES
('admin'),
('vendedor'),
('cliente');

ALTER TABLE usuarios ADD COLUMN id_rol INTEGER;

ALTER TABLE usuarios ADD CONSTRAINT fk_rol FOREIGN KEY (id_rol) REFERENCES roles(id);
