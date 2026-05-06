# @brekhov-i/pachca-mcp

MCP-сервер для работы с [Pachca](https://www.pachca.com/) через [@pachca/sdk](https://www.npmjs.com/package/@pachca/sdk). Подключается к Claude Desktop, Claude Code, Codex CLI и любому другому клиенту с поддержкой [Model Context Protocol](https://modelcontextprotocol.io/) по stdio.

Покрытие — **только чтение и создание**: tools из этого пакета не умеют изменять или удалять сущности в Pachca.

## Возможности

18 MCP tools для агента:

### Чаты
- `chat-list` — список чатов с фильтрами и пагинацией
- `chat-get` — чат по идентификатору
- `chat-create` — создание чата или канала
- `chat-members-list` — список участников чата
- `chat-members-add` — добавить участников в чат

### Сообщения
- `message-list` — сообщения чата
- `message-get` — сообщение по идентификатору
- `message-send-chat` — отправка сообщения в чат / канал
- `message-send-personal` — личное сообщение пользователю

### Реакции
- `reaction-list` — реакции на сообщение

### Пользователи
- `user-list` — список пользователей
- `user-get` — пользователь по идентификатору
- `user-profile-get` — профиль текущего бота / пользователя
- `user-create` — создать нового пользователя

### Треды
- `thread-get` — тред по идентификатору
- `thread-create` — создать тред у сообщения

### Поиск
- `chat-search` — поиск чатов
- `user-search` — поиск пользователей
- `message-search` — поиск сообщений

### Изображения
- `message-images-list` — список изображений в сообщении
- `message-image-get` — получить изображение из сообщения как MCP image content (base64)

## Требования

- Node.js ≥ 20
- Токен бота Pachca (получить в Pachca → Настройки → Боты)

## Установка

Глобально не нужно ставить — Claude / Codex запустят сервер через `npx`. Если хочется поставить вручную:

```bash
npm i -g @brekhov-i/pachca-mcp
# или одноразово
npx -y @brekhov-i/pachca-mcp
```

## Переменные окружения

| Переменная | Обязательна | По умолчанию | Описание |
|---|---|---|---|
| `TOKEN` | да | — | Bearer-токен бота Pachca |
| `PACHCA_API_URL` | нет | URL Pachca SDK по умолчанию | Кастомный baseUrl, если у вас self-hosted/staging |
| `PACHCA_IMAGE_MAX_BYTES` | нет | `5000000` | Максимальный размер картинки, которую сервер вернёт инлайном |
| `PACHCA_IMAGE_FETCH_TIMEOUT_MS` | нет | `10000` | Таймаут на скачивание картинки |

Токен в логи и ответы tool'ов не попадает: `mcpResponse` редактирует `Authorization`/`Bearer ...` перед отправкой.

## Подключение к клиентам

### Claude Code (`.mcp.json` в корне проекта)

В репозитории есть готовый `.mcp.json.example` — скопируйте и заполните токен:

```bash
cp .mcp.json.example .mcp.json
# отредактируйте TOKEN
```

Содержимое:

```json
{
  "mcpServers": {
    "pachca": {
      "command": "npx",
      "args": ["-y", "@brekhov-i/pachca-mcp"],
      "env": {
        "TOKEN": "<your-pachca-bot-token>"
      }
    }
  }
}
```

`.mcp.json` уже включён в `.gitignore`, чтобы токен не уехал в репозиторий.

### Claude Desktop

`~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) или `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

```json
{
  "mcpServers": {
    "pachca": {
      "command": "npx",
      "args": ["-y", "@brekhov-i/pachca-mcp"],
      "env": {
        "TOKEN": "<your-pachca-bot-token>"
      }
    }
  }
}
```

После сохранения перезапустите Claude Desktop.

### Codex CLI

`~/.codex/config.toml`:

```toml
[mcp_servers.pachca]
command = "npx"
args = ["-y", "@brekhov-i/pachca-mcp"]

[mcp_servers.pachca.env]
TOKEN = "<your-pachca-bot-token>"
```

## Локальная разработка

```bash
yarn install
TOKEN=xxx yarn dev          # tsx src/index.ts
yarn typecheck               # tsc --noEmit
yarn build                   # tsc + chmod +x dist/index.js
TOKEN=xxx yarn start         # node dist/index.js
```

Структура `src/tools/` — каждая категория отдельная папка, каждый tool отдельный файл:

```
src/tools/
├── chats/        chat-list, chat-get, chat-create, chat-members-list, chat-members-add
├── messages/     message-list, message-get, message-send-chat, message-send-personal
├── reactions/    reaction-list
├── search/       chat-search, user-search, message-search
├── users/        user-list, user-get, user-profile-get, user-create
├── threads/      thread-get, thread-create
├── images/       message-images-list, message-image-get (+ image-utils.ts)
└── common.ts     общие zod-схемы и safeTool wrapper
```

## Публикация

`prepublishOnly` запускает `yarn build`. В пакет (`files`) попадают только `dist/`, `README.md`, `LICENSE`.

```bash
npm publish --access public
```

## Лицензия

[MIT](./LICENSE) © Ilya Brekhov
