# base image
FROM node:carbon-slim

# set working directory
WORKDIR /untube-web

# add `/app/node_modules/.bin` to $PATH
ENV PATH /untube-web/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /untube-web/package.json
RUN npm install -g @angular/cli@7.3.9

# add app
COPY .  /untube-web

RUN npm install
# start app Added comment just for commit
#CMD ng serve --host 0.0.0.0 --disableHostCheck
CMD npm start
EXPOSE 4200