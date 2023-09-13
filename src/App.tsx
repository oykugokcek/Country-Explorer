import React, { useEffect, useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  useQuery,
} from "@apollo/client";
import "./App.css";
import { Country } from "./types";
import { Countries } from "./Countries";

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com",
  cache: new InMemoryCache(),
});

const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      name
      code
      capital
      languages {
        name
      }
      continent {
        name
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_COUNTRIES, { client });
  const [countries, setCountries] = useState<Country[]>([]); 

  useEffect(() => {
    if (!loading && !error) {
      setCountries(data.countries);
      console.log(data)
    }
  }, [loading, error, data]);

  return (
    <div className="App">
      <Countries countries={countries} />
    </div>
  );
}

export default App;
