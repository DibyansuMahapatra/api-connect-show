# ---------------------------
# Stage 1: Dependencies
# ---------------------------
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

# ---------------------------
# Stage 2: Development Runtime
# ---------------------------
FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]