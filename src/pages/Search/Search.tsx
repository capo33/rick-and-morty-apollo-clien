import React, { useCallback, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import FormControl from "@mui/joy/FormControl";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";

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

  const handleSearch = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      getLocation();
      setClick(true);
    },
    [getLocation]
  );

  return (
    <div>
      {error && <div>Somthing went wronge</div>}
      {loading && <div>Loading...</div>}
      <Link to='/' className='link'>
        Back
      </Link>

      <form onSubmit={handleSearch}>
        <FormControl>
          <Input
            sx={{ "--Input-decoratorChildHeight": "45px" }}
            size='md'
            style={{ width: "300px" }}
            placeholder='Search for character'
            type='text'
            value={name}
            onChange={handleChange}
            endDecorator={
              <Button
                variant='solid'
                color='primary'
                type='submit'
                sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
              >
                Search
              </Button>
            }
          />
        </FormControl>
      </form>
      {click ? (
        <ul>
          {data?.characters.results.map(
            (character: Character, index: number) => {
              return <li key={index}>{character.location.name}</li>;
            }
          )}
        </ul>
      ) : (
        <p>No data</p>
      )}
    </div>
  );
};

export default Search;
