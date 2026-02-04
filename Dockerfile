FROM node:18-bullseye AS base
WORKDIR /app

FROM base AS backend
WORKDIR /app/backend
COPY backend/package.json backend/tsconfig.json ./
RUN npm install
COPY backend/src ./src
CMD ["npm", "run", "start:dev"]

FROM base AS frontend
WORKDIR /app/frontend
COPY frontend/package.json frontend/tsconfig.json frontend/vite.config.ts ./
COPY frontend/index.html ./index.html
RUN npm install
COPY frontend/src ./src
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
