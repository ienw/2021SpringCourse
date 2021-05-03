Graphql API project

The api is for a tire shop inventory management system

Graphql queries and mutations
```
queries:
  login
  search
  tires
  customers
  internalTransactions
  customerTransactions

mutations:
  createCustomer
  createTire
  createInternalTransaction
  createCustomerTransaction
```
Edit and delete mutations are on the TODO list, but there
was not enough time to implement them because other things were prioritized.

Setup
```
npm install
cd UI
npm install
```

Add this to UI/src/config.js
```
const config = {
  API_URL: "http://localhost:3000/graphql"
}

export default config;
```

Add this to .env
```
DB_URL=mongodb://localhost:27017/myProject
JWT_SECRET=asd1234
```

To be able to to login you need to add a user to the `users` collection in myProject db
example document username: lily, password: lily
```
{
  "username":"lily",
  "password":"$2b$12$1m8B0hDlkFy6xeOCr8k1jOnYaDqrkxAM6IRHk2egSp2b1AsVCCnxO"
}
```

Start developing
```
node server.js

# in another shell
cd UI
npm start
```