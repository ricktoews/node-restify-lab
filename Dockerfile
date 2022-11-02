FROM node:17.5

RUN groupadd -r math && useradd -g math math

RUN mkdir -p /math/app
RUN cd /math/app
WORKDIR /math/app
COPY . .

RUN chown -R math:math /math/app

USER math
CMD ["npm", "start"]
EXPOSE 3000
