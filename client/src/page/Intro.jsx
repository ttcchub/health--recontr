import React, { useState } from "react";
import ButtonIcon from "../component/button/ButtonIcon";
import Input from "../component/form_Input/Input";
import classes from "./Intro.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

export default function Intro() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  return (
    <div className={classes.intro}>
      <header>
        <h2>Find Health Facilities and Professionals in Finland</h2>
        <form className="searchBar" action="/hospital" method="get" target="/hospital">
          <Input type="search" placeholder="Name of Health Facility/Service/Professional... " onChange={(e) => setSearch(e.target.value)} />
          <Input type="search" placeholder="Location" onChange={(e) => setLocation(e.target.value)} />
          <button type="submit">
            <SearchIcon fontSize="large" />
            Search
          </button>
        </form>
      </header>

      <main>
        <section className="searchBtns">
          <Link to="/hospital">
            <ButtonIcon children="Health Facilities +" icon="fa-solid fa-hospital" />
          </Link>

          <Link to="/hospital">
            <ButtonIcon children="Health Services +" icon="fa-solid fa-kit-medical" />
          </Link>

          <Link to="/hospital">
            <ButtonIcon children="Doctors +" icon="fa-solid fa-user-doctor" />
          </Link>

          <Link to="/post">
            <ButtonIcon children="Read More +" icon="fa-solid fa-info" />
          </Link>
        </section>
        <article className="regisStats">
          <p> 100 million Registered Users</p>
          <p>500 Registered Hospitals</p>
          <p>50 million Registered Professionals</p>
          <p>100 thousand Registered Services</p>
        </article>
      </main>
      <footer className="contact">
        <p>
          Our Address: <i class="fa-solid fa-location-dot"> Helsink BC</i>
        </p>
        <p>
          Call Us: <i class="fa-solid fa-phone"> +358xxxxxxxxx</i>
        </p>
        <p>
          Our Email: <i class="fa-solid fa-envelope"> info@example.com</i>
        </p>
        <p>&copy; 2022</p>
      </footer>
    </div>
  );
}
