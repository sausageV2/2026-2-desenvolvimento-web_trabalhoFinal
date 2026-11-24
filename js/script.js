// A1.3 - O navegador conversa com os arquivos PHP usando fetch().
// O PHP consulta ou grava no MySQL e retorna uma resposta JSON.

const listaServicos = document.getElementById('listaServicos');
const listaDepoimentos = document.getElementById('listaDepoimentos');
const formDepoimento = document.getElementById('formDepoimento');
const mensagemFormulario = document.getElementById('mensagemFormulario');
const botaoEnviar = document.getElementById('btnEnviarDepoimento');

// Lê uma resposta JSON e também detecta erros HTTP, como 400 ou 500.
async function requisitarJSON(url, opcoes = {}) {
    const resposta = await fetch(url, opcoes);
    const dados = await resposta.json();
    if (!resposta.ok || !dados.sucesso) {
        throw new Error(dados.mensagem || 'Erro ao comunicar com o servidor.');
    }
    return dados;
}

// Cria nós de texto de forma segura, sem interpretar HTML digitado pelo cliente.
function criarElemento(tag, classe, texto) {
    const elemento = document.createElement(tag);
    if (classe) elemento.className = classe;
    if (texto !== undefined) elemento.textContent = texto;
    return elemento;
}

// FUNCIONALIDADE 1: listagem de serviços do banco de dados.
async function carregarServicos() {
    const mensagemErro = document.getElementById('erroServicos');
    mensagemErro.textContent = '';
    try {
        const resposta = await requisitarJSON('php/listar_servicos.php');
        listaServicos.replaceChildren();
        if (resposta.dados.length === 0) {
            listaServicos.append(criarElemento('p', 'text-center text-muted', 'Nenhum serviço cadastrado.'));
            return;
        }
        resposta.dados.forEach(servico => {
            const coluna = criarElemento('div', 'col-md-5');
            const cartao = criarElemento('div', 'card h-100 shadow-sm border-0');
            const faixaImagem = criarElemento('div', 'bg-light text-center');
            faixaImagem.style.height = '200px';
            const imagem = criarElemento('img', 'w-100 h-100');
            imagem.src = servico.imagem;
            imagem.alt = servico.titulo;
            imagem.style.objectFit = 'cover';
            faixaImagem.append(imagem);

            const corpo = criarElemento('div', 'card-body text-center mt-2');
            corpo.append(criarElemento('h5', 'card-title', servico.titulo));
            corpo.append(criarElemento('p', 'card-text text-muted', servico.descricao));
            const link = criarElemento('a', 'btn btn-custom', 'Solicitar Orçamento / Detalhes');
            // Links de serviço são caminhos internos (e não URLs arbitrárias).
            if (/^servico\d+\.html$/.test(servico.link)) {
                link.href = servico.link;
            } else {
                link.href = '#contato';
            }
            corpo.append(link);
            cartao.append(faixaImagem, corpo);
            coluna.append(cartao);
            listaServicos.append(coluna);
        });
    } catch (erro) {
        listaServicos.replaceChildren();
        mensagemErro.textContent = 'Não foi possível carregar os serviços: ' + erro.message;
    }
}

// FUNCIONALIDADE 2: listagem de depoimentos do banco de dados.
async function carregarDepoimentos() {
    const mensagemErro = document.getElementById('erroDepoimentos');
    mensagemErro.textContent = '';
    try {
        const resposta = await requisitarJSON('php/listar_depoimentos.php');
        listaDepoimentos.replaceChildren();
        if (resposta.dados.length === 0) {
            listaDepoimentos.append(criarElemento('p', 'text-center text-muted', 'Seja a primeira pessoa a deixar um depoimento!'));
            return;
        }
        resposta.dados.forEach(depoimento => {
            const coluna = criarElemento('div', 'col-md-4');
            const cartao = criarElemento('div', 'card h-100 border-0 shadow-sm');
            const corpo = criarElemento('div', 'card-body text-center');
            corpo.append(criarElemento('h6', 'card-subtitle mb-2 text-custom-secundaria fw-bold', depoimento.nome));
            corpo.append(criarElemento('p', 'card-text', '“' + depoimento.depoimento + '”'));
            cartao.append(corpo);
            coluna.append(cartao);
            listaDepoimentos.append(coluna);
        });
    } catch (erro) {
        listaDepoimentos.replaceChildren();
        mensagemErro.textContent = 'Não foi possível carregar os depoimentos: ' + erro.message;
    }
}

// FUNCIONALIDADE 3: inserção de depoimento no banco de dados.
formDepoimento.addEventListener('submit', async evento => {
    evento.preventDefault(); // Impede o recarregamento da página.
    mensagemFormulario.textContent = '';
    mensagemFormulario.className = 'mt-3 mb-0';
    botaoEnviar.disabled = true;

    const dadosFormulario = new FormData(formDepoimento);
    try {
        const resposta = await requisitarJSON('php/inserir_depoimento.php', {
            method: 'POST',
            body: dadosFormulario
        });
        mensagemFormulario.textContent = resposta.mensagem;
        mensagemFormulario.classList.add('text-success');
        formDepoimento.reset();
        await carregarDepoimentos(); // Atualiza a lista sem precisar apertar F5.
    } catch (erro) {
        mensagemFormulario.textContent = erro.message;
        mensagemFormulario.classList.add('text-danger');
    } finally {
        botaoEnviar.disabled = false;
    }
});

// Carrega as duas seções assim que o HTML estiver pronto.
carregarServicos();
carregarDepoimentos();
