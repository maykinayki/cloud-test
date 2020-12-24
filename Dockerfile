FROM node:15

LABEL "Maintainer"="maykinaykii@gmail.com"

ARG PORT

WORKDIR /usr/src/app

COPY . ./

RUN yarn install --frozen-lockfile
RUN yarn run build:prod
RUN yarn run build:dev

EXPOSE ${PORT}

ENTRYPOINT ["yarn", "start"]
