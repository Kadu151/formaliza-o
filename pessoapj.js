// Função para alternar os campos adicionais do Procurador
document.getElementById("representadoPor").addEventListener("change", function () {
    const procuradorFields = document.getElementById("procuradorFields");
    if (this.value === "procurador") {
      procuradorFields.classList.remove("hidden");
    } else {
      procuradorFields.classList.add("hidden");
    }
});

// Função para gerar texto jurídico
function generateText() {
    // Captura os valores do formulário
    const role = document.getElementById("role").value; // Papel (vendedor ou comprador)
    const nome = document.getElementById("nome").value;
    const cnpj = document.getElementById("cnpj").value;
    const nire = document.getElementById("nire").value;
    const rua = document.getElementById("rua").value;
    const numeroEmpresa = document.getElementById("numeroEmpresa").value;
    const andar = document.getElementById("andar").value;
    const cidade = document.getElementById("cidade").value;
    const alteracaoContratual = document.getElementById("alteracaoContratual").value;
    const dataContrato = document.getElementById("dataContrato").value;
    const estadoJunta = document.getElementById("estadoJunta").value;
    const nomeJunta = document.getElementById("nomeJunta").value;
    const dataRegistro = document.getElementById("dataRegistro").value;
    const numeroRegistro = document.getElementById("numeroRegistro").value;
    const representadoPor = document.getElementById("representadoPor").value;

    // Campos do procurador (se aplicável)
    let procuradorData = "";
    if (representadoPor === "procurador") {
        const dataEmissaoProc = document.getElementById("dataEmissaoProc").value;
        const livroProc = document.getElementById("livroProc").value;
        const paginaProc = document.getElementById("paginaProc").value;
        const numeroTabeliao = document.getElementById("numeroTabeliao").value;
        const nomeTabeliao = document.getElementById("nomeTabeliao").value;
        const estadoTabeliao = document.getElementById("estadoTabeliao").value;
        const prazoValidade = document.getElementById("prazoValidade").value;

        procuradorData = `
        representado por procuração pública emitida em ${dataEmissaoProc}, registrada no Livro ${livroProc}, Página(s) ${paginaProc},
        Tabelião nº ${numeroTabeliao}, ${nomeTabeliao}, do Estado e ${estadoTabeliao}, com validade até ${prazoValidade}.
        `;
    }

    // Texto gerado para vendedor ou comprador
    let textoGerado = "";
    if (role === "vendedor") {
        textoGerado = `
        De um lado, como OUTORGANTE VENDEDORA – ${nome}, inscrita no Cadastro Nacional de Pessoa Jurídica – CNPJ – sob nº ${cnpj} (NIRE ${nire}), 
        com sede à ${rua}, nº ${numeroEmpresa}, ${andar}º andar, na cidade de ${cidade}, Estado de ${estadoJunta}, CEP: ${estadoJunta}, 
        com sua ${alteracaoContratual}ª alteração consolidada de ${dataContrato}, registrada na Junta Comercial do Estado de ${estadoJunta} – ${nomeJunta} 
        em ${dataRegistro} através do nº ${numeroRegistro}, neste ato ${representadoPor === "procurador" ? `representado por seu(ua) procurador(a) identificado(a) conforme ${procuradorData}` : 'representado por seu(ua,uas,s):'}
        `;
    } else if (role === "comprador") {
        textoGerado = `
        De um lado, como OUTORGADA COMPRADORA E DEVEDORA FIDUCIANTE – ${nome}, inscrita no Cadastro Nacional de Pessoa Jurídica – CNPJ – sob nº ${cnpj} (NIRE ${nire}), 
        com sede à ${rua}, nº ${numeroEmpresa}, ${andar}º andar, na cidade de ${cidade}, Estado de ${estadoJunta}, CEP: ${estadoJunta}, 
        com sua ${alteracaoContratual}ª alteração consolidada de ${dataContrato}, registrada na Junta Comercial do Estado de ${estadoJunta} – ${nomeJunta} 
        em ${dataRegistro} através do nº ${numeroRegistro}, neste ato ${representadoPor === "procurador" ? `representado por seu(ua) procurador(a) identificado(a) conforme ${procuradorData}` : 'representado por seu(ua,uas,s):'}
        `;
    }

    // Exibe o texto gerado no output
    document.getElementById("output").textContent = textoGerado.trim();
}
