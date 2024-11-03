async function performOCR() {
    const fileInput = document.getElementById('pdfUpload');
    const outputDiv = document.getElementById('output');

    if (fileInput.files.length === 0) {
      alert("Por favor, selecione um arquivo PDF!");
      return;
    }

    outputDiv.innerHTML = "<p class='text-yellow-400'>Processando PDF, por favor aguarde...</p>";

    // Lê o PDF usando PDF.js
    const file = fileInput.files[0];
    const fileReader = new FileReader();

    fileReader.onload = async function() {
      const typedArray = new Uint8Array(this.result);
      const pdf = await pdfjsLib.getDocument(typedArray).promise;

      let extractedText = "";

      // Processa cada página do PDF
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: 2 });

        // Cria um canvas para renderizar a página como imagem
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: context, viewport: viewport }).promise;

        // Realiza OCR na imagem da página
        const result = await Tesseract.recognize(
          canvas,
          'por', // Idioma em português
          { logger: m => console.log(m) }
        );
        extractedText += `Página ${pageNum}:\n${result.data.text}\n\n`;
      }

      // Exibe o texto extraído
      outputDiv.innerHTML = `<h3 class='text-lg font-semibold mb-2'>Texto extraído do PDF:</h3><p>${extractedText}</p>`;
    };

    fileReader.readAsArrayBuffer(file);
  }

  // Função para copiar o texto extraído
  function copyText() {
    const outputDiv = document.getElementById('output');
    const text = outputDiv.innerText;

    if (text) {
      navigator.clipboard.writeText(text)
        .then(() => alert("Texto copiado para a área de transferência!"))
        .catch(err => alert("Erro ao copiar texto: " + err));
    } else {
      alert("Nenhum texto para copiar!");
    }
  }