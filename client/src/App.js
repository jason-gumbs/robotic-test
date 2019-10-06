import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./logo.svg";
import images from "./images/junk_food_subject_graphic.png";
import images2 from "./images/soccer_stadium_subject_graphic.png";
import images3 from "./images/theme_park_subject_graphic.png";

// import './App.css';

function App() {
  const [lessons, setLessons] = useState({});
  const [api, setapi] = useState(false);
  useEffect(() => {
    axios
      .get("/api")
      .then(function(response) {
        // handle success
        console.log(response);
        setLessons(response.data);
        setapi(true);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .finally(function() {
        // always executed
      });
  }, []);
  return (
    <div className="App">
      {api
        ? lessons.map((data, i) => (
            <div className="station" key={i}>
              <li>
                {data.name}
                <br />
                {data.standard}
                <img
                  src={require("./images/junk_food_subject_graphic.png")}
                  alt={data.name}
                  style={{ height: 80, width: 80, margin: 30 }}
                />
              </li>
              <br />
              <br />
            </div>
          ))
        : ""}
    </div>
  );
}

export default App;
