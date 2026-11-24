<?php
// Altere o banco e as credenciais caso sejam diferentes no seu phpMyAdmin.
$servidor = 'localhost';
$banco = 'bancotrabalhoweb2026';
$usuario = 'root';
$senha = '';

try {
    $pdo = new PDO(
        "mysql:host=$servidor;dbname=$banco;charset=utf8mb4",
        $usuario,
        $senha,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false
        ]
    );
} catch (PDOException $erro) {
    // Não expõe credenciais nem detalhes do servidor ao usuário final.
    http_response_code(500);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['sucesso' => false, 'mensagem' => 'Falha na conexão com o banco. Confira php/conexao.php.']);
    exit;
}
