This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Extract data with SPARQL queries

Look into `scripts/extractArtworks.ts` to see how to extract data from the supplied dataset with SPARQL queries. You must start apache jena fuseki first (on the default port 3030) and load the art dataset as `art`.

Execute the script like:

```
tsx scripts/extractArtworks.ts
```

This will put the output in `data/artworks.ts`.

## Run the website

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
