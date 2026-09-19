FROM node:24-alpine3.22 AS build

WORKDIR /app

COPY package.json package*.json  ./

RUN npm ci

COPY . .

RUN npm run build
RUN npm prune --omit=dev

FROM node:24-alpine3.22 AS prod

WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

EXPOSE 3000

CMD ["npm", "run", "start"]