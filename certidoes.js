  function generateText() {
    // Captura os valores dos campos do formulário
    const role = document.getElementById("role").value;
    const matricula = document.getElementById("matricula").value;
    const emissaoMatricula = document.getElementById("emissaomatricula").value;
    const numeroOficio = document.getElementById("numerooficio").value;
    const cartorio = document.getElementById("cartorio").value;
    const estado = document.getElementById("Estado").value;
    const certidao = document.getElementById("certidao").value;
    const numerocertidao = document.getElementById("numerocertidao").value;
    const datacertidao = document.getElementById("datacertidao").value;
    const validadecertidao = document.getElementById("validadecertidao").value;
const receitavendedor = document.getElementById("receitavendedor").value;
const validadevendedor = document.getElementById("validadevendedor").value;
const codigovendedor = document.getElementById("codigovendedor").value;
const cndtvendedor = document.getElementById("cndtvendedor").value;
const datacndtvendedor = document.getElementById("datacndtvendedor").value;
const validadecndtvendedor = document.getElementById("validadecndtvendedor").value;
const receitacomprador = document.getElementById("receitacomprador").value;
const validadecomprador = document.getElementById("validadecomprador").value;
const codigocomprador = document.getElementById("codigocomprador").value;
const cndtcomprador = document.getElementById("cndtcomprador").value;
const datacndtcomprador = document.getElementById("datacndtcomprador").value;
const validadecndtcomprador = document.getElementById("validadecndtcomprador").value;

    // Verifica se todos os campos obrigatórios foram preenchidos
    if (!matricula || !emissaoMatricula || !numeroOficio) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Lógica para gerar o texto jurídico baseado no papel selecionado
    let textoPadrao = "";
    if (role === "vendedor") {
      textoPadrao = `
        DAS CERTIDÕES: a) pelo (a/s/as) OURTOGANTE(s) VENDEDOR(a/es/as), foram apresentadas anteriormente as certidões expedidas pelos Cartórios dos Distribuidores de Ações Cíveis e de Família, das 
Execuções Fiscais, da Justiça Federal, dos Cartórios de Protestos e da Justiça do Trabalho, as quais após examinadas foram entregues à CREDORA FIDUCIÁRIA; apresentando-me ainda, a certidão        
de inteiro teor com ônus reais e negativa de ações reais e pessoais reipersecutórias da matrícula nº ${matricula}, expedida em ${emissaoMatricula}, pelo ${numeroOficio}º ${cartorio}, do
Estado de ${estado}, e ${certidao} de número ${numerocertidao}, emitida em ${datacertidao}, válida até ${validadecertidao}, situação REGULAR, e
que nada deve quanto ao condomínio. Em conformidade com a recomendação nº. 03, de 15/03/2012, do Conselho Nacional de Justiça, foi apresentada a Certidão Negativa de Débitos Trabalhistas 
(CNDT), de que trata o do artigo 642-A, da CLT; b) O (a/s/as)  VENDEDOR(a/es/as) apresenta ainda a Certidão Negativa de Débitos Relativos aos Tributos Federais e a Dívida Ativa da União, 
inclusive as contribuições sociais previstas nas alíneas “a” a “d” do parágrafo único do artigo 11 da lei federal 8.212 de 24 de julho de 1991, emitida(s) pela Secretaria da Receita Federal 
do Brasil, em ${receitavendedor} válida(s) até ${validadevendedor}, com código(s) de controle ${codigovendedor}, e a Certidão de Negativa de Débitos 
Trabalhistas, sob o(s) n° ${cndtvendedor}, expedida em ${datacndtvendedor}, válida até ${validadecndtvendedor}; c) O (a/s/as) DEVEDOR(a/es/as) FIDUCIANTE(s) apresenta ainda a 
Certidão Negativa de Débitos Relativos aos Tributos Federais e a Dívida Ativa da União, inclusive as contribuições sociais previstas nas alíneas “a” a “d” do parágrafo único do artigo 11 da 
lei federal 8.212 de 24 de julho de 1991, emitidas pela Secretaria da Receita Federal do Brasil, em ${receitacomprador}, válida(s) até ${validadecomprador}, 
com código(s) de controle : ${codigocomprador}, e a Certidão de Negativa de Débitos Trabalhistas, sob o(s) n° ${cndtcomprador}, expedida(s) em  ${datacndtcomprador}, 
válida(s) até ${validadecndtcomprador}; d) não obstante a apresentação das certidões, supra mencionadas, declara o (a/s/as)  VENDEDOR(a/es/as), juntamente com o (a/s/as) 
DEVEDOR(a/es/as) FIDUCIANTE(s), sob pena de responsabilidade civil e criminal, nos termos da Lei Federal número 7433, datada de 18.12.1985, regulamentada pelo Decreto Federal número 93240, 
datado de 09.09.1986, que inexistem ações reais e pessoais reipersecutórias relativas ao imóvel objetivado, pelo presente contrato e outros ônus reais incidentes sobre o mesmo.
      `;
    } else if (role === "comprador") {
      textoPadrao = `
     DAS CERTIDÕES: a) pelos DEVEDOR(ES,AS) FIDUCIANTE(S), foram
apresentadas anteriormente as certidões expedidas pelos Cartórios dos Distribuidores de Ações Cíveis e de Família, das Execuções Fiscais, da Justiça Federal, dos Cartórios de Protestos e da 
Justiça do Trabalho, as quais após examinadas foram entregues à CREDORA FIDUCIÁRIA; apresentando-me ainda, as certidões de propriedade do imóvel objeto(s) da(s) matrícula(s) de nº  ${matricula}
expedida em ${emissaoMatricula}, pelo ${numeroOficio}º ${cartorio}, Estado de ${estado}, e ${certidao} de número ${numerocertidao}, emitida em ${datacertidao}, válida até ${validadecertidao}, Em conformidade com a recomendação nº. 03, de 15/03/2012, do Conselho Nacional de Justiça, foi apresentada a Certidão Negativa de Débitos
Trabalhistas (CNDT), de que trata o do artigo 642-A, da CLT; b) O(S,a,as) DEVEDOR(es,as,a) FIDUCIANTE(s) apresenta(m) ainda a Certidão Negativa de Débitos Relativos aos Tributos Federais e à Dívida Ativa da  
União, inclusive as contribuições sociais previstas nas alíneas “a” a “d” do parágrafo único do artigo 11 da lei federal 8.212 de 24 de julho de 1991, emitida(s) pela Secretaria da Receita 
Federal do Brasil, em ${receitacomprador}, válida(s) até ${validadecomprador}, com código(s) de controle: ${codigocomprador}, 
 e a Certidão de Negativa de Débitos Trabalhistas, sob o(s) n° ${cndtcomprador}, expedida(s) em  ${datacndtcomprador}, 
válida(s) até ${validadecndtcomprador}; c) não obstante a apresentação das certidões, supramencionadas, declara a DEVEDORES FIDUCIANTES, sob pena de responsabilidade civil e criminal, nos termos da Lei Federal número 7433, datada de 18.12.1985, regulamentada pelo Decreto Federal número 93240, datado de 09.09.1986, que inexistem ações reais e pessoais reipersecutórias relativas ao imóvel objetivado, pelo presente contrato e outros ônus reais incidentes sobre o mesmo.
      `;
    } else {
      textoPadrao = "Por favor, selecione um papel válido.";
    }

    // Exibe o texto gerado no elemento de saída
    document.getElementById("output").textContent = textoPadrao;
  }
