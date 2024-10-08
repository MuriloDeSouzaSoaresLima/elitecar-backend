CREATE TABLE cliente (
id_cliente SERIAL PRIMARY KEY,
nome VARCHAR(50) NOT NULL,
cpf VARCHAR(11) UNIQUE NOT NULL,
telefone VARCHAR(16)
);

CREATE TABLE carro (
id_carro SERIAL PRIMARY KEY,
marca VARCHAR(50) NOT NULL,
modelo VARCHAR(50) NOT NULL,
ano INT,
cor VARCHAR(20)
);

CREATE TABLE pedido_venda (
id_pedido SERIAL PRIMARY KEY,
id_cliente INT NOT NULL,
id_carro INT NOT NULL,
data_pedido DATE NOT NULL,
valor_pedido DECIMAL(6) NOT NULL,
FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente),
FOREIGN KEY (id_carro) REFERENCES carro(id_carro)
);

SELECT * FROM carro
-- Inserindo mais 5 registros na tabela "carro"
INSERT INTO carro (marca, modelo, ano, cor) VALUES 
('ford', 'focus', 2017, 'azul'),
('toyota', 'corolla', 2020, 'preto'),
('bmw', 'X6', 2022, 'branco'),
('volkswagen', 'jetta', 2019, 'vermelho'),
('mercedes', 'A200', 2021, 'prata');

SELECT * FROM cliente;

INSERT INTO cliente (nome, cpf, telefone) VALUES
('Ana', 46536794521, '16984567342'),
('Carlos',  51236745729, '16999873456'),
('Fernanda',  49588797598, '16991234567'),
('Lucas',  3095634532, '16985432109'),
('Beatriz',  32134294802, '16987024321');

SELECT * FROM pedido_venda;

INSERT INTO pedido_venda (id_cliente, id_carro, data_pedido, valor_pedido) VALUES
(6, 8, '2023-11-23', 87000),
(7, 9, '2021-02-14', 120000),
(8, 6, '2022-08-07', 45000),
(9, 7, '2020-09-30', 105000),
(10, 10, '2023-06-15', 230000);
