# Triply

Triply is a Next.js application for browsing travel trips.

The app includes a trips list, table and card views, filtering, sorting, trip details pages, and client-side data caching with TanStack Query.

The project uses a local mock API powered by `json-server`.

## Tech stack

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- TanStack Query
- json-server

## Requirements

- Node.js 18+
- npm

## Installation

```bash
npm install
```

## Running the app

To run the project locally, start both the mock API server and the Next.js development server.

Open the first terminal and start the mock API:

```bash
npm run mock
```

The mock API will run at:

```txt
http://localhost:3001
```

Then open a second terminal and start the Next.js app:

```bash
npm run dev
```

The app will be available at:

```txt
http://localhost:3000
```

## Notes

The mock API must be running while using the app. If trips are not loading, make sure `npm run mock` is running in a separate terminal.
