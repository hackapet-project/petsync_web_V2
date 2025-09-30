FROM node:22-bookworm-slim

ENV USERNAME=node
ENV WORKPATH=/opt/workdir
ENV USER_ID=1000
ENV GROUP_ID=1000

RUN usermod -u ${USER_ID} ${USERNAME}
RUN usermod -g ${GROUP_ID} ${USERNAME}

WORKDIR ${WORKPATH}
COPY --chown=${USERNAME}:${USERNAME} package*.json ./
RUN npm install
RUN npm install -g @angular/cli

COPY --chown=${USERNAME}:${USERNAME} . .
RUN chown -R ${USER_ID}:${GROUP_ID} ${WORKPATH}

USER ${USERNAME}

EXPOSE 3000

CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--port", "3000"]