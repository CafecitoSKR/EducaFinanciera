FROM node:lts-alpine

#PARA EJECUTAR TODO EL BOUNDLE CONTEXT DE VUE JS
RUN npm install -g http-server 

RUN mkdir /app

WORKDIR /app

#Copiar todo los package.json y el ./ es para copiarlo en la carpeta app, el asetrisco es para los dos pacakge.json(osea el lock tambien)
COPY package*.json ./

#Va a regenerar la carpeta de node_modules
RUN npm install

#Copiar todo que es el primer punto hacia la carpeta todo(app)
COPY . .

#Construir toda la aplicación
RUN npm run build 

EXPOSE 8080

#esto se pone en el cmd para poder abrir el server, ya que al inicio se instaló
CMD [ "http-server", "dist" ]