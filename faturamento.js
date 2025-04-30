function formatarMoeda(valor) {
    // Remove tudo que não for número
    valor = valor.replace(/\D/g, '');
  
    // Converte para número inteiro (centavos)
    let numero = parseInt(valor, 10);
  
    if (isNaN(numero)) return '';
  
    // Formata como moeda com R$
    let valorFormatado = (numero / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  
    return valorFormatado;
  }
  
  function valorExtenso(valor) {
    const unidades = ['', 'um', 'dois', 'três', 'quatro', 'cinco',
      'seis', 'sete', 'oito', 'nove', 'dez', 'onze',
      'doze', 'treze', 'quatorze', 'quinze', 'dezesseis',
      'dezessete', 'dezoito', 'dezenove'];
    const dezenas = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta',
      'sessenta', 'setenta', 'oitenta', 'noventa'];
    const centenas = ['', 'cem', 'duzentos', 'trezentos', 'quatrocentos',
      'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos'];
  
    valor = parseFloat(valor.replace(/\./g, '').replace(',', '.').replace('R$', '').trim());
    if (isNaN(valor)) return '';
  
    let inteiro = Math.floor(valor);
    let centavos = Math.round((valor - inteiro) * 100);
  
    function extenso(n) {
      if (n === 100) return 'cem';
      if (n < 20) return unidades[n];
      if (n < 100) return dezenas[Math.floor(n / 10)] + (n % 10 ? ' e ' + unidades[n % 10] : '');
      if (n < 1000) return centenas[Math.floor(n / 100)] + (n % 100 ? ' e ' + extenso(n % 100) : '');
      if (n < 1000000) {
        let milhar = Math.floor(n / 1000);
        let resto = n % 1000;
        return (milhar === 1 ? 'mil' : extenso(milhar) + ' mil') + (resto ? ' e ' + extenso(resto) : '');
      }
      if (n < 1000000000) {
        let milhao = Math.floor(n / 1000000);
        let resto = n % 1000000;
        return (milhao === 1 ? 'um milhão' : extenso(milhao) + ' milhões') + (resto ? ' e ' + extenso(resto) : '');
      }
      return '';
    }
  
    let texto = extenso(inteiro);
    texto += inteiro === 1 ? ' real' : ' reais';
  
    if (centavos > 0) {
      texto += ' e ' + extenso(centavos);
      texto += centavos === 1 ? ' centavo' : ' centavos';
    }
  
    return texto;
  }
  
  function formatarCampo(e) {
    const target = e.target;
  
    if (
      target.id === 'campo1' ||
      target.id === 'campo4' ||
      target.id === 'campo7' ||
      target.id === 'campo10'
    ) {
      const cursorAntes = target.selectionStart;
  
      let numeros = target.value.replace(/\D/g, '');
      target.value = formatarMoeda(numeros);
  
      // Atualiza os campos de extenso
      if (target.id === 'campo1') {
        document.getElementById('campo13').value = valorExtenso(target.value);
      } else if (target.id === 'campo4') {
        document.getElementById('campo14').value = valorExtenso(target.value);
      } else if (target.id === 'campo7') {
        document.getElementById('campo15').value = valorExtenso(target.value);
      } else if (target.id === 'campo10') {
        document.getElementById('campo16').value = valorExtenso(target.value);
      }
  
      target.setSelectionRange(target.value.length, target.value.length);
    }
  }
  
  document.addEventListener('input', formatarCampo);
  document.addEventListener('input', function (e) {
    const id = e.target.id;
  
    // Função para formatar % ao digitar
    const formatarPercentual = (valor) => {
      const numero = parseFloat(valor.replace(/\D/g, '')) / 100;
      if (isNaN(numero)) return '';
      return numero.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }) + '%';
    };
  
    if (['campo2', 'campo5', 'campo8', 'campo11'].includes(id)) {
      const cursorAntes = e.target.selectionStart;
  
      let numeros = e.target.value.replace(/\D/g, '');
      e.target.value = formatarPercentual(numeros);
  
      const valor = parseFloat(numeros) / 100;
      if (!isNaN(valor)) {
        const complemento = (100 - valor).toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }) + '%';
  
        if (id === 'campo2') document.getElementById('campo20').value = complemento;
        if (id === 'campo5') document.getElementById('campo50').value = complemento;
        if (id === 'campo8') document.getElementById('campo80').value = complemento;
        if (id === 'campo11') document.getElementById('campo110').value = complemento;
      }
  
      e.target.setSelectionRange(e.target.value.length, e.target.value.length);
    }
  });

  window.onload = function() {
    // Obtém a data atual
    const hoje = new Date();

    // Define a data do dia 15 do mês atual
    const data15Atual = new Date(hoje.getFullYear(), hoje.getMonth(), 15);

    // Se a data atual for superior ao dia 15 do mês vigente, usa o dia 15 do mês seguinte
    let dataFinal = (hoje > data15Atual) ? new Date(hoje.getFullYear(), hoje.getMonth() + 1, 15) : data15Atual;

    // Formata a data no formato YYYY-MM-DD
    const dataFormatada = dataFinal.toISOString().split('T')[0];

    // Preenche os campos de texto com a data formatada
    document.getElementById('campo30').value = dataFormatada;
    document.getElementById('campo60').value = dataFormatada;
    document.getElementById('campo90').value = dataFormatada;
    document.getElementById('campo120').value = dataFormatada;
};

  