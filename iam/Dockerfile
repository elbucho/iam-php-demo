FROM trafex/php-nginx

USER root
RUN apk add --no-cache php85-mysqlnd php85-pdo php85-iconv composer
USER nobody

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /var/www/html

COPY ./bin ./bin
COPY ./config ./config
COPY ./public ./public
COPY ./src ./src
COPY ./var ./var
COPY ./.env* ./
COPY ./composer.* ./

RUN composer install \
      --prefer-dist \
      --no-interaction

RUN composer dump-autoload --optimize
