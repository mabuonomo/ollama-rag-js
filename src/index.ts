// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config();
import { MODEL_DOCUMENTS, MAIN_PROMPT } from './costants';
import { getOllamaEmbeddingRetrieve, getOllamaHumanResponse } from './utils/util.ollama';

async function startRAGBot(prompt: string) {
    const q = prompt.trim();

    return await getOllamaHumanResponse(q, await getOllamaEmbeddingRetrieve(q, MODEL_DOCUMENTS));
}

startRAGBot(MAIN_PROMPT).then((response) => {
    console.log('Prompt:', MAIN_PROMPT);
    console.log('Response:', response);
});
