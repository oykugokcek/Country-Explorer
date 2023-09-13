import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { Country } from "./types";

interface Props {
  countries: Country[];
}

export const Countries: React.FC<Props> = ({ countries }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const { register, handleSubmit, control } = useForm({ mode: "onChange" });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [groupTerm, setGroupTerm] = useState<string | null>(null);


  const filteredCountry = (arr: Country[]) => {
    let filteredArr = arr;
  
    const queryTokens = searchTerm.split(" ");
  
    for (const token of queryTokens) {
      if (token.startsWith("search:")) {
        const keyword = token.substring(7);
        filteredArr = filteredArr.filter((country) =>
          country.name.toLowerCase().includes(keyword.toLowerCase())
        );
      }
  
      if (token.startsWith("code:")) {
        const field = token.substring(5);
        filteredArr = filteredArr.filter((country) =>
          country.code.toLowerCase().includes(field.toLowerCase())
        );
      }
  
      if (token.startsWith("continent:")) {
        const continentName = token.substring(10);
        filteredArr = filteredArr.filter((country) =>
          country.continent.name.toLowerCase().includes(continentName.toLowerCase())
        );
      }
  
      if (token.startsWith("lang:")) {
        const languageName = token.substring(5);
        filteredArr = filteredArr.filter((country) =>
          country.languages &&
          country.languages.some(
            (language) =>
              language.name.toLowerCase().includes(languageName.toLowerCase())
          )
        );
      }
  
      if (token.startsWith("capital:")) {
        const capitalName = token.substring(8);
        filteredArr = filteredArr.filter((country) =>
          country.capital.toLowerCase().includes(capitalName.toLowerCase())
        );
      }
    }
  
    return filteredArr.slice(0, 10);
  };
  

  useEffect(() => {
    const filteredItems = filteredCountry(countries);
    if (filteredItems.length > 0) {
      const selectedItem =
        filteredItems.length >= 10
          ? filteredItems[9] 
          : filteredItems[filteredItems.length - 1]; 
      setSelected(selectedItem.code);
    } else {
      setSelected(null); 
    }
  }, [searchTerm, countries]);

  const handleCountrySelect = (countryCode: string) => {
    if (selected === countryCode) {
      setSelected(null); 
    } else {
      setSelected(countryCode); 
    }
  };

  // useEffect(() => {
  //   console.log(selected);
  
  //   const selectedCountry = countries.find((country) => country.code === selected);
  
  //   if (selectedCountry ) {
  //  
  //     console.log("Selected Country:", selectedCountry);
  //     console.log("Country Name:", selectedCountry.name);
  //     console.log("Country Code:", selectedCountry.code);
  //     console.log(selectedCountry.capital)
  //   } else {
  //     console.log("No country selected.");
  //   }}, [selected]);


  return (
    <div className="container">
      <div className="title">
        <h1>Countries</h1>
        <form>
          <input
            type="search"
            placeholder="Search"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              console.log(searchTerm)
            }}
          />
        </form>
      </div>
      <div className="results">
        {filteredCountry(countries).length > 0 ? (
          <ul className="list">
            {filteredCountry(countries).map((country: Country) => (
              <li
                className={`list_item ${
                  selected === country.code ? "selected" : ""
                }`}
                key={country.code}
              >
                <label className="label">
                  <input
                    className="radio-btn"
                    type="radio"
                    name="selectedCountry"
                    value={country.code}
                    checked={selected === country.code}
                    onClick={() => handleCountrySelect(country.code)}
                  />
                  {country.name}
                </label>
              </li>
            ))}
          </ul>
        ) : (
          <p>There is no result...</p>
        )}
      </div>
    </div>
  );
};
