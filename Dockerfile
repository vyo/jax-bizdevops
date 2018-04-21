FROM node:9-alpine

LABEL maintainer="Manuel Weidmann <manuel.weidmann@7p-group.com>"

RUN apk add --update --no-cache python

ADD package.json .
ADD package-lock.json .

RUN npm install

ADD static .
ADD gitlab.js .
ADD server.js .


EXPOSE 8000

ENTRYPOINT ["npm"]
CMD ["start"]

