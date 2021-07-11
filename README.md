
# NestJS Application with 12 factor App

[NestJS](https://github.com/nestjs/nest) framework starter repository.

| 12 Factor App  | Nest JS App Example |
| ------------- | ------------- |
| Baseline  |  |
| lint & test configurations  |  |

## Libraries & Technologies

* Language
  * Docs
    * TypeScript: <https://www.typescriptlang.org/docs/>
  * Packages
    * typescript: <https://github.com/microsoft/TypeScript>

* Web Application Framework
  * Docs
    * NestJS: <https://docs.nestjs.com/>
  * Packages
    * @nestjs: <https://github.com/nestjs/nest>

* Database Access
  * Docs
    * TypeORM: <https://typeorm.io/>
      * Supports MySQL / Postgres / SQLite And more...
      * Automatic migrations generation
  * Packages
    * @nestjs/typeorm: <https://github.com/nestjs/typeorm>
    * typeorm: <https://github.com/typeorm/typeorm>

* Validation
  * class-validator: <https://github.com/typestack/class-validator>

* Serialization
  * class-transformer: <https://github.com/typestack/class-transformer>

* Security
  * helmet: <https://github.com/helmetjs/helmet>
  * bcrypt: <https://github.com/kelektiv/node.bcrypt.js>
  * CORS: NestJS built-in

* Authentication
  * Docs
    * JWT: <https://jwt.io/>
    * JWT Node.js: <https://github.com/auth0/node-jsonwebtoken>
    * Passport: <http://www.passportjs.org/>
  * Packages
    * @nestjs/passport: <https://github.com/nestjs/passport>
    * passport: <https://github.com/jaredhanson/passport>
    * @nestjs/jwt: <https://github.com/nestjs/jwt>
    * passport-jwt: <https://github.com/mikenicholson/passport-jwt>

* Health Check
  * @nestjs/terminus: <https://github.com/nestjs/terminus>
  * @godaddy/terminus: <https://github.com/godaddy/terminus>

* 12-Factor based config
  * `src/config/config.service.ts`
  * `src/config/config.env.ts`

* Linter
  * Docs
    * ESLint: <https://eslint.org/>
  * Packages
    * eslint: <https://github.com/eslint/eslint>
    * eslint-config-airbnb: <https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb>
    * @typescript-eslint/parser: <https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/parser>
    * @typescript-eslint/eslint-plugin: <https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin>

* Formatter
  * Docs
    * Prettier: <https://prettier.io/>
  * Packages
    * prettier: <https://github.com/prettier/prettier>
    * eslint-config-prettier: <https://github.com/prettier/eslint-config-prettier>

* Test
  * Docs
    * Jest: <https://jestjs.io/>
  * Packages
    * jest: <https://github.com/facebook/jest>

* Documentation
  * Docs
    * Compodoc: <https://compodoc.app/>
  * Packages
    * @compodoc/compodoc: <https://github.com/compodoc/compodoc>

* Documentation OpenAPI
  * Docs
    * OpenAPI: <https://www.openapis.org/>
    * Swagger UI: <https://swagger.io/tools/swagger-ui/>
  * Packages
    * @nestjs/swagger: <https://github.com/nestjs/swagger>
    * swagger-ui-express: <https://github.com/scottie1984/swagger-ui-express>

## Installation

```shell
yarn global add @nestjs/cli
yarn install
```

## Running the app

```shell
# development
yarn run start

# watch mode
yarn run start:dev

# production mode
yarn run start:prod
```

## Test

```shell
# unit tests
yarn run test

# e2e tests
yarn run test:e2e

# test coverage
yarn run test:cov
```

## DB migration

```shell
# generate
yarn run migration:generate <name>

# show all migrations
yarn run migration:show

# run
yarn run migration:run

# dry run
yarn run schema:log

# revert
yarn run migration:revert
```

## Documentation

```shell
yarn run doc
```

## How would I set this up myself

```shell
# creating a new project
yarn global add @nestjs/cli
nest new nestjs-starter
cd nestjs-starter

# database access
yarn add @nestjs/typeorm typeorm
yarn add sqlite3 pg
yarn add pluralize
yarn add -D @types/pluralize

# graphql
yarn add @nestjs/graphql apollo-server-express graphql-tools graphql
yarn add type-graphql

# validation
yarn add class-validator

# serialization
yarn add class-transformer

# security
yarn add helmet
yarn add bcrypt
yarn add -D @types/bcrypt

# auth
yarn add @nestjs/passport passport
yarn add @nestjs/jwt passport-jwt
yarn add -D @types/passport-jwt
yarn add passport-mock-strategy

# performance
yarn add compression

# health check
yarn add @nestjs/terminus @godaddy/terminus

# linter
yarn add -D eslint
yarn add -D eslint-plugin-import
yarn add -D eslint-plugin-react eslint-plugin-react-hooks
yarn add -D eslint-plugin-jsx-a11y
yarn add -D eslint-config-airbnb
yarn add -D @typescript-eslint/parser @typescript-eslint/eslint-plugin

# formatter
yarn add -D eslint-config-prettier

# documentation
yarn add -D @compodoc/compodoc

# documentation openapi
yarn add @nestjs/swagger swagger-ui-express
```

# Twelve Factor nodejs app

This app demonstrates the [twelve-factor methodology](https://12factor.net) in
Node.js on cloud.gov.

The goal is to walk a user through the twelve-factor methodology with specific
examples of how you would implement them in Node.js on cloud.gov. The companion
application that demonstrates the principles is not implemented yet, but the
idea is that you could link to specific line numbers to see a working app, with
working code implementing best practices.

The twelve-factor methodology is not specific to Node.js and much of these tips
are already general enough for any cloud.gov application.


## The Twelve Factors


### [I. Codebase](https://12factor.net/codebase)

One codebase tracked in revision control, many deploys.


#### How we do it

This code is tracked on github. [Git
flow](https://danielkummer.github.io/git-flow-cheatsheet/) can be used to manage
branches for releases.

[comment]: # (include notes on the CD scripts)


### [II. Dependencies](https://12factor.net/dependencies)

Explicitly declare and isolate dependencies.


#### How we do it

[package.json][package-json] declare and lock dependencies to specific versions.
[npm][npmjs] installs modules to a local `node_modules` dir so each
application's dependencies are isolated from the rest of the system.


### [III. Config](https://12factor.net/config)

Store config in the environment.


#### How we do it

Configuration is stored in enviornment variables and supplied through the
[manifest.yml][manifest-yml].

Secrets are also stored in environment variables but supplied through a [Cloud
Foundry User Provided
Service](https://docs.cloudfoundry.org/devguide/services/user-provided.html).
When setting up the app, they are created with a one-time command `cf
create-user-provided-service tfn-secrets -p '{"SECRET_KEY":
"your-secret-key"}'`.

Connection configuration to Cloud Foundry Services, like our database, are
provided through the `VCAP_SERVICES` environment variable.


### [IV. Backing services](https://12factor.net/backing-services)

Treat backing services as attached resources.


#### How we do it

We connect to the database via a connection url provided by the
`VCAP_SERVICES` environment variable. If we needed to setup a new database, we
would simply create a new database with `cf create-service` and bind the
database to our application. After restaging with `cf restage`, the
`VCAP_SERVICES` environment will be updated with the new connection url and our
app would be talking to the new database.

We use a library which handles the database connection. This library abstracts
away the differences between different SQL-based databases. This makes it easier
to migrate from one database provider to another.

We expect to be using a database hosted on Cloud Foundry, but using this
strategy we could store the connection url in a separate environment variable
which could point to a database outside of the Cloud Foundry environment and
this strategy would work fine.

Of course, how you handle migrating your data from one database to another can
be complicated and is out of scope with regard to the twelve factor app.


### [V. Build, release, run](https://12factor.net/build-release-run)

Strictly separate build and run stages.


#### How we do it

`package.json` allows to configure "scripts" so that we can codify various
tasks. `npm run build` is used to build this application and produces minified
javascript and css files to be served as static assets.

`npm start` is used to start the application. The `nodejs_buildpack` runs this
command by default to start your application.


### [VI. Processes](https://12factor.net/processes)

Execute the app as one or more stateless processes.


#### How we do it

We listen to SIGTERM and SIGINT to know it's time to shutdown. The platform is
constantly being updated even if our application is not. Machines die, security
patches cause reboots. Server resources become consumed. Any of these things
could cause the platform to kill your application. Don't worry though, Cloud
Foundry makes sure to start a new process on the new freshly patched host before
killing your old process.

By listening to process signals, we know when to stop serving requests, flush
database connections, and close any open resources.


### [VII. Port binding](https://12factor.net/port-binding)

Export services via port binding.


#### How we do it

Cloud Foundry assigns your application instance a port on the host machine and
exposes it through the `PORT` environment variable.


### [VIII. Concurrency](https://12factor.net/concurrency)

Scale out via the process model


#### How we do it

Our app keeps no state on it's own. Configuration is stored in the environment
and read at startup. User sessions are stored as cookies on the client. Any
other state is kept in the database. This allows our application to scale simply
by adding more processes.

We are running [two application instances][manifest-yml-instances] on Cloud
Foundry. Each application instance represents a running process of our
application. The two instances are likely running on different host machines and
have no way of communicating with each other. By making our processes stateless,
the two application instances have no need to communicate because all state is
stored in our backing service (the database in our case).

Here are the steps the app takes when a request comes in:

1. A user request comes in.
1. We parse their session cookie to figure out who they are.
1. We lookup their user information in the database.
1. Process their request, possibly with additional database lookups.

Notice how if a user's request comes in on instance 1, the same user's second
request could be served by any instance. The steps to process subsequent requests are
the same.

If you wanted to add some kind of session caching, that would be a job for
another backing service like Memcached or Redis. That way all instances of your
application could use a shared cache.


### [IX. Disposability](https://12factor.net/disposability)

Maximize robustness with fast startup and graceful shutdown.


#### How we do it

_SIGTERM SIGINT above?_

### [X. Dev/prod parity](https://12factor.net/dev-prod-parity)

Keep development, staging, and production as similar as possible

#### How we do it

Choosing your environments is up to you, but it's probably good to have at least
two for development. For us, development is our local laptop. Staging is a Cloud
Foundry environment we use to preview the application to our partners.
Production is a Cloud Foundry environment once it has been accepted by our
partners.

As much as possible, the differences between development, staging, and
production is simply the configuration which is stored in the environment.

Occasionally we use `NODE_ENV`, `NODE_CONFIG` to produce slightly different
behavior. Specifically, anything we

| Environment variable | Description                 |
| -------------------- | -----------                 |
| `NODE_ENV`           | _How_ the app is running.   |
| `NODE_CONFIG`        | _Where_ the app is running. |


| Environment variable | development | staging       | production   |
| -------------------- | ----------- | -------       | ----------   |
| `NODE_ENV`           | `<unset>`   | `production`† | `production` |
| `NODE_CONFIG`        | `<unset>`   | `staging`     | `production` |

*† That's not a typo, remeber `NODE_ENV` is _how_ the app is running. Both
staging and production are Cloud Foundry environments and warrant a production setup.*

For nodejs, `NODE_ENV=production` has special meaning. `npm install` will only
install `dependencies` listed in your `package.json` and will omit any
`devDependencies`. We also use `NODE_ENV` to condition on how we build our
static assets. `NODE_ENV=production` will include some extra optimizations.

`NODE_CONFIG` is used sparingly, and only to load environment specific
configuration files.


### [XI. Logs](https://12factor.net/logs)

Treat logs as event streams.


#### How we do it

We use `winston` as our logger. We use logging levels to provide feedback about
how the application is working. Some of this feedback could warrant a bug fix.

Warnings are conditions that are unexpected and might hint that a bug exists in
the code.


### [XII. Admin processes](https://12factor.net/admin-processes)

Run admin/management tasks as one-off processes.


#### How we do it

Any one-off tasks are added as npm scripts. The meat of these tasks is added to
the `tasks` directory. Some take inputs which can be specified when running the
task `npm run script -- arguments`. Note that by default, we avoid writing
interactive scripts. If configuration is complex, the task can accept
a configuration file or read a configuration from stdin.


## Beyond Twelve Factor

### Blue/green deploy

By default, `cf push` will stop your application while it rebuilds the new one.
That means that a `cf push` results in a service disruption. If your application
fails to build, the old application is gone so you are left with no running
application at all. Blue/green is a strategy that creates a new application
living side-by-side your old application. When the new application is known to
be good, the old application is removed and you are left with a working new
version of your application.

The [autopilot zero-downtime-push](https://github.com/contraband/autopilot)
plugin will do this for you automatically.


### Continuous Integration and Delivery with Git Flow

Git Flow is a useful process for managing relases using git branches. The idea
is that branches map to different deployment environments.

`master` represents well-vetted and partner accepted work and deploys to the
production environment.

`release-x.y` is on track for release and deploys to your staging environment.
This allows partners to review the work before it is released. Each release
branch is based on development. Once created, this allows developers to commit
bug fixes directly to the release branch without hindering development on the
next release.

`development` is an integration branch. This allows developers on your team
to test their work-in-progress features with features from other developers.

`feature-\*` branches represent a single feature. One or more developers may be
committing to this branch. When the feature is tested and reviewed it can be
merged to `development`.



[manifest-yml]: https://github.com/adborden/twelve-factor-node/blob/master/manifest.prod.yml
[manifest-yml-instances]: https://github.com/adborden/twelve-factor-node/blob/master/manifest.prod.yml#L3
[npmjs]: https://npmjs.org/
[package-json]: https://github.com/adborden/twelve-factor-node/blob/master/package.json
[package-json-scripts]: https://github.com/adborden/twelve-factor-node/blob/master/package.json#L5