CREATE DATABASE IF NOT EXISTS bancotrabalhoweb2026 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE bancotrabalhoweb2026;

CREATE TABLE IF NOT EXISTS depoimentos (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    depoimento TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS servicos (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT NOT NULL,
    imagem VARCHAR(255) NOT NULL,
    link VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insere os exemplos somente se um registro com o mesmo nome/título não existir.
INSERT INTO depoimentos (nome, depoimento)
SELECT 'Mariana Rossi', 'Comprei um tênis para trabalhar e precisei fazer um laceamento... O atendimento foi impecável e o sapato ficou extremamente confortável.'
WHERE NOT EXISTS (SELECT 1 FROM depoimentos WHERE nome = 'Mariana Rossi');

INSERT INTO depoimentos (nome, depoimento)
SELECT 'Roberto Oliveira', 'Levei uma bota de couro antiga. O resultado ficou ótimo, parecendo nova! Excelente custo-benefício.'
WHERE NOT EXISTS (SELECT 1 FROM depoimentos WHERE nome = 'Roberto Oliveira');

INSERT INTO depoimentos (nome, depoimento)
SELECT 'Fernanda Lima', 'A equipe é sempre muito atenciosa e sincera sobre a qualidade dos produtos. É a sapataria da minha família!'
WHERE NOT EXISTS (SELECT 1 FROM depoimentos WHERE nome = 'Fernanda Lima');

INSERT INTO servicos (titulo, descricao, imagem, link)
SELECT 'Conserto e Reforma de Calçados', 'Troca de solados, saltos, colagem e costuras.', 'img/consertoTenisHorizontal.jpeg', 'servico1.html'
WHERE NOT EXISTS (SELECT 1 FROM servicos WHERE titulo = 'Conserto e Reforma de Calçados');

INSERT INTO servicos (titulo, descricao, imagem, link)
SELECT 'Limpeza, Hidratação e Restauração de Couro', 'Higienização completa e remoção de manchas.', 'img/RestauracaoCouro.jpg', 'servico2.html'
WHERE NOT EXISTS (SELECT 1 FROM servicos WHERE titulo = 'Limpeza, Hidratação e Restauração de Couro');
