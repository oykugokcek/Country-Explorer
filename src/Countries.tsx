import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { ShortCountry } from "./types";

interface Props {
  countries: ShortCountry[];
}

export const Countries: React.FC<Props> = ({ countries }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const { register, handleSubmit, control } = useForm({ mode: "onChange" });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [groupTerm, setGroupTerm] = useState<string | null>(null);

  const filteredCountry = (arr: ShortCountry[]) => {
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

  useEffect(() => {
    console.log(selected); 
  }, [selected]);


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
            }}
          />
        </form>
      </div>
      <div className="results">
        {filteredCountry(countries).length > 0 ? (
          <ul className="list">
            {filteredCountry(countries).map((country: ShortCountry) => (
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
