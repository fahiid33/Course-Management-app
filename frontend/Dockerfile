FROM node:18.20.4 as build

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@8.19.4

RUN npm cache clean --force
RUN npm install --legacy-peer-deps

RUN npm rebuild node-sass

COPY . .

RUN npm run build

FROM node:18.20.4-alpine

WORKDIR /app

COPY --from=build /app/build ./build

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]