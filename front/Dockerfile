FROM node:22-bookworm-slim
# FROM node:18.16-buster-slim AS base

ENV WORKPATH=/opt/workdir/
ENV USERNAME=node
ARG USER_ID=1000
ARG GROUP_ID=1000

RUN usermod -u ${USER_ID} ${USERNAME}
RUN usermod -g ${GROUP_ID} ${USERNAME}

RUN mkdir -p ${WORKPATH}/node_modules && chown -R ${USERNAME}:${USERNAME} ${WORKPATH}
WORKDIR ${WORKPATH}
COPY --chown=${USERNAME}:${USERNAME} package*.json ./
RUN npm install
RUN npm install -g @angular/cli

COPY --chown=${USERNAME}:${USERNAME} . .
RUN chown -R ${USER_ID}:${GROUP_ID} ${WORKPATH}

USER ${USERNAME}
RUN npm install @angular/cli
COPY --chown=${USERNAME}:${USERNAME} . .
# RUN npm run build

CMD ["npx", "ng", "serve", "--host", "0.0.0.0"]


# FROM base AS ci
# RUN npm clean-install


# ENV USERNAME=node
# ENV WORKPATH=/opt/workdir
# ENV USER_ID=1000
# ENV GROUP_ID=1000

# RUN usermod -u ${USER_ID} ${USERNAME}
# RUN usermod -g ${GROUP_ID} ${USERNAME}

# # RUN mkdir -p ${WORKPATH}/node_modules && chown -R ${USERNAME}:${USERNAME} ${WORKPATH}
# RUN npm install @angular/cli
# WORKDIR ${WORKPATH}
# # RUN chown -R ${USERNAME}:${USERNAME} ${WORKPATH}
# # COPY --chown=${USERNAME}:${USERNAME} package*.json ./
# # RUN chown -R ${USER_ID}:${GROUP_ID} ${WORKPATH}
# USER ${USERNAME}
# # RUN npm install

# # COPY --chown=node:node . .
# COPY --chown=${USERNAME}:${USERNAME} . $WORKPATH

# RUN npm run build

# CMD ["npx", "ng", "serve", "--host", "0.0.0.0"]

EXPOSE 3000

CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--port", "3000"]