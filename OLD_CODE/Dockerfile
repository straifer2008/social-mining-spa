# first stage builds vue 
FROM mhart/alpine-node:14 as build-stage
WORKDIR /app
COPY . .
RUN npm i 
RUN npm run build 

# second stage copies only the static dist files to nginx html dir
FROM nginx:stable-alpine as production-stage
#VOLUME /var/log/nginx
#COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY --from=build-stage /app/docker/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
