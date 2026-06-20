# 🚀 Uptime Monitor API

Uma API robusta para monitoramento de disponibilidade (uptime) de serviços web. Esta aplicação permite cadastrar URLs, configurar intervalos de checagem e receber notificações caso o serviço fique offline.

---

## 🛠️ Tecnologias

- **Node.js** & **TypeScript**
- **Express** (Framework Web)
- **BullMQ** (Processamento de filas/background jobs)
- **PostgreSQL** (Banco de dados)
- **Vitest** (Testes unitários e de integração)
- **Swagger** (Documentação da API)
- **Docker** (Containerização)

---

## 📋 Roadmap & Implementações

Aqui está o controle do que já foi feito e o que ainda precisa ser implementado.

### 🔍 Monitoramento (CRUD)
- [x] **Deve** permitir criar um monitor com URL, nome e intervalo de checagem.
- [x] **Deve** ser possível listar todos os monitores cadastrados.
- [x] **Deve** ser possível buscar detalhes de um monitor específico por ID.
- [x] **Deve** permitir atualizar os dados de um monitor.
- [x] **Deve** permitir excluir um monitor.
- [x] **Não deve** permitir cadastrar dois monitores com a mesma URL.
- [ ] **Deve** validar se a URL informada é válida antes de salvar.

### ⚡ Sistema de Ping (Verificação)
- [ ] **Deve** realizar uma requisição HTTP para a URL do monitor.
- [ ] **Deve** registrar o status code, tempo de resposta e timestamp de cada ping.
- [ ] **Deve** identificar falhas (status >= 400 ou timeout).
- [ ] **Não deve** considerar falha caso o erro seja temporário (implementar retry).

### ⏳ Agendamento (Jobs)
- [ ] **Deve** integrar com Redis/BullMQ para gerenciar as filas de monitoramento.
- [ ] **Deve** criar um job recorrente baseado no intervalo de cada monitor.
- [ ] **Deve** processar os pings de forma assíncrona para não travar a API.

### 🔔 Notificações
- [ ] **Deve** notificar via E-mail quando um serviço cair.
- [ ] **Deve** notificar via Discord/Slack (Webhook).
- [ ] **Deve** enviar um alerta de "Recuperado" quando o serviço voltar ao ar.

### ⚙️ Infraestrutura & Qualidade
- [x] Configuração inicial do projeto com TS e Express.
- [x] Implementação de Rate Limiting para evitar abusos.
- [x] Setup de testes com Vitest.
- [x] Dockerização do banco de dados PostgreSQL.
- [ ] Dockerização completa da aplicação (App + Redis + Postgres).
- [ ] Finalizar documentação Swagger com todos os endpoints.

---

## 🚀 Como Executar

### Pré-requisitos
- Node.js (v24+)
- Docker e Docker Compose
- Yarn

### Passo a Passo

1.  **Clonar o repositório:**
    ```bash
    git clone https://github.com/gurtinho/uptime-monitor-api.git
    cd uptime-monitor-api
    ```

2.  **Configurar variáveis de ambiente:**
    ```bash
    cp .env.example .env
    # Preencha os valores no .env
    ```

3.  **Subir o banco de dados:**
    ```bash
    docker-compose up -d
    ```

4.  **Instalar dependências:**
    ```bash
    yarn install
    ```

5.  **Executar em modo desenvolvimento:**
    ```bash
    yarn dev
    ```

---

## 🧪 Testes

```bash
# Rodar todos os testes
yarn test

# Ver cobertura de testes
yarn test:coverage
```

---

## 📜 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
