FROM node:14.15.1-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY ./package.json ./
COPY ./package-lock.json ./
COPY . .
RUN npm install --silent
RUN npm install -g react-scripts --silent

CMD ["npm", "start"]