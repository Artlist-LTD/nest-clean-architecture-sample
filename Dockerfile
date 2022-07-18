FROM registry.gitlab.com/artlist-public/images/base:node16

ARG PROJECT_ID
ARG NPM_TOKEN
ARG PORT

# Bundle app source
COPY . .
COPY .npmrcForDocker .npmrc

# Install app dependencies
RUN ./npm-install-test-and-build

EXPOSE $PORT
