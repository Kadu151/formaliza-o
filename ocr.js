/**
 * Realiza OCR em um PDF carregado pelo usuário e exibe o texto extraído.
 * A função utiliza PDF.js para renderizar cada página do PDF como imagem,
 * e Tesseract.js para reconhecer texto na imagem renderizada.
 */
async function performOCR() {
  // Seleciona os elementos de upload e exibição de saída
  const fileInput = document.getElementById('pdfUpload');
  const outputDiv = document.getElementById('output');

  // Verifica se o usuário selecionou um arquivo PDF
  if (fileInput.files.length === 0) {
    alert("Por favor, selecione um arquivo PDF!");
    return;
  }

  // Exibe mensagem de processamento enquanto o OCR é executado
  outputDiv.innerHTML = "<p class='text-yellow-400'>Processando PDF, por favor aguarde...</p>";

  // Obtém o arquivo selecionado pelo usuário
  const file = fileInput.files[0];
  const fileReader = new FileReader();

  // Função chamada quando o arquivo PDF é carregado
  fileReader.onload = async function() {
    // Converte o arquivo PDF para um array de bytes para ser usado pelo PDF.js
    const typedArray = new Uint8Array(this.result);
    const pdf = await pdfjsLib.getDocument(typedArray).promise;

    // Variável para armazenar o texto extraído de todas as páginas
    let extractedText = "";

    // Itera sobre cada página do PDF
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: 2 }); // Aumenta a escala para melhorar a precisão do OCR

      // Cria um canvas para renderizar a imagem da página
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      // Renderiza a página do PDF no canvas
      await page.render({ canvasContext: context, viewport: viewport }).promise;

      // Realiza OCR na imagem renderizada da página usando Tesseract.js
      const result = await Tesseract.recognize(
        canvas,
        'por', // Define o idioma do OCR como português
        { logger: m => console.log(m) } // Exibe progresso no console
      );

      // Adiciona o texto da página extraída ao texto completo
      extractedText += `Página ${pageNum}:\n${result.data.text}\n\n`;
    }

    // Exibe o texto extraído do PDF no elemento de saída
    outputDiv.innerHTML = `<h3 class='text-lg font-semibold mb-2'>Texto extraído do PDF:</h3><p>${extractedText}</p>`;
  };

  // Lê o arquivo PDF como um array de bytes
  fileReader.readAsArrayBuffer(file);
}

/**
* Copia o texto extraído do PDF, que está atualmente exibido na página, para a área de transferência do usuário.
*/
function copyText() {
  const outputDiv = document.getElementById('output');
  const text = outputDiv.innerText;

  // Verifica se há texto para copiar
  if (text) {
    // Copia o texto para a área de transferência
    navigator.clipboard.writeText(text)
      .then(() => alert("Texto copiado para a área de transferência!"))
      .catch(err => alert("Erro ao copiar texto: " + err));
  } else {
    alert("Nenhum texto para copiar!");
  }
}
