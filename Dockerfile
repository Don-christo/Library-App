FROM node:16-alpine
WORKDIR /mylib
COPY package.json /mylib
RUN yarn install
COPY . /mylib
EXPOSE 3000
CMD [ "yarn", "dev" ]