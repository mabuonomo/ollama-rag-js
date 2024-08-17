## Ollama RAG JS/TS (fully dockerized)

# Overview
This is a simple example of how to use the Ollama RAG (retrieval augmented generation). The application is fully dockerized and can be run with a single command.
It's a nodejs version of the [Ollama RAG example](https://ollama.com/blog/embedding-models) provided by Ollama.

# Running the application
To run the application, you need to have docker installed on your machine. If you don't have docker installed, you can download it from [here](https://docs.docker.com/get-docker/).

After you have docker installed, you can run the following command to start the application:
```bash
make ollama_pull # Pull the models
make ollama_run # execute the application
```

Output:

```bash
Prompt: What animals are llamas related to?
Response: {
  model: 'llama3.1',
  created_at: '2024-08-17T15:32:02.714335253Z',
  message: {
    role: 'assistant',
    content: 'According to the given information, llamas are related to:\n' +
      '\n' +
      '1. Vicuñas\n' +
      '2. Camels\n' +
      '\n' +
      'This is because they all belong to the camelid family!'
  },
  done_reason: 'stop',
  done: true,
  total_duration: 14586886161,
  load_duration: 2862500495,
  prompt_eval_count: 52,
  prompt_eval_duration: 1728781000,
  eval_count: 36,
  eval_duration: 9994385000
}
```

# References
* https://ollama.com/blog/embedding-models
* https://docs.trychroma.com/integrations/ollama
* https://cookbook.chromadb.dev/integrations/ollama/embeddings/#golang
* https://cookbook.chromadb.dev/integrations/ollama/ (coming soon at the time of writing)
