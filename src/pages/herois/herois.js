import React, { useEffect, useState } from "react";
import {
  TextField,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Box,
  Typography,
  Modal,
  Container,
  Grid,
} from "@material-ui/core";
import { Scrollbars } from "react-custom-scrollbars";
import getHerois from "../../services/herois";

function Herois() {
  const [heros, setHeros] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedHeros, setSelectedHeros] = useState([]);
  const [open, setOpen] = useState(false);
  const [winner, setWinner] = useState("");
  const [hero1, setHero1] = useState([]);
  const [hero2, setHero2] = useState([]);

  useEffect(() => {
    getHerois().then((items) => {
      setHeros(items);
    });
  }, []);

  const handleWinner = (hero1, hero2) => {
    if (handleStats(hero1) > handleStats(hero2)) {
      return `O vencedor é ${hero1.name}`;
    } else if (handleStats(hero1) < handleStats(hero2)) {
      return `O vencedor é ${hero2.name}`;
    } else {
      return "O resultado foi empate";
    }
  };

  const handleStats = (hero) => {
    let total = 0;
    for (let stats in hero.powerstats) {
      total += hero.powerstats[stats];
    }
    return total;
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleSelectedHeros = (event) => {
    const valor = [...selectedHeros, parseInt(event.target.id)];
    setSelectedHeros(valor);
  };

  useEffect(() => {
    if (selectedHeros.length >= 2) {
      const firstHero = heros.find((heroi) => heroi.id === selectedHeros[0]);
      const secondHero = heros.find((heroi) => heroi.id === selectedHeros[1]);
      setHero1(firstHero);
      setHero2(secondHero);
      setWinner(handleWinner(firstHero, secondHero));
      setOpen(true);
      setSelectedHeros([]);
    }
  }, [selectedHeros, handleWinner, heros]);

  return (
    <div>
      <Container>
        <TextField
          fullWidth
          id="filled-basic"
          label="Procurar Heroi"
          variant="filled"
          className="search"
          onChange={handleSearch}
          sx={styles.pesquisa}
        />
        <Scrollbars style={styles.lista}>
          <ImageList sx={styles.espacoLista} cols={3}>
            {heros
              .filter((heroi) =>
                search !== ""
                  ? heroi.name.toLowerCase().includes(search.toLowerCase())
                  : true
              )
              .map((item) => (
                <div
                  key={item.id}
                  style={
                    selectedHeros.find((id) => id === item.id) &&
                    styles.selecionado
                  }
                >
                  <ImageListItem
                    sx={{ m: 1, border: "1px solid #000", borderRadius: "3px" }}
                  >
                    <img
                      onClick={handleSelectedHeros}
                      src={`${item.images.md}?w=248&fit=crop&auto=format`}
                      srcSet={`${item.images.md}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      alt={item.name}
                      id={item.id}
                      loading="lazy"
                    />
                    <ImageListItemBar title={item.name} />
                  </ImageListItem>
                </div>
              ))}
          </ImageList>
        </Scrollbars>

        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box container sx={styles.modal} text-allign="center">
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
              sx={{ color: "white" }}
            >
              <Grid sx={{ textAlign: "center" }}>
                <img src={hero1.images && hero1.images.sm} alt={hero1.name} />
                <p>{hero1.name}</p>
              </Grid>
              <Grid sx={{ textAlign: "left", ml: 1 }}>
                <p>
                  Intelligence:{" "}
                  {hero1.powerstats && hero1.powerstats.intelligence}
                </p>
                <p>Strength:{hero1.powerstats && hero1.powerstats.strength}</p>
                <p>Speed:{hero1.powerstats && hero1.powerstats.speed}</p>
                <p>
                  Durability:
                  {hero1.powerstats && hero1.powerstats.durability}
                </p>
                <p>Power:{hero1.powerstats && hero1.powerstats.power}</p>
                <p>Combat:{hero1.powerstats && hero1.powerstats.combat}</p>
              </Grid>
              <Grid sx={{ m: 2 }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  {winner}
                </Typography>
              </Grid>
              <Grid sx={{ textAlign: "right", mr: 1 }}>
                <p>
                  Intelligence:{" "}
                  {hero2.powerstats && hero2.powerstats.intelligence}
                </p>
                <p>Strength:{hero2.powerstats && hero2.powerstats.strength}</p>
                <p>Speed:{hero2.powerstats && hero2.powerstats.speed}</p>
                <p>
                  Durability:
                  {hero2.powerstats && hero2.powerstats.durability}
                </p>
                <p>Power:{hero2.powerstats && hero2.powerstats.power}</p>
                <p>Combat:{hero2.powerstats && hero2.powerstats.combat}</p>
              </Grid>
              <Grid sx={{ textAlign: "center" }}>
                <img src={hero2.images && hero2.images.sm} alt={hero2.name} />
                <p>{hero2.name}</p>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </Container>
    </div>
  );
}

const styles = {
  pesquisa: {
    border: "1px solid #000000",
    borderRadius: "8px",
    boxShadow: 10,
    mb: 3,
  },

  espacoLista: {
    bgcolor: "#B0C4DE",
    borderRadius: "8px",
    p: 2,
  },

  lista: {
    width: 1150,
    height: 850,
    borderRadius: "8px",
    boxShadow: 20,
  },

  selecionado: {
    border: "5px solid #00FF7F",
    bgcolor: "#00FF7F",
  },

  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
    bgcolor: "#2F4F4F",
    border: "2px solid #000",
    boxShadow: 20,
    p: 10,
  },
};

export default Herois;
