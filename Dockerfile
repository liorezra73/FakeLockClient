FROM node:alpine
RUN apk --no-cache add git 
ENV PATH /app/node_modules/.bin:$PATH
ARG password
RUN git clone https://liorezra73:${password}@github.com/liorezra73/FakeLockClient.git /usr/src
WORKDIR /usr/src/FakeLockClient
RUN npm install
RUN npm install -g @angular/cli@8.3.23
EXPOSE 4200
CMD ng serve --host 0.0.0.0
