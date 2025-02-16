async function performOCR() {
    const fileInput = document.getElementById('pdfUpload');
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = ''; // Limpa o resultado anterior

    if (fileInput.files.length === 0) {
        outputDiv.innerHTML = '<p class="text-red-500 text-center">Por favor, envie pelo menos um arquivo PDF.</p>';
        return;
    }

    for (const file of fileInput.files) {
        const reader = new FileReader();

        reader.onload = async function() {
            const pdfData = new Uint8Array(reader.result);
            const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
            
            let fullText = '';
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 2.0 });
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                await page.render({ canvasContext: context, viewport: viewport }).promise;
                
                // OCR na imagem renderizada
                const { data: { text } } = await Tesseract.recognize(canvas, 'por');
                fullText += text + '\n';
            }

            // Extrai informações e adiciona ao resultado
            const fileResult = extractTransactions(fullText);
            outputDiv.innerHTML += `<div class="mt-6 p-4 bg-gray-700 rounded-lg shadow-inner">${fileResult}</div>`;
        };

        reader.readAsArrayBuffer(file);
    }
}

function extractTransactions(text) {
    const outputDiv = document.getElementById('output');
    let result = '';

    // Regex para procurar entradas e saídas com sinais de + e -
    const transactionPattern = /(\d{2}\/\d{2}\/\d{4})\s*([+-]?[\d\.,]+)\s*(CREDITADO|DEBITADO|TRANSFERÊNCIA|PAGAMENTO)/gi;

    // Procurando todas as transações
    let match;
    const transactions = [];

    while ((match = transactionPattern.exec(text)) !== null) {
        const date = match[1];
        let amount = match[2].replace(',', '.'); // Substitui vírgula por ponto
        amount = parseFloat(amount); // Converte para número
        const type = match[3].toUpperCase(); // Garante que o tipo está em maiúsculas para comparação

        // Identificar tipo de transação com base no sinal
        if (amount < 0 || type === 'DEBITADO' || type === 'PAGAMENTO') {
            transactions.push({ date, amount: Math.abs(amount), type: 'Saída' });
        } else if (amount > 0 || type === 'CREDITADO' || type === 'TRANSFERÊNCIA') {
            transactions.push({ date, amount: Math.abs(amount), type: 'Entrada' });
        }
    }

    // Organiza as transações por mês
    const groupedTransactions = groupByMonth(transactions);

    // Exibe o resultado
    for (const [month, transactions] of Object.entries(groupedTransactions)) {
        result += `<h2 class="text-lg font-bold mt-4">Transações de ${month}</h2>`;
        let totalEntrada = 0;
        let totalSaida = 0;
        transactions.forEach(transaction => {
            if (transaction.type === 'Entrada') {
                totalEntrada += transaction.amount;
            } else if (transaction.type === 'Saída') {
                totalSaida += transaction.amount;
            }
        });
        result += `<p><strong>Total Entrada:</strong> R$ ${totalEntrada.toFixed(2)}</p>`;
        result += `<p><strong>Total Saída:</strong> R$ ${totalSaida.toFixed(2)}</p>`;
    }

    if (!result) {
        result = '<p class="text-yellow-500">Não foi possível encontrar transações no documento.</p>';
    }

    return result;
}

function groupByMonth(transactions) {
    return transactions.reduce((acc, transaction) => {
        const month = transaction.date.substring(3, 7); // Ex: '01/2025' -> '01/2025'
        if (!acc[month]) {
            acc[month] = [];
        }
        acc[month].push(transaction);
        return acc;
    }, {});
}
