# OpenSyncedLists-server

## Dependecies

You just need to install [Docker](https://docs.docker.com/) and [Docker-Compose](https://docs.docker.com/compose/).

All dependecies got automaticly installed inside your docker containers.

Dependencies:

-   [Docker](https://docs.docker.com/)
-   [Docker-Compose](https://docs.docker.com/compose/)
-   [Nodejs](https://nodejs.org)
-   [MongoDB](https://www.mongodb.com/)
-   [Others](https://gitlab.com/gladion136/opensyncedlists/-/blob/main/Express_Server/package.json)

## Install

First clone the repository to your desired path:

```
git clone https://gitlab.com/gladion136/opensyncedlists-server
```

Then you can build and start the containers:

```
sudo docker-compose up -d
```

## Administrate

### Start

```
sudo docker-compose up -d
```

### Stop

```
sudo docker-compose down
```

### Show logs

```
sudo docker-compose logs
```

## Update

Just stop the containers and pull the git repository inside your repository folder:

```
git pull
```
