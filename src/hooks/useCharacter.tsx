import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const GET_CHARACTER = gql`
  query ($id: ID!) {
    # ! means that this is a required parameter / $id: ID! is a required parameter
    character(id: $id) {
      id
      name
      image
      gender
      episode {
        name
        episode
      }
    }
  }
`;

const useCharacter = () => {
  const { id } = useParams();
  const { data, error, loading } = useQuery(GET_CHARACTER, {
    variables: { id },
  });

  return { data, error, loading };
};

export default useCharacter;
