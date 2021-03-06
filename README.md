# NodeJS Customers API - example

This project is a customers API built in NodeJs. The project access to non relational database using MongoDB. Below you see the main steps to run project and run automatization tests. 

The main libraies and resources used in this project was:

Development 

* [Nodejs](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.com/)
* [Express](https://expressjs.com/)

Testing

* [Mocha](https://mochajs.org/)
* [Chai](https://www.chaijs.com/)
* [Sinon](https://sinonjs.org/)
* [Sinon-mongo](https://github.com/DaniJG/sinon-mongo)

Contract Testing

* [Supertest](https://www.npmjs.com/package/supertest)
* [Joi](https://www.npmjs.com/package/joi)
* [Chai](https://www.chaijs.com/)

### Begining

First is important to know that this project contains environment variables, that you have use. The local variables are in .env.local and production enviroment variables are in .env.prod. So, to setup your development environment, run:

```
cp .env.local .env
```

### Install dependencies

First, install dependencies:

````
npm install
````

### Run

To run the project, you can execute this command below:

````
npm start
````

### Tests

To execute unit tests, run:

````
npm run test
`````

![Image unit test results](docs/unit_testing.png)


To run coverage to unit tests, run:

````
npm run coverage
`````
![Image unit test results](docs/coverage_tests.png)


To run contract tests, run:

````
npm start
````

and in other terminal, run:

````
npm run contract
`````


![Image unit test results](docs/contract_tests.png)

