<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    echo json_encode(['sucesso' => false, 'mensagem' => 'Método não permitido. Use POST.']);
    exit;
}

$nome = trim($_POST['nome'] ?? '');
$depoimento = trim($_POST['depoimento'] ?? '');

// A validação no PHP é necessária mesmo existindo required no HTML.
if ($nome === '' || $depoimento === '') {
    http_response_code(400);
    echo json_encode(['sucesso' => false, 'mensagem' => 'Preencha nome e depoimento.']);
    exit;
}
if (mb_strlen($nome) > 100 || mb_strlen($depoimento) > 2000) {
    http_response_code(400);
    echo json_encode(['sucesso' => false, 'mensagem' => 'O texto ultrapassou o limite permitido.']);
    exit;
}

require_once __DIR__ . '/conexao.php';

try {
    // :nome e :depoimento são parâmetros, evitando SQL injection.
    $comando = $pdo->prepare('INSERT INTO depoimentos (nome, depoimento) VALUES (:nome, :depoimento)');
    $comando->execute(['nome' => $nome, 'depoimento' => $depoimento]);
    http_response_code(201);
    echo json_encode(['sucesso' => true, 'mensagem' => 'Depoimento enviado com sucesso!'], JSON_UNESCAPED_UNICODE);
} catch (PDOException $erro) {
    http_response_code(500);
    echo json_encode(['sucesso' => false, 'mensagem' => 'Não foi possível salvar o depoimento.']);
}
