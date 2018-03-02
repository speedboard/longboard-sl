FROM node:alpine

ENV DATABASE_URL "mongodb://db:27017/speedboard"
ENV DATABASE_NAME "speedboard"

# install openssl
RUN apk update
RUN apk upgrade
RUN apk add --update git
RUN apk add --update zip
RUN apk add --update unzip
RUN apk add --update openssl

## Default to UTF-8 file.encoding
#ENV LANG C.UTF-8
#
## add a simple script that can auto-detect the appropriate JAVA_HOME value
## based on whether the JDK or only the JRE is installed
#RUN { \
#		echo '#!/bin/sh'; \
#		echo 'set -e'; \
#		echo; \
#		echo 'dirname "$(dirname "$(readlink -f "$(which javac || which java)")")"'; \
#	} > /usr/local/bin/docker-java-home \
#	&& chmod +x /usr/local/bin/docker-java-home
#ENV JAVA_HOME /usr/lib/jvm/java-1.8-openjdk
#ENV PATH $PATH:/usr/lib/jvm/java-1.8-openjdk/jre/bin:/usr/lib/jvm/java-1.8-openjdk/bin
#
#ENV JAVA_VERSION 8u111
#ENV JAVA_ALPINE_VERSION 8.111.14-r0
#
#RUN set -x \
#	&& apk add --no-cache \
#		openjdk8="$JAVA_ALPINE_VERSION" \
#	&& [ "$JAVA_HOME" = "$(docker-java-home)" ]

## create app directory in container
#RUN mkdir -p /app
#
## set /app directory as default working directory
#WORKDIR /app
#
## only copy package.json initially so that `RUN yarn` layer is recreated only
## if there are changes in package.json
#ADD package.json package-lock.json /app/
#
## --pure-lockfile: Don’t generate a yarn.lock lockfile
#RUN npm install --no-save
#
## copy all file from current dir to /app in container
#COPY . /app/
#
## build project
#RUN npm run build
#
## install pm2
#RUN npm install pm2 -g
#
## expose port 8000
#EXPOSE 8000
#
## cmd to start service
#CMD [ "pm2", "--no-daemon", "start", "ecosystem.json" ]
