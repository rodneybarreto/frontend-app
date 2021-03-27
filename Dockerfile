FROM node:14.16.0-alpine3.13
WORKDIR /opt/minipets/frontend
COPY . /opt/minipets/frontend
RUN npm install
EXPOSE 8080
CMD ["node","/opt/minipets/frontend/server.js"]
