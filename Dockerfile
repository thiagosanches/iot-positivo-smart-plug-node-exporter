FROM node:16-alpine
ENV NODE_ENV=production

WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
COPY index.js .
RUN npm install --production
CMD [ "node", "index.js" ]

