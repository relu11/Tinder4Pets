import {
  Card,
  CardContent,
  Container,
  Grid,
  Fab,
  makeStyles,
  Typography,
  Button,
} from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getAdoptionPets,
  adoptPet,
} from "../../redux/actions/adoptionPetsActions";
import AddIcon from "@material-ui/icons/Add";
//import DeleteIcon from "@material-ui/icons/Delete";
import AddAdoptionPetDialog from "./AddAdoptionPetDialog";
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  card: {
    minWidth: 275,
  },
  avatar: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    float: "left",
    marginRight: theme.spacing(1),
  },
  section: {
    marginBottom: theme.spacing(6),
  },
  fab: {
    marginLeft: theme.spacing(2),
  },
  gridItem: {
    marginBottom: theme.spacing(4),
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9,
    backgroundSize: "contain",
  },
  sectionTitle: {
    marginBottom: theme.spacing(4),
  },
}));

function AdoptionPets(props) {
  const { adoptionPets, getAdoptionPets, adoptPet } = props;
  const [dialogOpen, setDialogOpen] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (!adoptionPets) {
      getAdoptionPets();
    }
  });
  return (
    <Container className={classes.root} maxWidth="lg">
      <AddAdoptionPetDialog open={dialogOpen} setOpen={setDialogOpen} />
      {adoptionPets && adoptionPets.length ? (
        <section className={classes.section}>
          <Typography variant="h4" className={classes.sectionTitle}>
            Adoption Pets
            <Fab
              className={classes.fab}
              color="primary"
              aria-label="add"
              size="small"
              onClick={() => setDialogOpen(true)}
            >
              <AddIcon />
            </Fab>
          </Typography>
          <Grid container spacing={4}>
            {adoptionPets.map((e) =>
              e.name != null && e.name != "" ? (
                e.adopted ? (
                  <Grid item>
                    <Card className={classes.card}>
                      <CardContent>
                        <Typography variant="h6">{e.name}</Typography>
                        <Typography>{e.breed}</Typography>
                        <Typography>{e.city}</Typography>
                        <Typography>{e.ageMonths}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ) : (
                  <Grid item>
                    <Card className={classes.card}>
                      <CardContent>
                        <Typography variant="h6">{e.name}</Typography>
                        <Typography>{e.breed}</Typography>
                        <Typography>{e.city}</Typography>
                        <Typography>{e.ageMonths}</Typography>
                        <Button
                          size="small"
                          color="primary"
                          variant="contained"
                          onClick={() => adoptPet(e._id)}
                        >
                          Adopt
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                )
              ) : (
                <div></div>
              )
            )}
          </Grid>
        </section>
      ) : (
        ""
      )}
    </Container>
  );
}

const mapStateToProps = (state) => {
  const { adoptionPets } = state.adoptionPets;

  return { adoptionPets };
};

export default connect(mapStateToProps, { getAdoptionPets, adoptPet })(
  AdoptionPets
);
