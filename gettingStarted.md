# GETTING STARTED

Welcome to [RedwoodJS](https://redwoodjs.com)!

> **Prerequisites**
>
> - Redwood requires [Node.js](https://nodejs.org/en/) (=20.x) and [Yarn](https://yarnpkg.com/)
> - Are you on Windows? For best results, follow our [Windows development setup](https://redwoodjs.com/docs/how-to/windows-development-setup) guide

Start by installing dependencies:

```bash
yarn install
```

Then start the development server:

```bash
yarn redwood dev
```

Your browser should automatically open to [http://localhost:8910](http://localhost:8910) where you'll see the Welcome Page, which links out to many great resources.

copy the .env.example file to .env

to start the docker container run the following command so that the database is up and running
```bash
docker-compose up -d
```

Run migrations to sync the database with the schema, this should the run also the seed script
```bash
yarn rw prisma migrate dev --name init # this will name the migration init

```

If needed run the seed manually, this will populate the database with some data. It will not run on production environment

```bash
yarn rw prisma db seed
```


That is it, you are ready to go. Happy coding! 🚀
