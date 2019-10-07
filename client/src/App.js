import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./logo.svg";
import images from "./images/junk_food_subject_graphic.png";
import images2 from "./images/soccer_stadium_subject_graphic.png";
import images3 from "./images/theme_park_subject_graphic.png";

import "./App.css";

function App() {
  const [lessons, setLessons] = useState({});
  const [pageLoaded, setPageLoaded] = useState(false);
  const [filter, setfilter] = useState("");

  useEffect(() => {
    axios
      .get("/api")
      .then(function(response) {
        // handle success
        console.log(response);
        setLessons(response.data);
        setPageLoaded(true);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .finally(function() {
        // always executed
      });
  }, []);

  let filterLesson = event => {
    const { name, value } = event.target;
    setfilter(value);
  };
  return (
    <div>
      <div className="App">
        {pageLoaded ? (
          lessons.map((data, i) => {
            if (data.standard.includes(filter.toUpperCase())) {
              return (
                <div key={i}>
                  <li>
                    {data.name}
                    <br />
                    {data.standard}
                  </li>
                  <img
                    src={require(`./${data.image}`)}
                    alt={data.name}
                    style={{ height: 200, width: 200, marginLeft: 50 }}
                  />
                </div>
              );
            }
          })
        ) : (
          <div>No Matches</div>
        )}
      </div>
      <div>
        <br />
        <br />
        <br />
        Search Below
        <br />
        <input
          type="text"
          style={{
            width: 500,
            height: 30,
            marginTop: 40,
            marginLeft: 40,
            fontSize: 30
          }}
          className="form-control"
          name="filter"
          onChange={filterLesson}
          value={filter}
        />
      </div>
    </div>
  );
}

export default App;
