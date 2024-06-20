FROM node:14 as build
WORKDIR /app
COPY package*.jsonn ./
RUN npm install
COPY . ./

EXPOSE 3000
RUN npm run build
RUN install -g serve
CMD ["serve", "-s", "build"]

