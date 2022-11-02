FROM node:17.5

RUN groupadd -r rick && useradd -g rick rick

RUN mkdir -p /rick/app
RUN cd /rick/app
WORKDIR /rick/app
COPY . .

RUN chown -R rick:rick /rick/app

USER rick
CMD ["node", "index.js"]
EXPOSE 3000
