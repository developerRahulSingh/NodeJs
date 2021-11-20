import React, { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";
import moment from "moment";

function App() {
  const date = new Date();
  date.setDate(date.getDate() - 7);
  // console.log("date ==>> ", date);
  const [newsList, setNewsList] = useState([]);
  const [rssFeedNewsList, setRssFeedNewsList] = useState([]);
  const baseUrl = "https://cointelegraph.com/rss/tag/altcoin";

  const corsUrl = "https://api.rss2json.com/v1/api.json?rss_url=";

  useEffect(() => {
    Axios.get(`${corsUrl}${baseUrl}`).then((feed) => {
      setRssFeedNewsList(feed.data.items);
      getNewsList();
    });
  }, []);

  const getNewsList = () => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setNewsList(response.data);
      localStorage.setItem("rssFeed", JSON.stringify(response.data));
    });
  };
  const insertNewsList = () => {
    let find = Boolean;
    var storedNames = JSON.parse(localStorage.getItem("rssFeed"));
    storedNames.map((result) => {
      console.log("Pub Date ==>> ",result.pubDate);
      const dateTime2 = moment(result.pubDate).format("YYYY-MM-DD");
      console.log("Date time ==>> ", dateTime2)
      return (find = rssFeedNewsList.some((res) => res.title === result.title));
      
    });
    console.log("date ==>> ", date);
    if (find) {
      console.log("Already existed ==>>");
    } else {
      Axios.post("http://localhost:3001/insert", {
        rssFeedNewsList: rssFeedNewsList,
      }).then((response) => {
        getNewsList();
      });
    }
  };

  return (
    <div className="App">
      <h1>RSS-Feed</h1>
      {newsList.map((result) => {
        return <div key={result._id}>{result.title}</div>;
      })}
      <button onClick={insertNewsList}>Refress</button>
    </div>
  );
}

export default App;
