FROM node:20-alpine AS react-build
WORKDIR /app

COPY . ./

ARG REACT_APP_BASE_URL
ENV REACT_APP_BASE_URL=$REACT_APP_BASE_URL

RUN npm install
RUN npm run build

FROM nginx:alpine
COPY nginxconf/main.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
