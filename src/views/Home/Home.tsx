import React from "react";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import Routes from "../../routes/routes";

const Home = () => (
  <div>
    <Button as={Link} to={Routes.ListOfAuthors}>
      Open list of authors
    </Button>
  </div>
);

export default Home;
