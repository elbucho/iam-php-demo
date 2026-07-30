FROM trafex/php-nginx

USER root
RUN apk add --no-cache php85-mysqlnd php85-pdo php85-iconv composer
USER nobody

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
#COPY ./php.ini /etc/php85/conf.d/settings.ini

WORKDIR /var/www/html

COPY composer.json composer.lock ./

RUN composer install \
      --prefer-dist \
      --no-interaction

COPY ./src ./src
COPY ./public ./public

RUN composer dump-autoload --optimize