# Ollama RAG NodeJS - fully dockerized -

## 🔥 Overview

This is a simple example of how to use the Ollama RAG (retrieval augmented generation) using Ollama embeddings with nodejs, typescript, docker and [chromadb](https://docs.trychroma.com/).
It's a nodejs version of the [Ollama RAG example](https://ollama.com/blog/embedding-models) provided by Ollama.

## 🔨 Running the application

To run the application, you need to have docker installed on your machine. If you don't have docker installed, you can download it from [here](https://docs.docker.com/get-docker/).

After you have docker installed, you can run the following command to install the required packages and models:

```bash
make setup # Setup the application
make ollama_pull # Pull the models
```

After the models are pulled and packages are installated, you can run the application with the following command:

```bash
make run # execute the application
```

Output:

```bash
Prompt: What animals are llamas related to?
Response: {
  model: 'llama3.2',
  created_at: '2024-10-06T13:30:47.825643583Z',
  message: {
    role: 'assistant',
    content: 'Based on the information provided, it is stated that llamas are part of the camelid family. This means they share a close genetic relationship with other animals within this family. Specifically, llamas are closely related to:\n' +
      '\n' +
      '1. Vicuñas\n' +
      '2. Camels (although not as closely related to domesticated camels)'
  },
  done_reason: 'stop',
  done: true,
  total_duration: 7936475467,
  load_duration: 36586649,
  prompt_eval_count: 66,
  prompt_eval_duration: 136286000,
  eval_count: 67,
  eval_duration: 7720279000
```

## 🔭 References

* <https://ollama.com/blog/embedding-models>
* <https://docs.trychroma.com/integrations/ollama>
* <https://cookbook.chromadb.dev/integrations/ollama/embeddings/#javascript>
* <https://cookbook.chromadb.dev/integrations/ollama/> (coming soon at the time of writing)
