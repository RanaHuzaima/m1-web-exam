# Backend API — used when Railway deploys from the repo root
FROM node:24-bookworm-slim

RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY backend/package.json backend/package-lock.json ./
RUN npm ci

COPY backend/ .
RUN npm run build

ENV PORT=3000
ENV DATABASE_PATH=/data/db.sqlite

EXPOSE 3000

CMD ["sh", "-c", "if [ ! -f \"$DATABASE_PATH\" ]; then node dist/database/seed.js; fi; node dist/main.js"]
