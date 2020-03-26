FROM node

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package*.json ./
RUN npm install
RUN npm install -g @angular/cli@8.3.23

# add app
COPY . /app

EXPOSE 4200

# start app
CMD ng serve --host 0.0.0.0
