FROM node:20-alpine as build

ARG ENVIRONMENT=production

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
RUN yarn install

COPY . ./
RUN yarn run build:${ENVIRONMENT}

FROM nginx:stable-alpine
COPy ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]