DOCKER_EXEC:= docker compose exec rag_dev

__start:
	docker compose pull
	docker compose up -d --remove-orphans

sh: __start
	${DOCKER_EXEC} zsh

setup: __start
	${DOCKER_EXEC} npm install

ollama_pull: __start
	docker exec -it rag_ollama ollama pull llama3.1
	docker exec -it rag_ollama ollama pull mxbai-embed-large

run: __start
	${DOCKER_EXEC} ts-node src/index.ts