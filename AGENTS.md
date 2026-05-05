# Agent Instructions

## Project Overview
- This repository is a TypeScript MCP server for Pachca, implemented as an ESM Node.js package.
- Source code lives in `src/`; the entry point is `src/index.ts`.
- The server communicates over stdio using `@modelcontextprotocol/server`.
- Pachca API access is handled through `@pachca/sdk`.

## Development Guidelines
- Keep changes small, focused, and consistent with the existing TypeScript style.
- Prefer explicit schemas with `zod/v4` for all MCP tool inputs.
- Do not log secrets or expose `TOKEN` values in errors, output, tests, or documentation.
- Keep MCP tool names stable unless the user explicitly asks for a breaking change.
- Avoid unrelated refactors when implementing or fixing a specific MCP tool.

## Commands
- Install dependencies with `yarn install`.
- Run TypeScript checks with `yarn tsc --noEmit` if TypeScript is available.
- There is currently no real test suite; `yarn test` is a placeholder that exits with an error.

## Environment
- The Pachca SDK expects a token from the `TOKEN` environment variable.
- Treat `.env` as local/private configuration; do not commit or print its contents.

## Validation
- For code changes, prefer at least a TypeScript compile check.
- If adding MCP tools, manually verify the tool input schema and returned shape against the Pachca SDK method being called.

