FROM node:12.18.4-alpine3.9
RUN apk --update add imagemagick graphicsmagick
WORKDIR /
COPY . .
CMD [ "yarn" , "start"]
