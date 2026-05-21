# FURY - Desafio Técnico Full Stack Pleno

Esta é uma mini-API em Node.js feita por Carlos Willian de Balneario Camboriú. Feita em 21/05/2026 com TypeScript que simula o processamento de violações de anúncios utilizando BullMQ para o enfileiramento de jobs (takedowns) e validação de payload através do Zod.

## Requisitos
- [Node.js](https://nodejs.org/en/) (versão 18 ou superior recomendada)
- [Docker](https://www.docker.com/) e Docker Compose (para rodar o Redis localmente)

## Configuração

1. Clone o repositório ou acesse a pasta do projeto.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Suba o container do Redis utilizando o Docker Compose:
   ```bash
   docker-compose up -d
   ```
   (O Redis rodará na porta padrão `6379`)

4. (Opcional) Crie ou edite o arquivo `.env` na raiz do projeto, caso precise customizar portas:
   ```env
   PORT=3000
   REDIS_HOST=localhost
   REDIS_PORT=6379
   ```

## Como Rodar o Projeto

### Ambiente de Desenvolvimento
Para rodar a API em modo de desenvolvimento (com hot-reload):
```bash
npm run dev
```

### Ambiente de Produção
Para compilar e rodar a versão final:
```bash
npm run build
npm start
```

## Endpoints

### 1. Webhook de Violação
Recebe uma notificação de anúncio com violação, valida e enfileira um job.

- **URL:** `POST /webhook/violation`
- **Body:**
  ```json
  {
    "adId": "12345",
    "tenantId": "tenant-xyz",
    "violationType": "PROHIBITED_TERM",
    "severity": "HIGH",
    "detectedAt": "2023-10-01T12:00:00Z"
  }
  ```

*A API valida os tipos e obrigatoriedade através do Zod. Violações para o mesmo `adId` e `tenantId` são idempotentes (não enfileiram um job novo se já existir um com a mesma chave).*

### 2. Status do Job
Retorna o status atual do job na fila.

- **URL:** `GET /jobs/:id`
- **Exemplo:** `GET /jobs/takedown-tenant-xyz-12345`

*Retorna o jobId, o status atual, o número de tentativas de processamento (para casos de erro HTTP externo com retries exponenciais), resultado e erros.*

## Detalhes de Implementação
- **Idempotência**: Implementada determinando o `jobId` no BullMQ com o padrão `takedown-{tenantId}-{adId}`.
- **Retries**: BullMQ configurado com 3 tentativas e backoff exponencial em caso de falha da chamada HTTP simulada para a Meta API.
- **Tipagem**: Código escrito de forma estrita em TypeScript, sem o uso de `any`.
