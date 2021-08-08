# NestJS Application with 12 factor App

[NestJS](https://github.com/nestjs/nest) framework starter repository.

| 12 Factor App                 | Nest JS App Example |
| ----------------------------- | ------------------- |
| Baseline                      |                     |
| lint & test configurations    |                     |
| migration setup               |                     |
| unit & integration test setup |                     |

![](snap.png)

## Libraries & Technologies

- Language

  - Docs
    - TypeScript: <https://www.typescriptlang.org/docs/>
  - Packages
    - typescript: <https://github.com/microsoft/TypeScript>

- Web Application Framework
  - Docs
    - NestJS: <https://docs.nestjs.com/>
  - Packages
    - @nestjs: <https://github.com/nestjs/nest>

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

[comment]: # 'include notes on the CD scripts'

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
When setting up the app, they are created with a one-time command `cf create-user-provided-service tfn-secrets -p '{"SECRET_KEY": "your-secret-key"}'`.

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
| -------------------- | --------------------------- |
| `NODE_ENV`           | _How_ the app is running.   |
| `NODE_CONFIG`        | _Where_ the app is running. |

| Environment variable | development | staging       | production   |
| -------------------- | ----------- | ------------- | ------------ |
| `NODE_ENV`           | `<unset>`   | `production`† | `production` |
| `NODE_CONFIG`        | `<unset>`   | `staging`     | `production` |

_† That's not a typo, remeber `NODE_ENV` is *how* the app is running. Both
staging and production are Cloud Foundry environments and warrant a production setup._

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

## Node.js Best Practices

<h1 align="center">
  <img src="src/assets/images/banner-2.jpg" alt="Node.js Best Practices">
</h1>

### 1. Project Structure Practices

[✔️] 1.1 Structure your solution by components

[✔️] 1.2 Layer your components, keep Express within its boundaries

[✔️] 1.3 Wrap common utilities as npm packages

[❌] No neccessary - 1.4 Separate Express 'app' and 'server'

[✔️] 1.5 Use environment aware, secure and hierarchical config

### 2. Error Handling Practices

[✔️] 2.1 Use Async-Await or promises for async error handling

[✔️] 2.2 Use only the built-in Error object

![❔] 2.3 Distinguish operational vs programmer errors

[✔️] 2.4 Handle errors centrally, not within an Express middleware

[✔️] 2.5 Document API errors using Swagger or GraphQL

[✔️] 2.6 Exit the process gracefully when a stranger comes to town

[✔️] 2.7 Use a mature logger to increase error visibility

[✔️️] use Jest - 2.8 Test error flows using your favorite test framework

![❔] 2.9 Discover errors and downtime using APM products

[✔️] 2.10 Catch unhandled promise rejections

[✔️] 2.11 Fail fast, validate arguments using a dedicated library

### 3. Code Style Practices

[❌] No neccessary - 3.1 Use ESLint

[❔] 3.2 Node.js specific plugins

[✔️] 3.3 Start a Codeblock's Curly Braces on the Same Line

[✔️] 3.4 Separate your statements properly

[✔️] 3.5 Name your functions

[✔️] 3.6 Use naming conventions for variables, constants, functions and classes

[✔️] 3.7 Prefer const over let. Ditch the var

[✔️] 3.8 Require modules first, not inside functions

[✔️] Nest must import files directly - 3.9 Require modules by folders, opposed to the files directly

[✔️] 3.10 Use the `===` operator

[✔️] 3.11 Use Async Await, avoid callbacks

[✔️] 3.12 Use arrow function expressions (=>)

### 4. Testing And Overall Quality Practices

[✔️] 4.1 At the very least, write API (component) testing

[✔️] use Jest - 4.2 Include 3 parts in each test name

[✔️] use Jest - 4.3 Structure tests by the AAA pattern

[✔️] 4.4 Detect code issues with a linter

[〽️] use Jest - 4.5 Avoid global test fixtures and seeds, add data per-test

[✔️] 4.6 Constantly inspect for vulnerable dependencies

![❔] 4.7 Tag your tests

[✔️] 4.8 Check your test coverage, it helps to identify wrong test patterns

[✔️] 4.9 Inspect for outdated packages

[✔️] 4.10 Use production-like env for e2e testing

[✔️] 4.11 Refactor regularly using static analysis tools

[✔️] 4.12 Carefully choose your CI platform (Jenkins vs CircleCI vs Travis vs Rest of the world)

### 5. Going To Production Practices

![❔] 5.1. Monitoring!

[✔️] 5.2. Increase transparency using smart logging

![❔] 5.3. Delegate anything possible (e.g. gzip, SSL) to a reverse proxy

[✔️] 5.4. Lock dependencies

![❔] 5.5. Guard process uptime using the right tool

[✔️] 5.6. Utilize all CPU cores

[✔️] 5.7. Create a ‘maintenance endpoint’

[✔️] 5.8. Discover errors and downtime using APM products

[✔️] 5.9. Make your code production-ready

![❔] 5.10. Measure and guard the memory usage

[✔️] 5.11. Get your frontend assets out of Node

![❔] 5.12. Be stateless, kill your servers almost every day

[✔️] 5.13. Use tools that automatically detect vulnerabilities

![❔] 5.14. Assign a transaction id to each log statement

[✔️] 5.15. Set NODE_ENV=production

![❔] 5.16. Design automated, atomic and zero-downtime deployments

![❔] 5.17. Use an LTS release of Node.js

![❔] 5.18. Don't route logs within the app

### 6. Security Best Practices

[✔️] 6.1. Embrace linter security rules

[✔️] 6.2. Limit concurrent requests using a middleware

[✔️] 6.3 Extract secrets from config files or use packages to encrypt them

[✔️] 6.4. Prevent query injection vulnerabilities with ORM/ODM libraries

![❔] 6.5. Collection of generic security best practices

[✔️] 6.6. Adjust the HTTP response headers for enhanced security

[✔️] 6.7. Constantly and automatically inspect for vulnerable dependencies

[✔️] 6.8. Avoid using the Node.js crypto library for handling passwords, use Bcrypt

![❔] 6.9. Escape HTML, JS and CSS output

[✔️] 6.10. Validate incoming JSON schemas

![❔] 6.11. Support blacklisting JWTs

![❔] 6.12. Prevent brute-force attacks against authorization

[✔️] 6.13. Run Node.js as non-root user

[✔️] 6.14. Limit payload size using a reverse-proxy or a middleware

![❔] 6.15. Avoid JavaScript eval statements

![❔] 6.16. Prevent evil RegEx from overloading your single thread execution

[✔️] 6.17. Avoid module loading using a variable

![❔] 6.18. Run unsafe code in a sandbox

![❔] 6.19. Take extra care when working with child processes

[✔️] 6.20. Hide error details from clients

[✔️] 6.21. Configure 2FA for npm or Yarn

[❌] No neccessary - 6.22. Modify session middleware settings

![❔] 6.23. Avoid DOS attacks by explicitly setting when a process should crash

[❌] No neccessary - 6.24. Prevent unsafe redirects

[✔️] 6.25. Avoid publishing secrets to the npm registry

### 7. Performance Best Practices

Our contributors are working on this section. [Would you like to join?](https://github.com/i0natan/nodebestpractices/issues/256)

[✔️] 7.1. Prefer native JS methods over user-land utils like Lodash

[❔] 7.2. Use Fastify in place of Express
