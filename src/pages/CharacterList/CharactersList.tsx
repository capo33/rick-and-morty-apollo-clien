import React from "react";

import { Link } from "react-router-dom";
import { useCharacters } from "../../hooks/useCharacters";
import "./CharactersList.css";

// Material UI components
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";

const CharactersList = () => {
  const { data, loading, error } = useCharacters();
  console.log(data);

  return (
    <>
      {error && <div>Somthing went wronge</div>}
      {loading && <div>Loading...</div>}
      <div>
        <Link className='link' to='/search'>
          Search for character
        </Link>
      </div>
      <Grid container spacing={2}>
        {data?.characters?.results.map((character: any) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={4} key={character.id}>
              <Link
                style={{ textDecoration: "none", color: "#000" }}
                to={`/${character.id}`}
              >
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      component='img'
                      image={character.image}
                      alt={character.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant='h5' component='div'>
                        {character.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>{" "}
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default CharactersList;
