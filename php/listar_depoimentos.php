<?php
header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/conexao.php';

try {
    $comando = $pdo->query('SELECT id, nome, depoimento FROM depoimentos ORDER BY id DESC');
    $depoimentos = $comando->fetchAll();
    echo json_encode(['sucesso' => true, 'dados' => $depoimentos], JSON_UNESCAPED_UNICODE);
} catch (PDOException $erro) {
    http_response_code(500);
    echo json_encode(['sucesso' => false, 'mensagem' => 'Erro ao consultar os depoimentos.']);
}
