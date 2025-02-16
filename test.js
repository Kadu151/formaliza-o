// Função para formatar o valor inserido nos inputs
function formatarInput(event) {
    let valor = event.target.value;
    valor = valor.replace(/[^\d,.-]/g, ''); // Remove caracteres não numéricos
    valor = valor.replace(',', '.'); // Troca vírgula por ponto para evitar erros no parseFloat
    event.target.value = valor;
}

// Função para calcular e exibir os resultados
function exibirResultado() {
    // Obtendo os valores dos inputs e corrigindo a conversão
    function obterValor(selector) {
        let elemento = document.querySelector(selector);
        if (!elemento) return 0;
        let valor = elemento.value.replace(',', '.'); // Troca vírgula por ponto
        return parseFloat(valor) || 0;
    }

    // Pegando valores do Balanço
    let ativoCirculanteAtual = obterValor('#balanco tr:nth-child(2) td:nth-child(2) input');
    let ativoCirculanteAnterior = obterValor('#balanco tr:nth-child(2) td:nth-child(3) input');

    let disponivelAtual = obterValor('#balanco tr:nth-child(3) td:nth-child(2) input');
    let disponivelAnterior = obterValor('#balanco tr:nth-child(3) td:nth-child(3) input');

    let estoqueAtual = obterValor('#balanco tr:nth-child(4) td:nth-child(2) input');
    let estoqueAnterior = obterValor('#balanco tr:nth-child(4) td:nth-child(3) input');

    let ativoNaoCirculanteAtual = obterValor('#balanco tr:nth-child(5) td:nth-child(2) input');
    let ativoNaoCirculanteAnterior = obterValor('#balanco tr:nth-child(5) td:nth-child(3) input');

    let passivoCirculanteAtual = obterValor('#balanco tr:nth-child(6) td:nth-child(2) input');
    let passivoCirculanteAnterior = obterValor('#balanco tr:nth-child(6) td:nth-child(3) input');

    let passivoNaoCirculanteAtual = obterValor('#balanco tr:nth-child(7) td:nth-child(2) input');
    let passivoNaoCirculanteAnterior = obterValor('#balanco tr:nth-child(7) td:nth-child(3) input');

    let PatrimonioLiquidoAtual = obterValor('#balanco tr:nth-child(8) td:nth-child(2) input');
    let PatrimonioLiquidoAnterior = obterValor('#balanco tr:nth-child(8) td:nth-child(3) input');

    // Calculando os índices
    let correnteAtual = calcularIndice(ativoCirculanteAtual, passivoCirculanteAtual);
    let imediataAtual = calcularIndice(disponivelAtual, passivoCirculanteAtual);
    let geralAtual = calcularIndice(ativoCirculanteAtual + ativoNaoCirculanteAtual, passivoCirculanteAtual + passivoNaoCirculanteAtual);
    let secaAtual = calcularIndice(ativoCirculanteAtual - estoqueAtual, passivoCirculanteAtual);

    let correnteAnterior = calcularIndice(ativoCirculanteAnterior, passivoCirculanteAnterior);
    let imediataAnterior = calcularIndice(disponivelAnterior, passivoCirculanteAnterior);
    let geralAnterior = calcularIndice(ativoCirculanteAnterior + ativoNaoCirculanteAnterior, passivoCirculanteAnterior + passivoNaoCirculanteAnterior);
    let secaAnterior = calcularIndice(ativoCirculanteAnterior - estoqueAnterior, passivoCirculanteAnterior);

    // Calculando os novos índices de estrutura de capital
    let grauEndividamentoAtual = calcularIndiceCapital(passivoCirculanteAtual + passivoNaoCirculanteAtual, PatrimonioLiquidoAtual);
    let partTerceirosAtual = calcularIndiceCapital(passivoCirculanteAtual + passivoNaoCirculanteAtual, passivoCirculanteAtual + passivoNaoCirculanteAtual + PatrimonioLiquidoAtual);
    let partExigivelCurtoPrazoAtual = calcularIndiceCapital(passivoCirculanteAtual, passivoCirculanteAtual + passivoNaoCirculanteAtual);

    let grauEndividamentoAnterior = calcularIndiceCapital(passivoCirculanteAnterior + passivoNaoCirculanteAnterior, PatrimonioLiquidoAnterior);
    let partTerceirosAnterior = calcularIndiceCapital(passivoCirculanteAnterior + passivoNaoCirculanteAnterior, passivoCirculanteAnterior + passivoNaoCirculanteAnterior + PatrimonioLiquidoAnterior);
    let partExigivelCurtoPrazoAnterior = calcularIndiceCapital(passivoCirculanteAnterior, passivoCirculanteAnterior + passivoNaoCirculanteAnterior);

    // Exibindo os resultados no modal
    let resultadoTexto = `
        <strong>Índices do Ano Atual:</strong><br>
        Corrente: Valor: ${correnteAtual.valor}, Classificação: ${correnteAtual.classificacao}<br>
        Imediata: Valor: ${imediataAtual.valor}, Classificação: ${imediataAtual.classificacao}<br>
        Geral: Valor: ${geralAtual.valor}, Classificação: ${geralAtual.classificacao}<br>
        Seca: Valor: ${secaAtual.valor}, Classificação: ${secaAtual.classificacao}<br><br>
        <strong>Estrutura de Capital do Ano Atual:</strong><br>
        Grau de Endividamento: Valor: ${grauEndividamentoAtual.valor}, Classificação: ${grauEndividamentoAtual.classificacao}<br>
        Part. Terceiros: Valor: ${partTerceirosAtual.valor}, Classificação: ${partTerceirosAtual.classificacao}<br>
        Part. Exigível C/Prazo: Valor: ${partExigivelCurtoPrazoAtual.valor}, Classificação: ${partExigivelCurtoPrazoAtual.classificacao}<br><br>
        
        <strong>Índices do Ano Anterior:</strong><br>
        Corrente: Valor: ${correnteAnterior.valor}, Classificação: ${correnteAnterior.classificacao}<br>
        Imediata: Valor: ${imediataAnterior.valor}, Classificação: ${imediataAnterior.classificacao}<br>
        Geral: Valor: ${geralAnterior.valor}, Classificação: ${geralAnterior.classificacao}<br>
        Seca: Valor: ${secaAnterior.valor}, Classificação: ${secaAnterior.classificacao}<br><br>
        <strong>Estrutura de Capital do Ano Anterior:</strong><br>
        Grau de Endividamento: Valor: ${grauEndividamentoAnterior.valor}, Classificação: ${grauEndividamentoAnterior.classificacao}<br>
        Part. Terceiros: Valor: ${partTerceirosAnterior.valor}, Classificação: ${partTerceirosAnterior.classificacao}<br>
        Part. Exigível C/Prazo: Valor: ${partExigivelCurtoPrazoAnterior.valor}, Classificação: ${partExigivelCurtoPrazoAnterior.classificacao}
    `;
    
    // Exibindo o modal com o resultado
    document.getElementById('resultadoTexto').innerHTML = resultadoTexto;
    document.getElementById('resultadoModal').style.display = 'block';
}

// Função para calcular os índices com base nos valores
function calcularIndice(valorNumerador, valorDenominador) {
    if (valorDenominador === 0) {
        return { valor: "Indefinido", classificacao: "Indefinido" };
    }
    let resultado = valorNumerador / valorDenominador;
    return {
        valor: resultado.toFixed(2),  // Valor com 2 casas decimais
        classificacao: classificarIndice(resultado)
    };
}

// Função para calcular os índices de estrutura de capital
function calcularIndiceCapital(valorNumerador, valorDenominador) {
    if (valorDenominador === 0) {
        return { valor: "Indefinido", classificacao: "Indefinido" };
    }
    let resultado = (valorNumerador / valorDenominador) * 100;
    return {
        valor: resultado.toFixed(2) + " %",
        classificacao: classificarEstruturaCapital(resultado)
    };
}

// Função para classificar os índices de estrutura de capital
function classificarEstruturaCapital(resultado) {
    if (resultado >= 5) {
        return "Solvência";
    } else if (resultado >= 0 && resultado < 5) {
        return "Penumbra";
    } else {
        return "Insolvência";
    }
}

// Função para classificar os índices tradicionais conforme a regra fornecida
function classificarIndice(resultado) {
    if (resultado >= 2) {
        return "EXCELENTE";
    } else if (resultado >= 1 && resultado < 2) {
        return "BOM";
    } else if (resultado >= 0.5 && resultado < 1) {
        return "REGULAR";
    } else {
        return "RUIM";
    }
}

// Função para fechar o modal
function fecharModal() {
    document.getElementById('resultadoModal').style.display = 'none';
}
