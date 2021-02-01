# PencilBackEnd
Pencil backend using NodeJS, express and typescript

### Live Demo
https://pencilproject-cda84.uc.r.appspot.com

### Set up
You should have [git](https://git-scm.com/), [python](https://docs.python.org/), [pip](https://pypi.python.org/pypi/pip), [postgresql](https://www.postgresql.org/docs/current/static/tutorial.html), [virtualenv](https://virtualenv.pypa.io/en/stable/) installed
##### These instractions are specific to a linux or unix based machine
1. Open your terminal
2. Clone the project using `git clone https://github.com/malmike/PencilBackEnd.git`
3. Change to the project directory using `cd PencilBackEnd`
4. Follow the steps in the [database readme](https://github.com/malmike/PencilBackEnd/blob/master/database_setup/README.md) to setup database.
5. Generate a `key.json` file based on `sample_keys.json`. Ensure to update the `mongoURI` with the one got from your running mongo instance.
6. Install packages using `yarn install`
7. To launch the application run `yarn dev`
8. You can access the api documentation at `http://localhost:8080/`


### Specifications for the API are shown below

| EndPoint | Query Param | Usage | Functionality | Public Access |
| -------- | ----------- | ----- | ------------- | ------------- |
| [ GET /healthcheck ](https://pencilproject-cda84.uc.r.appspot.com/healthcheck) | none | /healthcheck |Logs health check of the application | TRUE |
| [ GET /search ](https://pencilproject-cda84.uc.r.appspot.com/search?q=%22Chloroplasts%22) | q=”name of topic” | /search?q=”Quantum Mechanics” | Query for questions that contain an annotation which is anywhere in the subtree of the query topic | TRUE |



