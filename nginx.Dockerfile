# Etapa de construcción del frontend
FROM node:lts-alpine as build

WORKDIR /app

# Copia los archivos package.json y package-lock.json
COPY FrontEducaFinanciera/package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY FrontEducaFinanciera/ .

# Construye la aplicación para producción
RUN npm run build

# Usa una imagen base de Nginx para servir el contenido estático
FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
