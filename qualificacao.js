

function toggleSpouseFields() {
    const maritalStatus = document.getElementById('maritalStatus').value;
    const spouseFields = document.getElementById('spouseFields');

    // Exibe os campos do cônjuge se o estado civil for "casado(a)"
    if (maritalStatus === 'casado(a)') {
        spouseFields.style.display = 'block';
    } else {
        spouseFields.style.display = 'none';
    }
}

function generateText() {
    const role = document.getElementById('role').value; // Captura o valor do papel selecionado
    const name = document.getElementById('name').value;
    const nationality = document.getElementById('nationality').value;
    const profession = document.getElementById('profession').value;
    const maritalStatus = document.getElementById('maritalStatus').value;
    const rg = document.getElementById('rg') ? document.getElementById('rg').value : '';
    const cpf = document.getElementById('cpf') ? document.getElementById('cpf').value : '';
    const filiation = document.getElementById('filiation') ? document.getElementById('filiation').value : '';
    const email = document.getElementById('email') ? document.getElementById('email').value : '';
    const phone = document.getElementById('phone') ? document.getElementById('phone').value : '';
    const birthdate = document.getElementById('birthdate') ? document.getElementById('birthdate').value : '';
    const marriedborn = document.getElementById('marriedborn') ? document.getElementById('marriedborn').value : '';
    const certificate = document.getElementById('certificate') ? document.getElementById('certificate').value : '';
    const registryOffice = document.getElementById('registryOffice') ? document.getElementById('registryOffice').value : '';
    const city = document.getElementById('city') ? document.getElementById('city').value : '';
    const state = document.getElementById('state') ? document.getElementById('state').value : '';
    const street = document.getElementById('street') ? document.getElementById('street').value : '';
    const houseNumber = document.getElementById('houseNumber') ? document.getElementById('houseNumber').value : '';
    const neighborhood = document.getElementById('neighborhood') ? document.getElementById('neighborhood').value : '';
    const cep = document.getElementById('cep') ? document.getElementById('cep').value : '';

    // Obtem informações do cônjuge, se aplicável
    const spouseName = document.getElementById('spouseName').value;
    const spouseNationality = document.getElementById('spouseNationality').value;
    const spouseProfession = document.getElementById('spouseProfession').value;
    const spouseRg = document.getElementById('spouseRg').value;
    const spouseCpf = document.getElementById('spouseCpf').value;
    const spouseFiliation = document.getElementById('spouseFiliation').value;
    const spouseEmail = document.getElementById('spouseEmail').value;
    const spousePhone = document.getElementById('spousePhone').value;
    const spouseBirthdate = document.getElementById('spouseBirthdate').value;
    const spousemarriageregime = document.getElementById('spousemarriageregime').value;
    const spousemarriagedate = document.getElementById('spousemarriagedate').value;

    // Verifique os valores capturados
    console.log('spouseName:', spouseName);
    console.log('spouseFiliation:', spouseFiliation);
    console.log('spouseEmail:', spouseEmail);
    console.log('spousePhone:', spousePhone);
    console.log('spouseBirthdate:', spouseBirthdate);
    console.log('spousemarriageregime:', spousemarriageregime);
    console.log('spousemarriagedate:', spousemarriagedate);
    
    let generatedText = '';
    
    // Verifica se o estado civil é "casado(a)"
    if (role === 'comprador') {
        generatedText = `
            De um lado, como <strong>OUTORGADO(a,as,os) COMPRADOR(a,es, DEVEDOR(a,es) FIDUCIANTE(s) – ${name}</strong>, ${nationality}, ${profession}, ${maritalStatus}, portador(a) da cédula de identidade RG sob nº ${rg}, inscrita no CPF/MF de nº ${cpf}, filho(a) de ${filiation}, e-mail: ${email}, telefone: ${phone}, maior, nascido(a) em ${birthdate} conforme declarou, com certidão de ${marriedborn} com matrícula nº ${certificate}, expedida pelo ${registryOffice}, residente e domiciliado(a) na cidade de ${city}, Estado de ${state}, na ${street}, nº ${houseNumber}, ${neighborhood}, CEP: ${cep}.
        `;
    
        if (maritalStatus === 'casado(a)') {
            generatedText += `
                <br><br> 
               De um lado, como <strong>OUTORGADO(a,as,os) COMPRADOR(a,es, DEVEDOR(a,es) FIDUCIANTE(s) – ${name}</strong>, ${nationality}, ${profession}, ${maritalStatus}, portador(a) da cédula de identidade RG sob nº ${rg}, inscrito(a) no CPF/MF de nº ${cpf}, filho(a) de ${filiation}, e-mail: ${email}, telefone: ${phone}, maior, nascido(a) em ${birthdate} conforme declarou, e sua cônjuge <strong>${spouseName}</strong>, ${spouseNationality}, ${spouseProfession}, portador(a) da cédula de identidade RG sob nº ${spouseRg}, inscrito(a) no CPF/MF de nº ${spouseCpf}, filho(a) de ${spouseFiliation}, e-mail: ${spouseEmail}, telefone: ${spousePhone}, maior, nascido(a) em ${spouseBirthdate} conforme declarou, casados no regime de ${spousemarriageregime}, em ${spousemarriagedate} (ANTES/APOS vigencia da Lei nº 6.515/77) com matrícula nº ${certificate}, expedida pelo ${registryOffice}, residentes e domiciliados na cidade de ${city}, Estado de ${state}, na ${street}, nº ${houseNumber}, ${neighborhood}, CEP: ${cep}.
            `;
        }
    } else if (role === 'vendedor') {
        generatedText = `
            De um lado, como <strong>OUTORGANTE(s) VENDEDOR(a,es,as) – ${name}</strong>, ${nationality}, ${profession}, ${maritalStatus}, portador(a) da cédula de identidade RG sob nº ${rg}, inscrito(a) no CPF/MF de nº ${cpf}, filho(a) de ${filiation}, e-mail: ${email}, telefone: ${phone}, maior, nascido(a) em ${birthdate} conforme declarou, com certidão de ${marriedborn} com matrícula nº ${certificate}, expedida pelo ${registryOffice}, residente e domiciliado(a) na cidade de ${city}, Estado de ${state}, na ${street}, nº ${houseNumber}, Bairro: ${neighborhood}, CEP: ${cep}.
        `;
        if (maritalStatus === 'casado(a)') {
            generatedText += `
                <br><br> 
              De um lado, como <strong>OUTORGANTE(s) VENDEDOR(a,es,as)  – ${name}</strong>, ${nationality}, ${profession}, ${maritalStatus}, portador(a) da cédula de identidade RG sob nº ${rg}, inscrito(a) no CPF/MF de nº ${cpf}, filho(a) de ${filiation}, e-mail: ${email}, telefone: ${phone}, maior, nascido(a) em ${birthdate} conforme declarou, e sua cônjuge <strong>${spouseName}</strong>, ${spouseNationality}, ${spouseProfession}, portador(a) da cédula de identidade RG sob nº ${spouseRg}, inscrito(a) no CPF/MF de nº ${spouseCpf}, filho(a) de ${spouseFiliation}, e-mail: ${spouseEmail}, telefone: ${spousePhone}, maior, nascido(a) em ${spouseBirthdate} conforme declarou, casados no regime de ${spousemarriageregime}, em ${spousemarriagedate} (ANTES/APOS vigencia da Lei nº 6.515/77) com matrícula nº ${certificate}, expedida pelo ${registryOffice}, residentes e domiciliados na cidade de ${city}, Estado de ${state}, na ${street}, nº ${houseNumber}, ${neighborhood}, CEP: ${cep}.
            `;
        }
    } else if (role === 'fiador') {
        generatedText = `
            De outro lado, como <strong>FIADOR(a,es) – ${name}</strong>, ${nationality}, ${profession}, ${maritalStatus}, portador(a) da cédula de identidade RG sob nº ${rg}, inscrito(a) no CPF/MF de nº ${cpf}, filho(a) de ${filiation}, e-mail: ${email}, telefone: ${phone}, maior, nascido(a) em ${birthdate} conforme declarou, com certidão de ${marriedborn} com matrícula nº ${certificate}, expedida pelo ${registryOffice}, residente e domiciliad0(a) na cidade de ${city}, Estado de ${state}, na ${street}, nº ${houseNumber}, Bairro: ${neighborhood}, CEP: ${cep}.
        `;
        if (maritalStatus === 'casado(a)') {
            generatedText += `
                <br><br> 
             Como <strong>FIADOR(a,es)   –${name}</strong>, ${nationality}, ${profession}, ${maritalStatus}, portador(a) da cédula de identidade RG sob nº ${rg}, inscrito(a) no CPF/MF de nº ${cpf}, filho(a) de ${filiation}, e-mail: ${email}, telefone: ${phone}, maior, nascido(a) em ${birthdate} conforme declarou, e sua cônjuge <strong>${spouseName}</strong>, ${spouseNationality}, ${spouseProfession}, portador(a) da cédula de identidade RG sob nº ${spouseRg}, inscrito(a) no CPF/MF de nº ${spouseCpf}, filho(a) de ${spouseFiliation}, e-mail: ${spouseEmail}, telefone: ${spousePhone}, maior, nascido(a) em ${spouseBirthdate} conforme declarou, casados no regime de ${spousemarriageregime}, em ${spousemarriagedate} (ANTES/APOS vigencia da Lei nº 6.515/77) com matrícula nº ${certificate}, expedida pelo ${registryOffice}, residentes e domiciliados na cidade de ${city}, Estado de ${state}, na ${street}, nº ${houseNumber}, ${neighborhood}, CEP: ${cep}.
            `;
        }
    
    } else {
        generatedText = `
            Papel: ${role}
            Nome: ${name}
            Nacionalidade: ${nationality}
            Profissão: ${profession}
            Estado Civil: ${maritalStatus}
            RG: ${rg}
            CPF: ${cpf}
            Filiação: ${filiation}
            E-mail: ${email}
            Telefone: ${phone}
            Data de Nascimento: ${birthdate}
            Casamento ou Nascimento: ${marriedborn}
            Certidão: ${certificate}
            Cartório: ${registryOffice}
            Cidade: ${city}
            Estado: ${state}
            Endereço: ${street}, Nº ${houseNumber}, Bairro: ${neighborhood}, CEP: ${cep}.
        `;
    }
    window.onload = function() {
        toggleSpouseFields(); // Inicializa a exibição dos campos do cônjuge com base no estado civil
    };

    // Exibe o texto gerado
    document.getElementById('output').innerHTML = generatedText;
}
// Gera o texto com animação
setTimeout(() => {
    output.textContent = textoGerado.trim();
    output.classList.add('fade-in-active'); // Adiciona a animação
}, 300); // Atraso antes de mostrar o texto
