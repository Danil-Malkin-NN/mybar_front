FROM node:17-alpine as react-build
WORKDIR /app
COPY . ./
RUN npm run build

ARG REACT_APP_BASE_URL

RUN yarn build REACT_APP_BASE_URL=$REACT_APP_BASE_URL

FROM nginx:alpine

COPY nginxconf/main.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]