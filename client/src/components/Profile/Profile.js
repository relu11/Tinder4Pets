import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Container,
  Fab,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setUpProfile } from "../../redux/actions/usersActions";
import AddIcon from "@material-ui/icons/Add";
import AddPetDialog from "./AddPetDialog";

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
    marginLeft: theme.spacing(6),
  },
  gridItem: {
    marginBottom: theme.spacing(4),
  },
  petMedia: {
    height: 0,
    paddingTop: "56.25%", // 16:9,
    backgroundSize: "contain",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9,
  },
  sectionTitle: {
    marginBottom: theme.spacing(4),
  },
}));

function Profile(props) {
  const { events, pets, adoptedPets, setUpProfile, currentUser } = props;
  const [dialogOpen, setDialogOpen] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (!events && !pets && !adoptedPets) {
      setUpProfile();
    }
  });
  return (
    <Container className={classes.root} maxWidth="lg">
      <section className={classes.section}>
        <Typography variant="h4">
          <Avatar className={classes.avatar}>{currentUser.name[0]}</Avatar>
          {currentUser.name}
        </Typography>
      </section>
      <section className={classes.section}>
        <Typography variant="h4" className={classes.sectionTitle}>
          Your pets
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
        <Grid container spacing={2}>
          {pets &&
            pets.map((p) => (
              <Grid item key={p._id} className={classes.gridItem}>
                <Card className={classes.card}>
                  <CardMedia
                    image={`/${p.type === "dog" ? "dog" : "cat"}-icon.png`}
                    className={classes.petMedia}
                  />
                  <CardContent>
                    <Typography variant="h6">{p.name}</Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      {p.type}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      {p.ageMonths} Months
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      {p.breed}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      {p.lookingForMatch ? "Looking" : "Not looking"} for match
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
        <AddPetDialog open={dialogOpen} setOpen={setDialogOpen} />
      </section>
      {adoptedPets && adoptedPets.length ? (
        <section className={classes.section}>
          <Typography variant="h4">Your Past Events</Typography>
          <Grid container>
            {pets &&
              adoptedPets.map((ap) => (
                <Grid item>
                  <Card className={classes.card}>
                    <CardMedia
                      image={`/${ap.type === "dog" ? "dog" : "cat"}-icon.png`}
                      className={classes.petMedia}
                    />
                    <CardContent>
                      <Typography variant="h6">{ap.name}</Typography>
                      <Typography>{ap.ageMonths} Months</Typography>
                      <Typography>{ap.breed}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </section>
      ) : (
        ""
      )}
      {events && events.length ? (
        <section className={classes.section}>
          <Typography variant="h4">Your Past Events</Typography>
          <Grid container>
            {events &&
              events.map((e) => (
                <Grid item>
                  <Card className={classes.card}>
                    <CardMedia
                      image="event-icon.png"
                      className={classes.media}
                    />
                    <CardContent>
                      <Typography variant="h6">{e.name}</Typography>
                      <Typography>{e.time}</Typography>
                      <Typography>{e.city}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </section>
      ) : (
        ""
      )}
    </Container>
  );
}

const mapStateToProps = (state) => {
  const { events, pets, adoptedPets } = state.user;
  const { currentUser } = state.auth;
  return { events, pets, adoptedPets, currentUser };
};

export default connect(mapStateToProps, { setUpProfile })(Profile);
