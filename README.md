# Quick Search

This tools allows the user to quickly search or redirect to a website using bangs. Inspired by DuckDuckGo, this is a local implementation of that logic. This makes it really fast.

## Usage

1. Add https://search.arnavbharti.com/?s=%s as your default search engine.
2. Enter your search query in the search bar with your desired bang.

## Local Setup

1. Clone the GitHub repository.
2. This project was made using Bun. For best compatibility use [Bun](https://bun.sh/).
3. Install dependencies using `bun install`.
4. Filter the bangs using the script in `scripts/filter_bangs.ts`.
5. Run the development server using `bun run dev`.
6. If you want to use this local development server as your search replace search.arnavbharti.com with `<protocol>://<host>:<port>` e.g. `http://localhost:5173`.
