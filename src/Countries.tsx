import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { Country } from "./types";

interface Props {
  countries: Country[];
}

export const Countries: React.FC<Props> = ({ countries }) => {
  const [selected, setSelected] = useState<Country | null>(null);
  const { register, handleSubmit, control } = useForm({ mode: "onChange" });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [groupTerm, setGroupTerm] = useState<string | null>(null);
  const [showBox, setShowBox] = useState(false);

  const toggleBox = () => {
    setShowBox(!showBox);
  };

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
          country.continent.name
            .toLowerCase()
            .includes(continentName.toLowerCase())
        );
      }

      if (token.startsWith("lang:")) {
        const languageName = token.substring(5);
        filteredArr = filteredArr.filter(
          (country) =>
            country.languages &&
            country.languages.some((language) =>
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
      setSelected(selectedItem);
    } else {
      setSelected(null);
    }
  }, [searchTerm, countries]);

  const handleCountrySelect = (country: Country) => {
    if (selected === country) {
      setSelected(null);
    } else {
      setSelected(country);
    }
  };
  // useEffect(() => {

  //   const selectedCountry = countries.find((country) => country.code === selected);

  //   if (selectedCountry ) {

  //     console.log("Selected Country:", selectedCountry);
  //     console.log("Country Name:", selectedCountry.name);
  //     console.log("Country Code:", selectedCountry.code);
  //     console.log(selectedCountry.capital)
  //   } else {
  //     console.log("No country selected.");
  //   }}, [selected]);

  // useEffect(() => {
  //   selectedCountry = countries.find(
  //     (country) => country.code === selected
  //   );
  // }, [selected]);

  return (
    

    <div className="container">
      <div className="title">
        {selected ? (
          <div>
            <p>
              <p>
                Seçilen ülke: <span>{selected.name}</span>
              </p>
              Kullanılan {selected.languages.length} dil var.{" "}
            </p>{" "}
            <p>
              {" "}
              Bu diller:{" "}
              {selected.languages.map((language, index) => (
                <span key={language.name}>
                  {language.name}
                  {index !== selected.languages.length - 1 ? ", " : ""}
                </span>
              ))}{" "}
            </p>
            <p> Kıta: {selected.continent.name}</p>
            <p> Başkent: {selected.capital}.</p>
          </div>
        ) : (
          <div>Ülke seçiniz:</div>
        )}
        <form>
          <input
            type="search"
            placeholder="Search"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              console.log(searchTerm);
            }}
          />
        </form>
      </div>
      <div className="box">
      <span onMouseEnter={toggleBox} onMouseLeave={toggleBox}>Nasıl arama yapabilirim?</span>
      {showBox && (
        <div className="">
          <h2>Örnek Arama:</h2>
          <p>Kullanıcı "search:Germany code:FR lang:English" gibi bir arama terimi girdiğinde:</p>
          <ul>
            <li>
              İlk olarak, "search:" terimi ile Almanya'nın adı karşılaştırılır ve Almanya'yı içeren ülkeler bulunur.
            </li>
            <li>
              Ardından, "code:" terimi ile Fransa'nın kodu karşılaştırılır ve Fransa'yı içeren ülkeler bulunur.
            </li>
            <li>
              Son olarak, "lang:" terimi ile İngilizce dili karşılaştırılır ve İngilizce konuşulan ülkeler bulunur.
            </li>
          </ul>
        </div>
      )}
    </div>
      <div className="results">
        {filteredCountry(countries).length > 0 ? (
          <ul className="list">
            {filteredCountry(countries).map((country: Country) => (
              <li
                className={`list_item ${
                  selected && selected.code === country.code ? "selected" : ""
                }`}
                key={country.code}
              >
                <label className="label">
                  <input
                    className="radio-btn"
                    type="radio"
                    name="selectedCountry"
                    value={country.code}
                    checked={selected ? selected.code === country.code : false}
                    onClick={() => handleCountrySelect(country)}
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
