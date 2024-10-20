# Customers API

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Mocha](https://img.shields.io/badge/-mocha-%238D6748?style=for-the-badge&logo=mocha&logoColor=white)

**Deploy status**

![Heroku-pipe](https://raw.githubusercontent.com/gregsadetsky/heroku-ci-badge/master/badges/succeeded.svg)

**Tests coverage**

| Statements                  | Branches                | Functions                 | Lines             |
| --------------------------- | ----------------------- | ------------------------- | ----------------- |
| ![Statements](./dev_scripts/output/statements.svg) | ![Branches](./dev_scripts/output/branches.svg) | ![Functions](./dev_scripts/output/functions.svg) | ![Lines](./dev_scripts/output/lines.svg) |


## Overview 

This project is a customers API built in NodeJs. The project access to non relational database using MongoDB. Below you see the main steps to run project and run automatization tests. The main libraies and resources used in this project was:

💻  - **Development** 

* [Nodejs](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.com/)
* [Express](https://expressjs.com/)

✅ - **Testing**

* [Mocha](https://mochajs.org/)
* [Chai](https://www.chaijs.com/)
* [Sinon](https://sinonjs.org/)
* [Sinon-mongo](https://github.com/DaniJG/sinon-mongo)

📄 - **Contract Testing**

* [Supertest](https://www.npmjs.com/package/supertest)
* [Joi](https://www.npmjs.com/package/joi)
* [Chai](https://www.chaijs.com/)


### Directory structure 

```
node-customers-api-tests/
├── __mocks__/
│     └── ...
├── __tests__/
│     ├── unit/
│     │    └── ...
│     └── contract/
│          └── ...
├── coverage/
│     └── ...
├──  .nyc_output
│     └── ...
├── docs/
│     ├── [DOCUMENTATION FILES]
│     └── ...
├── dev_scripts/
│     ├── output/
│     │    └── ...
│     └── [SCRIPTS FILES]
├── src/
│     ├── config/
│     │    ├── [CONFIG FILES]
│     │    └── ...
│     ├── routes/
│     │    ├── [ROUTES FILES]
│     │    └── ...
│     ├── services/
│     │    ├── [SERVCES FILES]
│     │    └── ...
│     ├── controllers/
│     │    ├── [CONTROLLERS FILES]
│     │    └── ...
│     ├── utils/
│     │    ├── [UTILS FILES]
│     │    └── ...
│     └── index.js
├── .gitignore
├── LICENSE.md
├── package-lock.json
├── package.json
└── README.md

```

## Get Started

First is important to know that this project contains environment variables, that you have use. The local variables are in .env.local and production enviroment variables are in .env.prod. So, to setup your development environment, run:

```
cp .env.local .env
```

Necessary variables enrironments:
```
UI_URL_APP=''
MONGO_DB_URI=''
MONGO_DB_NAME=''
USER_API_AUTH=''
PASS_API_AUTH=''
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

