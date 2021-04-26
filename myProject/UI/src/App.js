import React from 'react';
import './App.css';
import gql from "graphql-tag";
import { useQuery } from "react-apollo";

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

  return (
    <table>
      <tr>
        <th>Name</th>
        <th>Phone number</th>
        <th>Car</th>
        <th>Mileage</th>
        <th>Other</th>
      </tr>
      <tr>
        <td>Lily</td>
        <td>1234567</td>
        <td>BMW 2020</td>
        <td>1000km</td>
        <td>-</td>
      </tr>
      <tr>
        <td>Lily2</td>
        <td>4567123</td>
        <td>Audi A4</td>
        <td>60,000km</td>
        <td>Special customer</td>
      </tr>
      <tr>
        <td>Lily3</td>
        <td>1267345</td>
        <td>Toyota corola</td>
        <td>99900km</td>
        <td>-</td>
      </tr>
      <tr>
        <td><input /></td>
        <td><input /></td>
        <td><input /></td>
        <td><input /></td>
        <td><input /><button>Add customer</button></td>
      </tr>
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
      </header>
    </div>
  );
}

export default App;
