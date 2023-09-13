import React, { useEffect, useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  useQuery,
} from "@apollo/client";
import "./App.css";
import { ShortCountry } from "./types";
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
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_COUNTRIES, { client });
  const [countries, setCountries] = useState<ShortCountry[]>([]); // Boş bir dizi olarak başlatıyoruz

  useEffect(() => {
    if (!loading && !error) {
      setCountries(data.countries);
    }
  }, [loading, error, data]);

  return (
    <div className="App">
      <Countries countries={countries} />
      <Countries countries={countries} />
    </div>
  );
}

export default App;
