FROM node:14-alpine as build-stage

WORKDIR /usr/src/apps
COPY ./package.json ./
RUN npm install serve concurrently -g

COPY . .
RUN npm run setup && npm run build


FROM node:14-alpine
WORKDIR /usr/src/app
COPY --from=build-stage /usr/src/apps/todo_json_server/ /usr/src/app
COPY --from=build-stage /usr/src/apps/builds/ /usr/src/app/public
RUN npm install

CMD ["npm","start"]