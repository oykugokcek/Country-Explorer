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

  const filteredCountry = (arr: ShortCountry[]) => {
    return arr.filter((country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleCountrySelect = (countryCode: string) => {
    setSelected(countryCode);
  };

  return (
    <div className="container">
      <div className="title">
        <h1>Ülkeler</h1>
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
                  onChange={() => handleCountrySelect(country.code)}
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
  );
};

