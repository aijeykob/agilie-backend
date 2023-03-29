## Installation

Install dependencies:
```bash
npm install
```
Start a PostgreSQL database with docker using:
```bash
docker-compose up -d
```
If you have a local instance of PostgreSQL running, you can skip this step. In this case, you will need to change the DATABASE_URL inside the .env file with a valid PostgreSQL connection string for your database.
Apply database migrations:
```bash
npx prisma migrate dev
```
Start the project:
```bash
npm run start:dev
```

## 1 Task

To check the first task, use a tool like Postman. Make a `POST` request to the server http://localhost:3000/assets with a body like this:
```javascript
{
    "assets":["ETHUSD","REPV2USD","KSMUSD"]
}
```