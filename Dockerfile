FROM node:9-alpine

LABEL maintainer="Manuel Weidmann <manuel.weidmann@7p-group.com>"

EXPOSE 8000

ENTRYPOINT ["npm run"]

