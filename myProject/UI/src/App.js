import React from 'react';
import './App.css';
import gql from "graphql-tag";
import { useQuery, useLazyQuery } from "react-apollo";


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

const CustomerForm = () => {
  const [name, setName] = React.useState("");

  return (
    <>
      <label>
        Customer name
        <input value={name} onChange={event => setName(event.target.value)} />
      </label>
    </>
  )
}

const Page0 = () => {
  const [runQuery, { loading, data, error }] = useLazyQuery(loginQuery)
  console.log(data);

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [selectedForm, setSelectedForm] = React.useState("customer");

  if (loading) {
    return "Loading..."
  }

  if (data && data.login.token) {
    // TODO add creation forms here
    
    return (
      <>
        <h1>Hello {data.login.user.username}</h1>
        <p>Select which form to use</p>
        <select value={selectedForm} onChange={event => setSelectedForm(event.target.value)}>
          <option value="customer">Customer</option>
          <option value="tire">Tire</option>
        </select>
        {selectedForm === "customer" && (
          <CustomerForm />
        )}
        {selectedForm === "tire" && (
          <div>
            Make tire form here
          </div>
        )}
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

  const { data, loading, error } = useQuery(getCustomers)

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
          <th>Car</th>
          <th>Mileage</th>
          <th>Other</th>
        </tr>
      </thead>
      <tbody>
      {data.customers.map(customer => 
        <tr>
          <td>{customer.name}</td>
          <td>{customer.phone}</td>
          <td>{customer.carType}</td>
          <td>{customer.miles} miles</td>
          <td>{customer.description}</td>
        </tr>
      )}
      <tr>
        <td><input /></td>
        <td><input /></td>
        <td><input /></td>
        <td><input /></td>
        <td><input /><button>Add customer</button></td>
      </tr>
      </tbody>
    </table>
  )
}


const Page3 = () => {

  const { data, loading, error } = useQuery(getTires);

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
