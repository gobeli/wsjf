FROM node:8

# ENV HTTP_PROXY https://proxy.corproot.net:8079
# ENV HTTPS_PROXY https://proxy.corproot.net:8079
ENV appDir /var/www/app

RUN mkdir -p ${appDir}

# RUN echo 'https-proxy=http://proxy.corproot.net:8079/' >> /root/.npmrc

RUN npm install -g @nestjs/cli

COPY package.json ${appDir}/package.json
WORKDIR ${appDir}
RUN npm i

COPY . ${appDir}

EXPOSE 3000

# CMD ["npm", "run", "start:watch"]