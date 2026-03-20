import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

class ResumeService {
  async extractTextFromPDF(buffer) {
    try {
      const pdf = await pdfjsLib.getDocument({
        data: new Uint8Array(buffer)
      }).promise;

      let text = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();

        const pageText = content.items.map(item => item.str).join(" ");
        text += pageText + "\n";
      }

      return text;

    } catch (error) {
      console.error("PDF PARSE ERROR:", error);
      throw new Error('Failed to parse PDF document.');
    }
  }
}

export default new ResumeService();