# MongoDB docker setup

### Docker Compose
Docker compose contains the instructions for setting up a docker mongo instance.

Copy `sample-database-env` to `database.env` adding your own environment settings.

#### Setup sample data
- Utilise [https://github.com/malmike/CleanPencilData](CleanPencilData) to generate sample data and place it in the `database_setup/database_data` folder.
- The docker-compose file is setup to copy files from the `database_data` folder to `home/malmike21/sampledata` folder in the generated docker container using volumes.

#### Start docker using:

    docker-compose up   # you can add -d flag to start docker without logs

#### Stop docker using:

    docker-compose down

#### Connect to mongo prompt from docker:

    docker exec -it $(docker-compose ps -q mongodb) mongo

#### Setup the Tables:
- You can manually transfer the sample data into the docker container using
```
docker cp database_data/<file_name> $(docker-compose ps -q mongodb):/home/malmike21/sampledata/<file_name>
```
Take note that the path `/home/malmike21/sampledata/` should have been generated when the volume was being created otherwise an error that the directory path does not exist will trigger.

- Import the sampledata (it should be in json format) into mongodb
```
docker exec -it $(docker-compose ps -q mongodb) mongoimport \
    --db <database_name> --collection <collection_name> \
    --authenticationDatabase admin --username <user> \
    --password <password> --drop --file /home/malmike21/sampledata/<file_name> --jsonArray
```

#### Run Bash in docker

    docker-compose run mongodb bash # this instruction creates a new container if there is an existing running container (use with caution)

or

    docker exec -it $(docker-compose ps -q mongodb) bash

NB: Take note that mongodb is defined under the service in docker-compose.

### Without the use of docker compose
#### Create Docker container with Mongodb:

    docker create --name mongodb -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=example -p 27017:27017 mongo

#### Start container:

    docker start mongodb

#### Stop container:

    docker stop mongodb

#### List all running containers

    docker container ls -aq # the q tag only returns the container Ids

or

    docker ps -aq

#### Delete container:

    docker container rm mongodb

#### Delete all containers:

    docker container rm $(docker container ls -aq)

#### Setup the Tables:
- Transfer the sample data into the docker container using
```
docker cp database_data/<file_name> mongodb:/<file_name>
```

- Import the sampledata (it should be in json format) into mongodb
```
docker exec -it mongodb mongoimport \
    --db <database_name> --collection <collection_name> \
    --authenticationDatabase admin --username <user> \
    --password <password> --drop --file /<file_name> --jsonArray
```

Note: This stores the data inside the container - when you delete the container, the data is deleted as well.

#### Connect to mongo prompt from docker:

    docker exec -it mongodb mongo


### Application Database Setup

Create the Database:

    use <database_name>


## MongoDB Connection Info:
Visualise the data using [MongoDB Compass](https://www.mongodb.com/products/compass)

Mongo URL: `mongodb://<username>:<password>@<host_url>:<host_port>/<database_name>`

example: `mongodb://root:example@localhost:27017/pencildb`

Username: `root`

Password: `example`

## Adding an index for ancestors in mongodb
db.topics.createIndex({ancestors: 1})
