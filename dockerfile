FROM node:20-alpine as react-build
WORKDIR /app
COPY . ./

RUN npm install

RUN npm run build

ARG REACT_APP_BASE_URL
ENV REACT_APP_BASE_URL=$REACT_APP_BASE_URL
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=http://localhost
FROM nginx:alpine

COPY nginxconf/main.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]