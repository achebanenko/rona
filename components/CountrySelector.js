import { useState } from "react";

import useStats from "../utils/useStats";
import Stats from "./Stats";

export default function CountrySelector() {
  const { stats: countries, loading, error } = useStats(
    "https://covid19.mathdro.id/api/countries"
  );
  const [selectedCountry, setSelectedCountry] = useState("US");

  if (loading || !countries) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  const country = countries.countries.find(
    ({ iso2 }) => iso2 === selectedCountry
  );
  const name = country ? country.name : "";

  return (
    <div>
      <h2>Country {name}</h2>
      <select
        onChange={(e) => {
          setSelectedCountry(e.target.value);
        }}
      >
        {countries.countries.map(({ name, iso2 }) => (
          <option
            key={iso2 || name}
            value={iso2}
            selected={selectedCountry === iso2}
          >
            {name}
          </option>
        ))}
      </select>

      <Stats
        url={`https://covid19.mathdro.id/api/countries/${selectedCountry}`}
      />
    </div>
  );
}
