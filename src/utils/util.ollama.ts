import { ChatResponse, Ollama, Tool } from 'ollama';

import { v4 as uuidv4 } from 'uuid';
import { ChromaClient } from 'chromadb';
import { OllamaEmbeddingFunction } from 'chromadb';

const MODEL_EMBEDDING = 'mxbai-embed-large'; // 'nomic-embed-text';
const OLLAMA_MODEL = 'llama3.1';
const NAME_EMBEDDING_COLLECTION = `ollama-embeddings-${uuidv4()}`;

export const MODEL_DOCUMENTS = [
    "Llamas are members of the camelid family meaning they're pretty closely related to vicuñas and camels",
    'Llamas were first domesticated and used as pack animals 4,000 to 5,000 years ago in the Peruvian highlands',
    'Llamas can grow as much as 6 feet tall though the average llama between 5 feet 6 inches and 5 feet 9 inches tall',
    'Llamas weigh between 280 and 450 pounds and can carry 25 to 30 percent of their body weight',
    'Llamas are vegetarians and have very efficient digestive systems',
    'Llamas live to be about 20 years old, though some only live for 15 years and others live to be 30 years old',
];

const ollama = new Ollama({ host: process.env.OLLAMA_HOST_SIMPLE });
const clientChromaDB = new ChromaClient({
    path: process.env.CHROMADB_PATH,
});
const embedder = new OllamaEmbeddingFunction({
    url: `${process.env.OLLAMA_HOST}/api/embeddings`,
    model: MODEL_EMBEDDING,
});

function generatePrompt(prompt: string, data: string | number[]) {
    return `Using this data: ${data}. Respond to this prompt: ${prompt}`;
}

export const getOllamaChatResponse = async (
    model: string,
    messages: { role: string; content: string }[],
    tools: Tool[],
) => {
    const response = await ollama.chat({
        model,
        messages,
        stream: false,
        tools,
    });

    return response;
};

export async function initOllamaEmbedding() {
    try {
        const collection = await clientChromaDB.createCollection({
            name: NAME_EMBEDDING_COLLECTION,
            embeddingFunction: embedder,
        });

        for (const document of MODEL_DOCUMENTS) {
            const uniqueId = uuidv4();
            collection.add({
                ids: [uniqueId],
                documents: [document],
                metadatas: [{ name: document }],
            });
        }
    } catch (e) {
        console.log(e);
    }
}

export async function getOllamaEmbeddingRetrieve(prompt: string): Promise<string> {
    try {
        const listCollections = (await clientChromaDB.listCollections()).find(
            (x) => x.name === NAME_EMBEDDING_COLLECTION,
        );

        if (!listCollections) {
            await initOllamaEmbedding();
        }

        const response = await ollama.embeddings({
            model: MODEL_EMBEDDING,
            prompt,
        });

        const collection = await clientChromaDB.getCollection({ name: NAME_EMBEDDING_COLLECTION });

        const results = await collection.query({
            queryEmbeddings: [response.embedding],
            nResults: 1,
        });

        return results.documents[0][0];
    } catch (e) {
        console.log(e);
    }
    return '';
}

export async function getOllamaHumanResponse(originalQuestion: string, embeddings: string): Promise<ChatResponse> {
    try {
        const question = generatePrompt(originalQuestion, embeddings);
        const response = await getOllamaChatResponse(
            OLLAMA_MODEL,
            [
                {
                    role: 'user',
                    content: question,
                },
            ],
            [],
        );

        return response;
    } catch (e) {
        console.log(e);
    }
}
