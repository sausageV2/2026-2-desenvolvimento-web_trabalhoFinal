<?php
header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/conexao.php';

try {
    // SELECT lê os registros; fetchAll transforma o resultado em um array.
    $comando = $pdo->query('SELECT id, titulo, descricao, imagem, link FROM servicos ORDER BY id ASC');
    $servicos = $comando->fetchAll();
    echo json_encode(['sucesso' => true, 'dados' => $servicos], JSON_UNESCAPED_UNICODE);
} catch (PDOException $erro) {
    http_response_code(500);
    echo json_encode(['sucesso' => false, 'mensagem' => 'Erro ao consultar os serviços.']);
}
