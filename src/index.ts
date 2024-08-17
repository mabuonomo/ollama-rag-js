// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config();
import { getOllamaEmbeddingRetrieve, getOllamaHumanResponse } from './utils/util.ollama';

async function startRAGBot(prompt: string) {
    const q = prompt.trim();

    return await getOllamaHumanResponse(q, await getOllamaEmbeddingRetrieve(q));
}

const MAIN_PROMPT = 'What animals are llamas related to?';

startRAGBot(MAIN_PROMPT).then((response) => {
    console.log('Prompt', MAIN_PROMPT);
    console.log('Response', response);
});
