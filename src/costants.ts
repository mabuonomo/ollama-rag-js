import { v4 as uuidv4 } from 'uuid';

export const MODEL_DOCUMENTS = [
    "Llamas are members of the camelid family meaning they're pretty closely related to vicuñas and camels",
    'Llamas were first domesticated and used as pack animals 4,000 to 5,000 years ago in the Peruvian highlands',
    'Llamas can grow as much as 6 feet tall though the average llama between 5 feet 6 inches and 5 feet 9 inches tall',
    'Llamas weigh between 280 and 450 pounds and can carry 25 to 30 percent of their body weight',
    'Llamas are vegetarians and have very efficient digestive systems',
    'Llamas live to be about 20 years old, though some only live for 15 years and others live to be 30 years old',
];

export const OLLAMA_MODEL_EMBEDDING = process.env.OLLAMA_EMB_MODEL;
export const OLLAMA_MODEL = process.env.OLLAMA_MODEL; 
export const NAME_EMBEDDING_COLLECTION = `ollama-embeddings-${uuidv4()}`;
export const MAIN_PROMPT = 'What animals are llamas related to?';