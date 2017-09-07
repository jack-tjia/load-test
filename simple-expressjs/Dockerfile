ARG NODE_VERSION="6.11.3"
FROM node:${NODE_VERSION}

ARG USER="node"
ARG TARGET_DIR="/app"

RUN mkdir ${TARGET_DIR}
RUN chown -R ${USER} ${TARGET_DIR}

# node base image has built-in user node
USER ${USER}

WORKDIR ${TARGET_DIR}

COPY . ${TARGET_DIR}
RUN npm install

EXPOSE 6666
CMD ["node", "index.js"]
