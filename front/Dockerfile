FROM node:22-bookworm-slim as build

ENV USERNAME=node
ENV WORKPATH=/opt/workdir
ENV USER_ID=1000
ENV GROUP_ID=1000

RUN usermod -u ${USER_ID} ${USERNAME}
RUN usermod -g ${GROUP_ID} ${USERNAME}

WORKDIR ${WORKPATH}
COPY --chown=${USERNAME}:${USERNAME} package*.json ./
copy . .
RUN chown -R ${USER_ID}:${GROUP_ID} ${WORKPATH}
RUN npm install
RUN npm install -g @angular/cli

RUN npm run build

USER ${USERNAME}

CMD ["npx", "ng", "serve", "--host", "0.0.0.0"]