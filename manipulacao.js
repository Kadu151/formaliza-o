document.addEventListener("DOMContentLoaded", () => {
    const fileInputsContainer = document.getElementById("fileInputs");
    const sectionSelect = document.getElementById("sectionSelect");
  
    const sections = {
      vendedor: [
        "PDF 1: Documento de Identidade do Vendedor",
        "PDF 2: Certidão da Receita",
        "PDF 3: Cndt",
        "PDF 4: Certidão de nascimento/casamento",
        "PDF 5: Adicionais",
      ],
      imovel: [
        "PDF 1: Matricula do Imóvel",
        "PDF 2: IPTU ou Certidão de valor venal",
        "PDF 3: Certidão negativa",
        "PDF 4: Ata do condomínio",
        "PDF 5: Declaração do síndico",
        "PDF 6: Adicionais",
      ],
      consorciado: [
        "PDF 1: Documento de Identidade do consorciado",
        "PDF 2: Certidão da Receita",
        "PDF 3: Cndt",
        "PDF 4: Certidão de nascimento/casamento",
        "PDF 5: Adicionais",
      ],
    };
  
    sectionSelect.addEventListener("change", (event) => {
      const selectedSection = event.target.value;
      fileInputsContainer.innerHTML = ""; // Limpa os campos anteriores
  
      if (sections[selectedSection]) {
        sections[selectedSection].forEach((docLabel, index) => {
          const card = document.createElement("div");
          card.className = "bg-gray-700 p-4 rounded-lg shadow-md mb-4";
          card.innerHTML = `
            <label for="pdfFiles${index + 1}" class="block text-lg font-semibold mb-2">${docLabel}</label>
            <input type="file" id="pdfFiles${index + 1}" class="block w-full text-gray-900 bg-gray-200 rounded-lg p-2" accept="application/pdf">
          `;
          fileInputsContainer.appendChild(card);
        });
      }
    });
  
    document.getElementById("mergeBtn").addEventListener("click", async () => {
      const pdfDocs = [];
      const fileInputs = fileInputsContainer.querySelectorAll('input[type="file"]');
  
      for (const fileInput of fileInputs) {
        const files = fileInput.files;
        if (files.length === 0) {
          continue; // Ignora se não há arquivos selecionados neste campo
        }
  
        for (const file of files) {
          if (file.type !== "application/pdf") {
            alert(`O arquivo ${file.name} não é um PDF válido.`);
            continue; // Ignora arquivos que não são PDFs
          }
          const arrayBuffer = await file.arrayBuffer();
          const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
          pdfDocs.push(pdfDoc);
        }
      }
  
      if (pdfDocs.length === 0) {
        alert("Por favor, selecione pelo menos um arquivo PDF.");
        return;
      }
  
      try {
        const mergedPdf = await PDFLib.PDFDocument.create();
        for (const pdfDoc of pdfDocs) {
          const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
          copiedPages.forEach((page) => mergedPdf.addPage(page));
        }
  
        const pdfBytes = await mergedPdf.save();
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const downloadLink = document.getElementById("downloadLink");
  
        downloadLink.href = url;
        downloadLink.download = "merged.pdf";
        downloadLink.classList.remove("hidden");
        downloadLink.textContent = "Baixar PDF Mesclado";
      } catch (error) {
        console.error("Erro ao mesclar PDFs:", error);
        alert("Ocorreu um erro ao mesclar os arquivos. Verifique o console para mais detalhes.");
      }
    });
  });
  // Seleciona os elementos
  const mergeBtn = document.getElementById('mergeBtn');
  const downloadLink = document.getElementById('downloadLink');

  // Exibe o link de download quando o botão "Juntar PDF" é clicado
  mergeBtn.addEventListener('click', function() {
    downloadLink.style.display = 'inline';
  });

  // Oculta o link de download após o clique no próprio link
  downloadLink.addEventListener('click', function() {
    downloadLink.style.display = 'none';
  });
  
