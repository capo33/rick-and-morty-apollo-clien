import React, { useCallback, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const GET_CHARACTER_LOCTATION = gql`
  query GetCharacterLocation($name: String!) {
    characters(filter: { name: $name }) {
      results {
        location {
          name
        }
      }
    }
  }
`;

interface Character {
  location: {
    name: string;
  };
}
const Search = () => {
  const [name, setName] = useState("");
  const [click, setClick] = useState(false);

  const [getLocation, { data, loading, error }] = useLazyQuery(
    GET_CHARACTER_LOCTATION,
    {
      variables: {
        name,
      },
    }
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setClick(false);
    setName(e.target.value);
  }, []);

  const handleSearch = useCallback(() => {
    getLocation();
    setClick(true);
  }, [getLocation]);

  return (
    <div>
      {error && <div>Somthing went wronge</div>}
      {loading && <div>Loading...</div>}
      <Link to='/' className='link'>
        Back
      </Link>
      <input type='text' value={name} onChange={handleChange} />
      <button onClick={handleSearch}>Search</button>

      {click ? (
        <ul>
          {data?.characters.results.map(
            (character: Character, index: number) => {
              return <li key={index}>{character.location.name}</li>;
            }
          )}
        </ul>
      ) : (
        <div>No data</div>
      )}
    </div>
  );
};

export default Search;
