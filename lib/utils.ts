export function formatContent(text: string): string {
  const sentences = text.match(/[^.!?]+[.!?]+["'\u2019]?\s*|[^.!?]+$/g) || [text];
  const paragraphs: string[] = [];
  let currentPara: string[] = [];
  let sentenceCount = 0;
  const targetSentences = 5;

  for (let i = 0; i < sentences.length; i++) {
    const sentence = sentences[i].trim();
    if (!sentence) continue;
    currentPara.push(sentence);
    sentenceCount++;

    if (sentenceCount >= targetSentences || i === sentences.length - 1) {
      paragraphs.push(currentPara.join(' '));
      currentPara = [];
      sentenceCount = 0;
    }
  }

  if (currentPara.length > 0) {
    paragraphs.push(currentPara.join(' '));
  }

  return paragraphs.map((p) => '<p>' + escapeHtml(p) + '</p>').join('');
}

export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

export function getImageIndex(readingIndex: number, totalImages: number): number | null {
  const imageIdx = readingIndex + 1;
  if (imageIdx <= totalImages) return imageIdx;
  return null;
}

export interface Reading {
  title: string;
  author: string;
  content: string;
}
