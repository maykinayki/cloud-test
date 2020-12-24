FROM node:14

LABEL "Maintainer"="maykinaykii@gmail.com"

ARG PORT

WORKDIR /usr/src/app

COPY . ./

RUN yarn install --frozen-lockfile --only=production
RUN yarn run build:prod

EXPOSE ${PORT}

ENTRYPOINT ["yarn", "start"]
