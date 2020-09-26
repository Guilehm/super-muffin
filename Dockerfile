FROM node:12.18.4-alpine3.9
WORKDIR /
COPY . .
CMD [ "yarn" , "start"]
