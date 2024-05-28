# Etapa 1: Builder con Node.js
FROM node:14 AS builder

# Establecer el directorio de trabajo en la carpeta de la aplicación
WORKDIR /app

# Copiar los archivos de configuración del frontend
COPY package.json .
COPY package-lock.json .

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos del frontend
COPY . .

# Compilar la aplicación
RUN npm run build

# Etapa 2: Servidor NGINX para servir la aplicación compilada
FROM nginx:1.19.0

run rm -rf ./*
# Copiar los archivos compilados de la etapa anterior al directorio de NGINX
COPY --from=builder /app/build .

# Exponer el puerto 80 para que NGINX pueda servir la aplicación
EXPOSE 80

# Comando para iniciar NGINX
entrypoint ["nginx", "-g", "daemon off;"]
