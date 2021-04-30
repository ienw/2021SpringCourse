import React from 'react';
import './App.css';
import gql from "graphql-tag";
import { useQuery, useLazyQuery, useMutation } from "react-apollo";


const loginQuery = gql`
  query($username: String!, $password: String!) {
    login(username: $username, password: $password){
      token,
      user {
        username,
        _id
      }
    }
  }
`;

const getTires = gql`
  query {
    tires {
      _id,
      brand,
      model,
      fullPrice,
      singlePrice,
      stock
    }
  }
`;


const getCustomers = gql`
  query {
    customers {
      _id,
      name,
      carNumber,
      phone,
      carType, 
      tireSize,
      miles, 
      description
    }
  }
`;

const createTire = gql`
mutation(
  $brand: String!
  $model: String!
  $stock: Int!
  $singlePrice: Int!
  $fullPrice: Int!
) {
  createTire(
    brand: String!
    model: String!
    stock: Int!
    singlePrice: Int!
    fullPrice: Int!
  ): {
    _id
  }
}
`

const createCustomer = gql`
mutation(
  $name: String!
  $carNumber: String!
  $phone: String!
  $carType: String! 
  $tireSize: String!
  $miles: Int! 
  $description: String!
) {
  createCustomer(
    name: $name
    carNumber: $carNumber
    phone: $phone
    carType: $carType
    tireSize: $tireSize
    miles: $miles
    description: $description
  ) {
    _id
  }
}
`;

const Page0 = () => {
  const [runQuery, { loading, data, error }] = useLazyQuery(loginQuery)

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [token, setToken] = React.useState(localStorage.getItem("token"))

  React.useEffect(() => {
    if (data && data.login && data.login.token) {
      console.log("Setting login token to localstorage", data.login.token);
      localStorage.setItem("token", data.login.token);
      setToken(data.login.token);
    }
  }, [data]);

  if (loading) {
    return "Loading..."
  }

  if (token) {
    return (
      <>
        <h1>You are logged in</h1>

        <button onClick={() => {
          localStorage.removeItem("token");
          setToken(undefined);
        }}>Logout</button>
      </>
    )
  }

  return (
    <>
      <h1>Log In Here</h1>
      <label>
        Username
        <input onChange={(event) => { setUsername(event.target.value)}} value={username} />
      </label>
      <label>
        Password
        <input onChange={(event) => setPassword(event.target.value)} value={password} type="password" />
      </label>
      <button
        onClick={() => {
          console.log("Logging in as", username, password);
          runQuery({ variables: { username, password }})
        }}
      >Log in</button>
      {error && (
        <div>Error: {error.message}</div>
      )}
    </>
  )

}

const Page1 = () => {
  const [showResult, setShowResult] = React.useState(false);

  return (
    <>
      <h1>Search anything!</h1>
      <input /><button onClick={() => setShowResult(true)}>Search</button>
      {showResult && (
        <>
          <br></br>
          <div>Tire 30mm goodyear 5</div>
          <div>Tire 30mm goodyear 7</div>
          <div>Tire 30mm goodyear 32</div>
          <div>Tire 50mm goodyear 11</div>
          <div>Tire 50mm goodyear 15</div>
          <div>Tire 50mm goodyear 17</div>
        </>
      )}
    </>
  )
}

const Page2 = () => {

  const { data, loading, error, refetch } = useQuery(getCustomers, { fetchPolicy: "network-only" });

  const [name, setName] = React.useState("");
  const [carNumber, setCarNumber] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [carType, setCarType] = React.useState("");
  const [tireSize, setTireSize] = React.useState("");
  const [miles, setMiles] = React.useState("");
  const [description, setDescription] = React.useState("");

  const [mutate] = useMutation(createCustomer);

  const createUser = () => {
    mutate({
      variables: {
        name,
        carNumber,
        phone,
        carType,
        tireSize,
        miles: Number(miles),
        description,
      },
      update: () => {
        refetch();
        setName("");
        setCarNumber("");
        setPhone("");
        setCarType("");
        setTireSize("");
        setMiles("");
        setDescription("");
      }
    })
  }

  const isLoggedIn = localStorage.getItem("token")

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <table>
       <thead>
        <tr>
          <th>Name</th>
          <th>Phone number</th>
          <th>Car type</th>
          <th>Car number</th>
          <th>Tire size</th>
          <th>Mileage</th>
          <th>Other</th>
        </tr>
      </thead>
      <tbody>
      {isLoggedIn && (
        <tr>
          <td>
            <input value={name} onChange={event => setName(event.target.value)} />
          </td>
          <td>
            <input value={phone} onChange={event => setPhone(event.target.value)}/>
          </td>
          <td>
            <input value={carType} onChange={event => setCarType(event.target.value)} />
          </td>
          <td>
            <input value={carNumber} onChange={event => setCarNumber(event.target.value)} />
          </td>
          <td>
            <input value={tireSize} onChange={event => setTireSize(event.target.value)} />
          </td>
          <td>
            <input value={miles} onChange={event => setMiles(event.target.value)}/>
          </td>
          <td>
            <div style={{display: "flex", alignItems: "center"}}>
              <input value={description} onChange={event => setDescription(event.target.value)}/>
              <button style={{ height: "max-content"}} onClick={createUser}>Add customer</button>
            </div>
          </td>
        </tr>
      )}
      {data.customers.map(customer => 
        <tr>
          <td>{customer.name}</td>
          <td>{customer.phone}</td>
          <td>{customer.carType}</td>
          <td>{customer.carNumber}</td>
          <td>{customer.tireSize}</td>
          <td>{customer.miles} miles</td>
          <td>{customer.description}</td>
        </tr>
      )}
      </tbody>
    </table>
  )
}


const Page3 = () => {

  const { data, loading, error } = useQuery(getTires, { fetchPolicy: "network-only" });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  console.log("data", data)

  return (
    <table>
      <thead>
        <tr>
          <th>Brand</th>
          <th>Model</th>
          <th>price</th>
          <th>sold units</th>
          <th>inventory</th>
        </tr>
      </thead>
      <tbody>
        {data.tires.map(tire => 
          <tr>
            <td>{tire.brand}</td>
            <td>{tire.model}</td>
            <td>{tire.fullPrice}</td>
            <td>N / A</td>
            <td>{tire.stock}</td>
          </tr>
        )}
        <tr>
          <td><input /></td>
          <td><input /></td>
          <td><input /></td>
          <td><input /></td>
          <td><input /></td>
          <td><input /><button>Add</button></td>
        </tr>
      </tbody>
    </table>
  )
}

const Page4 = () => {

  return (
    <img src="graph.png" alt="" />
  );
}

function App() {

  const [page, setPage] = React.useState("1");

  return (
    <div className="App">
      <nav>
        <span style={{ padding: "10px 30px"}} onClick={() => setPage("1")}>search</span>
        <span style={{ padding: "10px 30px"}} onClick={() => setPage("2")}>customers</span>
        <span style={{ padding: "10px 30px"}} onClick={() => setPage("3")}>Inventory</span>
        <span style={{ padding: "10px 30px"}} onClick={() => setPage("4")}>Statistics</span>
        <span style={{ padding: "10px 30px"}} onClick={() => setPage("0")}>Admin</span>
      </nav>
      <header className="App-header">
        {page === "1" && (
          <Page1 />
        )}
        {page === "2" && (
          <Page2 />
        )}
        {page === "3" && (
          <Page3 />
        )}
        {page === "4" && (
          <Page4 />
        )}
        {page === "0" && (
          <Page0 />
        )}
      </header>
    </div>
  );
}

export default App;


/*

    */