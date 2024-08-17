import { ChromaClient, OllamaEmbeddingFunction } from 'chromadb';
import { OLLAMA_MODEL_EMBEDDING, NAME_EMBEDDING_COLLECTION, OLLAMA_MODEL } from '../costants';
import { ChatResponse, Ollama, Tool } from 'ollama';
import { v4 as uuidv4 } from 'uuid';

const ollama = new Ollama({ host: process.env.OLLAMA_HOST_SIMPLE });
const clientChromaDB = new ChromaClient({
    path: process.env.CHROMADB_PATH,
});
const embedder = new OllamaEmbeddingFunction({
    url: `${process.env.OLLAMA_HOST}/api/embeddings`,
    model: OLLAMA_MODEL_EMBEDDING,
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

export async function initOllamaEmbedding(documents: string[]) {
    try {
        const collection = await clientChromaDB.createCollection({
            name: NAME_EMBEDDING_COLLECTION,
            embeddingFunction: embedder,
        });

        for (const document of documents) {
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

export async function getOllamaEmbeddingRetrieve(prompt: string, documents: string[]): Promise<string> {
    try {
        const listCollections = (await clientChromaDB.listCollections()).find(
            (x) => x.name === NAME_EMBEDDING_COLLECTION,
        );

        if (!listCollections) {
            await initOllamaEmbedding(documents);
        }

        const response = await ollama.embeddings({
            model: OLLAMA_MODEL_EMBEDDING,
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
