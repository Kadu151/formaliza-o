// Função para formatar o valor inserido nos inputs
function formatarInput(event) {
    let valor = event.target.value;
    valor = valor.replace(/[^\d,.-]/g, ''); // Remove caracteres não numéricos
    valor = valor.replace(',', '.'); // Troca vírgula por ponto
    event.target.value = valor;
}

// Função para obter o valor de um input individual
function obterValor(selector) {
    let elemento = document.querySelector(selector);
    if (!elemento) return 0;
    let valor = elemento.value.replace(',', '.');
    return parseFloat(valor) || 0;
}

// Função para obter a soma de valores de um grupo de linhas visíveis
function somarGrupo(selectors) {
    let total = 0;
    selectors.forEach(sel => {
        let el = document.querySelector(sel);
        if (el && (el.closest('tr').style.display !== 'none')) {
            total += obterValor(sel);
        }
    });
    return total;
}

// Função principal para calcular e exibir os resultados
function exibirResultado() {
    // Seletores de cada item e seus conteúdos secundários
    let ativoCirculanteAtual = obterValor('#balanco tr:nth-child(2) td:nth-child(2) input') +
        somarGrupo([
            '#balanco tr:nth-child(9) td:nth-child(2) input',
            '#balanco tr:nth-child(10) td:nth-child(2) input'
        ]);

    let ativoCirculanteAnterior = obterValor('#balanco tr:nth-child(2) td:nth-child(3) input') +
        somarGrupo([
            '#balanco tr:nth-child(9) td:nth-child(3) input',
            '#balanco tr:nth-child(10) td:nth-child(3) input'
        ]);

    let disponivelAtual = obterValor('#balanco tr:nth-child(3) td:nth-child(2) input') +
        somarGrupo([
            '#balanco tr:nth-child(11) td:nth-child(2) input',
            '#balanco tr:nth-child(12) td:nth-child(2) input'
        ]);

    let disponivelAnterior = obterValor('#balanco tr:nth-child(3) td:nth-child(3) input') +
        somarGrupo([
            '#balanco tr:nth-child(11) td:nth-child(3) input',
            '#balanco tr:nth-child(12) td:nth-child(3) input'
        ]);

    let estoqueAtual = obterValor('#balanco tr:nth-child(4) td:nth-child(2) input') +
        somarGrupo([
            '#balanco tr:nth-child(13) td:nth-child(2) input'
        ]);

    let estoqueAnterior = obterValor('#balanco tr:nth-child(4) td:nth-child(3) input') +
        somarGrupo([
            '#balanco tr:nth-child(13) td:nth-child(3) input'
        ]);

    let ativoNaoCirculanteAtual = obterValor('#balanco tr:nth-child(5) td:nth-child(2) input') +
        somarGrupo([
            '#balanco tr:nth-child(14) td:nth-child(2) input',
            '#balanco tr:nth-child(15) td:nth-child(2) input'
        ]);

    let ativoNaoCirculanteAnterior = obterValor('#balanco tr:nth-child(5) td:nth-child(3) input') +
        somarGrupo([
            '#balanco tr:nth-child(14) td:nth-child(3) input',
            '#balanco tr:nth-child(15) td:nth-child(3) input'
        ]);

    let passivoCirculanteAtual = obterValor('#balanco tr:nth-child(6) td:nth-child(2) input') +
        somarGrupo([
            '#balanco tr:nth-child(16) td:nth-child(2) input',
            '#balanco tr:nth-child(17) td:nth-child(2) input'
        ]);

    let passivoCirculanteAnterior = obterValor('#balanco tr:nth-child(6) td:nth-child(3) input') +
        somarGrupo([
            '#balanco tr:nth-child(16) td:nth-child(3) input',
            '#balanco tr:nth-child(17) td:nth-child(3) input'
        ]);

    let passivoNaoCirculanteAtual = obterValor('#balanco tr:nth-child(7) td:nth-child(2) input');
    let passivoNaoCirculanteAnterior = obterValor('#balanco tr:nth-child(7) td:nth-child(3) input');

    let PatrimonioLiquidoAtual = obterValor('#balanco tr:nth-child(8) td:nth-child(2) input');
    let PatrimonioLiquidoAnterior = obterValor('#balanco tr:nth-child(8) td:nth-child(3) input');


// Função auxiliar pra extrair valor do input dentro da linha
function obterValorInput(linha, seletor) {
    let input = linha.querySelector(seletor);
    return input ? parseFloat(input.value.replace('.', '').replace(',', '.')) || 0 : 0;
}



    // Cálculos
    let correnteAtual = calcularIndice(ativoCirculanteAtual, passivoCirculanteAtual);
    let imediataAtual = calcularIndice(disponivelAtual, passivoCirculanteAtual);
    let geralAtual = calcularIndice(ativoCirculanteAtual + ativoNaoCirculanteAtual, passivoCirculanteAtual + passivoNaoCirculanteAtual);
    let secaAtual = calcularIndice(ativoCirculanteAtual - estoqueAtual, passivoCirculanteAtual);

    let correnteAnterior = calcularIndice(ativoCirculanteAnterior, passivoCirculanteAnterior);
    let imediataAnterior = calcularIndice(disponivelAnterior, passivoCirculanteAnterior);
    let geralAnterior = calcularIndice(ativoCirculanteAnterior + ativoNaoCirculanteAnterior, passivoCirculanteAnterior + passivoNaoCirculanteAnterior);
    let secaAnterior = calcularIndice(ativoCirculanteAnterior - estoqueAnterior, passivoCirculanteAnterior);

    let grauEndividamentoAtual = calcularIndiceCapital(passivoCirculanteAtual + passivoNaoCirculanteAtual, PatrimonioLiquidoAtual);
    let partTerceirosAtual = calcularIndiceCapital(passivoCirculanteAtual + passivoNaoCirculanteAtual, passivoCirculanteAtual + passivoNaoCirculanteAtual + PatrimonioLiquidoAtual);
    let partExigivelCurtoPrazoAtual = calcularIndiceCapital(passivoCirculanteAtual, passivoCirculanteAtual + passivoNaoCirculanteAtual);

    let grauEndividamentoAnterior = calcularIndiceCapital(passivoCirculanteAnterior + passivoNaoCirculanteAnterior, PatrimonioLiquidoAnterior);
    let partTerceirosAnterior = calcularIndiceCapital(passivoCirculanteAnterior + passivoNaoCirculanteAnterior, passivoCirculanteAnterior + passivoNaoCirculanteAnterior + PatrimonioLiquidoAnterior);
    let partExigivelCurtoPrazoAnterior = calcularIndiceCapital(passivoCirculanteAnterior, passivoCirculanteAnterior + passivoNaoCirculanteAnterior);

    
    // Resultado
    let resultadoTexto = `
        <strong>Índices do Ano Atual:</strong>
        <br>Corrente: Valor: ${correnteAtual.valor}, Classificação: ${correnteAtual.classificacao}
        <br>Imediata: Valor: ${imediataAtual.valor}, Classificação: ${imediataAtual.classificacao}
        <br>Geral: Valor: ${geralAtual.valor}, Classificação: ${geralAtual.classificacao}
        <br>Seca: Valor: ${secaAtual.valor}, Classificação: ${secaAtual.classificacao}

        <br><br><strong>Estrutura de Capital do Ano Atual:</strong>
        <br>Grau de Endividamento: Valor: ${grauEndividamentoAtual.valor}, Classificação: ${grauEndividamentoAtual.classificacao}
        <br>Part. Terceiros: Valor: ${partTerceirosAtual.valor}, Classificação: ${partTerceirosAtual.classificacao}
        <br>Part. Exigível C/Prazo: Valor: ${partExigivelCurtoPrazoAtual.valor}, Classificação: ${partExigivelCurtoPrazoAtual.classificacao}
    

        <br><br><strong>Índices do Ano Anterior:</strong>
        <br>Corrente: Valor: ${correnteAnterior.valor}, Classificação: ${correnteAnterior.classificacao}
        <br>Imediata: Valor: ${imediataAnterior.valor}, Classificação: ${imediataAnterior.classificacao}
        <br>Geral: Valor: ${geralAnterior.valor}, Classificação: ${geralAnterior.classificacao}
        <br>Seca: Valor: ${secaAnterior.valor}, Classificação: ${secaAnterior.classificacao}
       
        <br><br><strong>Estrutura de Capital do Ano Anterior:</strong>
        <br>Grau de Endividamento: Valor: ${grauEndividamentoAnterior.valor}, Classificação: ${grauEndividamentoAnterior.classificacao}
        <br>Part. Terceiros: Valor: ${partTerceirosAnterior.valor}, Classificação: ${partTerceirosAnterior.classificacao}
        <br>Part. Exigível C/Prazo: Valor: ${partExigivelCurtoPrazoAnterior.valor}, Classificação: ${partExigivelCurtoPrazoAnterior.classificacao}
    
    
        `;

    document.getElementById('resultadoTexto').innerHTML = resultadoTexto;
    document.getElementById('resultadoModal').style.display = 'block';
}

// Cálculo de índices
function calcularIndice(valorNumerador, valorDenominador) {
    if (valorDenominador === 0) return { valor: "Indefinido", classificacao: "Indefinido" };
    let resultado = valorNumerador / valorDenominador;
    return { valor: resultado.toFixed(2), classificacao: classificarIndice(resultado) };
}

function calcularIndiceCapital(valorNumerador, valorDenominador) {
    if (valorDenominador === 0) return { valor: "Indefinido", classificacao: "Indefinido" };
    let resultado = (valorNumerador / valorDenominador) * 100;
    return { valor: resultado.toFixed(2) + " %", classificacao: classificarEstruturaCapital(resultado) };
}

function classificarIndice(resultado) {
    if (resultado >= 2) return "EXCELENTE";
    else if (resultado >= 1) return "BOM";
    else if (resultado >= 0.5) return "REGULAR";
    else return "RUIM";
}

function classificarEstruturaCapital(resultado) {
    if (resultado >= 5) return "Solvência";
    else if (resultado >= 0) return "Penumbra";
    else return "Insolvência";
}

function fecharModal() {
    document.getElementById('resultadoModal').style.display = 'none';
}

function toggleExpand(id) {
    var content = document.getElementById(id);
    var button = content.previousElementSibling.querySelector('.expand-btn');
    if (content.style.display === "none" || content.style.display === "") {
        content.style.display = "table-row";
        button.textContent = "-";
    } else {
        content.style.display = "none";
        button.textContent = "+";
    }
}
 function toggleGroup(groupClass) {
        const rows = document.querySelectorAll(`.toggle-content.${groupClass}`);
        rows.forEach(row => {
            row.style.display = row.style.display === "table-row" ? "none" : "table-row";
        });
    }
    document.addEventListener('DOMContentLoaded', function () {
    function atualizarTotalAtivoCirculante() {
        const linhas = document.querySelectorAll('tr.ativo-circulante');
        if (linhas.length === 0) return;

        let totalAtual = 0;
        let totalAnterior = 0;

        // Começa da segunda linha (índice 1), pois a primeira é o total
        for (let i = 1; i < linhas.length; i++) {
            const inputs = linhas[i].querySelectorAll('input');
            const valorAtual = parseFloat(inputs[0].value.replace(',', '.')) || 0;
            const valorAnterior = parseFloat(inputs[1].value.replace(',', '.')) || 0;
            totalAtual += valorAtual;
            totalAnterior += valorAnterior;
        }

        // Preenche a primeira linha com o total
        const linhaTotal = linhas[0];
        const inputsTotal = linhaTotal.querySelectorAll('input');
        inputsTotal[0].value = totalAtual.toFixed(2).replace('.', ',');
        inputsTotal[1].value = totalAnterior.toFixed(2).replace('.', ',');
    }

    // Escutar mudanças em todos os campos (menos o total)
    const linhas = document.querySelectorAll('tr.ativo-circulante');
    for (let i = 1; i < linhas.length; i++) {
        const inputs = linhas[i].querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', atualizarTotalAtivoCirculante);
        });
    }
});
document.addEventListener('DOMContentLoaded', function () {
    function atualizarTotalAtivoNaoCirculante() {
        const linhas = document.querySelectorAll('tr.ativo-nao-circulante');
        if (linhas.length === 0) return;

        let totalAtual = 0;
        let totalAnterior = 0;

        // Começa da segunda linha (índice 1), pois a primeira é o total
        for (let i = 1; i < linhas.length; i++) {
            const inputs = linhas[i].querySelectorAll('input');
            const valorAtual = parseFloat(inputs[0].value.replace(',', '.')) || 0;
            const valorAnterior = parseFloat(inputs[1].value.replace(',', '.')) || 0;
            totalAtual += valorAtual;
            totalAnterior += valorAnterior;
        }

        // Preenche a primeira linha com o total
        const linhaTotal = linhas[0];
        const inputsTotal = linhaTotal.querySelectorAll('input');
        inputsTotal[0].value = totalAtual.toFixed(2).replace('.', ',');
        inputsTotal[1].value = totalAnterior.toFixed(2).replace('.', ',');
    }

    // Escutar mudanças em todos os campos (menos o total)
    const linhas = document.querySelectorAll('tr.ativo-nao-circulante');
    for (let i = 1; i < linhas.length; i++) {
        const inputs = linhas[i].querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', atualizarTotalAtivoNaoCirculante);
        });
    }
});
document.addEventListener('DOMContentLoaded', function () {
    function atualizarTotalPassivoCirculante() {
        const linhas = document.querySelectorAll('tr.passivo-circulante');
        if (linhas.length === 0) return;

        let totalAtual = 0;
        let totalAnterior = 0;

        // Começa da segunda linha (índice 1), pois a primeira é o total
        for (let i = 1; i < linhas.length; i++) {
            const inputs = linhas[i].querySelectorAll('input');
            const valorAtual = parseFloat(inputs[0].value.replace(',', '.')) || 0;
            const valorAnterior = parseFloat(inputs[1].value.replace(',', '.')) || 0;
            totalAtual += valorAtual;
            totalAnterior += valorAnterior;
        }

        // Preenche a primeira linha com o total
        const linhaTotal = linhas[0];
        const inputsTotal = linhaTotal.querySelectorAll('input');
        inputsTotal[0].value = totalAtual.toFixed(2).replace('.', ',');
        inputsTotal[1].value = totalAnterior.toFixed(2).replace('.', ',');
    }

    // Escutar mudanças em todos os campos (menos o total)
    const linhas = document.querySelectorAll('tr.passivo-circulante');
    for (let i = 1; i < linhas.length; i++) {
        const inputs = linhas[i].querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', atualizarTotalPassivoCirculante);
        });
    }
});
document.addEventListener('DOMContentLoaded', function () {
    function atualizarTotalPassivoNaoCirculante() {
        const linhas = document.querySelectorAll('tr.passivo-nao-circulante');
        if (linhas.length === 0) return;

        let totalAtual = 0;
        let totalAnterior = 0;

        // Começa da segunda linha (índice 1), pois a primeira é o total
        for (let i = 1; i < linhas.length; i++) {
            const inputs = linhas[i].querySelectorAll('input');
            const valorAtual = parseFloat(inputs[0].value.replace(',', '.')) || 0;
            const valorAnterior = parseFloat(inputs[1].value.replace(',', '.')) || 0;
            totalAtual += valorAtual;
            totalAnterior += valorAnterior;
        }

        // Preenche a primeira linha com o total
        const linhaTotal = linhas[0];
        const inputsTotal = linhaTotal.querySelectorAll('input');
        inputsTotal[0].value = totalAtual.toFixed(2).replace('.', ',');
        inputsTotal[1].value = totalAnterior.toFixed(2).replace('.', ',');
    }

    // Escutar mudanças em todos os campos (menos o total)
    const linhas = document.querySelectorAll('tr.passivo-nao-circulante');
    for (let i = 1; i < linhas.length; i++) {
        const inputs = linhas[i].querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', atualizarTotalPassivoNaoCirculante);
        });
    }
});
document.addEventListener('DOMContentLoaded', function () {
    function atualizarTotalPatrimonioLiquido() {
        const linhas = document.querySelectorAll('tr.patrimonio');
        if (linhas.length === 0) return;

        let totalAtual = 0;
        let totalAnterior = 0;

        // Começa da segunda linha (índice 1), pois a primeira é o total
        for (let i = 1; i < linhas.length; i++) {
            const inputs = linhas[i].querySelectorAll('input');
            const valorAtual = parseFloat(inputs[0].value.replace(',', '.')) || 0;
            const valorAnterior = parseFloat(inputs[1].value.replace(',', '.')) || 0;
            totalAtual += valorAtual;
            totalAnterior += valorAnterior;
        }

        // Preenche a primeira linha com o total
        const linhaTotal = linhas[0];
        const inputsTotal = linhaTotal.querySelectorAll('input');
        inputsTotal[0].value = totalAtual.toFixed(2).replace('.', ',');
        inputsTotal[1].value = totalAnterior.toFixed(2).replace('.', ',');
    }

    // Escutar mudanças em todos os campos (menos o total)
    const linhas = document.querySelectorAll('tr.patrimonio');
    for (let i = 1; i < linhas.length; i++) {
        const inputs = linhas[i].querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', atualizarTotalPatrimonioLiquido);
        });
    }
});
