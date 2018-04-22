FROM node:9-alpine

LABEL maintainer="Manuel Weidmann <manuel.weidmann@7p-group.com>"

RUN apk add --update --no-cache python

ADD package.json .
ADD package-lock.json .

RUN apk add --update make
RUN npm install

ADD static static/.
ADD gitlab.js .
ADD server.js .


EXPOSE 5000

ENTRYPOINT ["npm"]
CMD ["start"]

