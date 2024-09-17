FROM oven/bun:1 AS build

WORKDIR /

# Cache packages
COPY package.json package.json
COPY bun.lockb bun.lockb

# COPY /apps/server/package.json ./apps/server/package.json
# COPY /packages/config/package.json ./packages/config/package.json

RUN bun install

# COPY /apps/server ./apps/server
# COPY /packages/config ./packages/config

ENV NODE_ENV=production

RUN bun build ./index.ts --target bun


FROM gcr.io/distroless/base

WORKDIR /app

COPY --from=build server server

ENV NODE_ENV=production

CMD ["./server"]

EXPOSE 3000