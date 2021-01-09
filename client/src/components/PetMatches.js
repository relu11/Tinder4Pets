import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { clearPetMatches, setPetMatches } from "../redux/actions/petsActions";
import { Card } from "@material-ui/core";

function PetMatches({ setPetMatches, clearPetMatches, matches }) {
  const [fetched, setFetched] = useState(false);
  const { petId } = useParams();
  console.log(matches);
  useEffect(() => {
    if (!fetched) {
      setPetMatches(petId);
      setFetched(true);
    }
    return () => {
      clearPetMatches();
    };
  }, [fetched, petId, setPetMatches, setFetched, clearPetMatches]);
  return (
    <div>
      <h3>Here is your matches</h3>
      {matches &&
        matches.map((m) => (
          <Card key={m._id}>
            <p>{m.name}</p>
            <p>{m._id}</p>
            <p>{m.breed}</p>
            <p>{m.ageMonths}</p>
            <p>{m.city}</p>
          </Card>
        ))}
    </div>
  );
}

const matchStateToProps = (state) => ({
  matches: state.pets.matches,
  fetched: state.pets.fetched,
});

export default connect(matchStateToProps, { setPetMatches, clearPetMatches })(
  PetMatches
);
