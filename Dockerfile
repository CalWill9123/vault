FROM node:22-slim AS build
WORKDIR /app
COPY frontend/package*.json frontend/
RUN cd frontend && npm install
COPY frontend/ frontend/
RUN cd frontend && npm run build

FROM node:22-slim
WORKDIR /app
COPY backend/package*.json backend/
RUN cd backend && npm install --omit=dev
COPY backend/ backend/
COPY --from=build /app/frontend/dist /app/frontend/dist
WORKDIR /app/backend
EXPOSE 3001
CMD ["node", "index.js"]
