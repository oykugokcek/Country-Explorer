import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { ShortCountry } from "./types";

interface Props {
  countries: any[]; // Eğer "countries" bir dizi ise, bu şekilde belirtebilirsiniz. Daha spesifik bir tür kullanmanız daha iyi olur.
}

export const Countries: React.FC<Props> = ({ countries }) => {
  const [selected, setSelected] = useState("");
  const { register, handleSubmit, control } = useForm({ mode: "onChange" });
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCountry = (arr: ShortCountry[]) => {
    const filteredArr = arr.filter((country) => {
      return country.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return filteredArr;
  };
  const handleCountrySelect = (countryCode: string) => {
    setSelected(countryCode);
  };

  return (
    <div>
      <form>
        <input
          type="search"
          placeholder="search"
          onChange={(e) => {
            setSearchTerm(e.target.value);
            console.log(e.target.value);
          }}
        />
      </form>
      <h1>Ülkeler</h1>
      {filteredCountry(countries).length > 0 ? (
        <ul>
           {filteredCountry(countries).map((country: ShortCountry) => (
            <li key={country.code}>
              <label>
                <input
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
