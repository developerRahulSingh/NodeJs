const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
let Parser = require("rss-parser");
let parser = new Parser();
// const NewsModel = require("./models/NewsModel");
const RssFeedNewsModel = require("./models/RssFeedNewsModel");

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://rssFeed:password12345@rss-feed.91tow.mongodb.net/rssFeed?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

// app.post("/insert", async (request, response) => {
//   (async () => {
//     let feed = await parser.parseURL("https://coinjournal.net/news/feed/");
//     feed.items.forEach(async (item) => {
//       const creator = item.creator;
//       const title = item.title;
//       const link = item.link;
//       const pubDate = item.pubDate;
//       const comments = item.comments;
//       const content = item.content;
//       const contentSnippet = item.contentSnippet;
//       const guid = item.guid;
//       const categories = item.categories;
//       const isoDate = item.isoDate;

//       const news = new NewsModel({
//         creator: creator,
//         title: title,
//         link: link,
//         pubDate: pubDate,
//         comments: comments,
//         content: content,
//         contentSnippet: contentSnippet,
//         guid: guid,
//         categories: categories,
//         isoDate: isoDate,
//       });
//       try {
//         await news.save();
//         response.send("Inserted");
//       } catch (error) {
//         console.log("error ==>> ", error);
//       }
//     });
//   })();
// });

app.post("/insert", async (request, response) => {
  request.body.rssFeedNewsList.forEach(async (item) => {
    const author = item.author;
    const content = item.content;
    const description = item.description;
    const enclosure = item.enclosure;
    const guid = item.guid;
    const link = item.link;
    const pubDate = item.pubDate;
    const title = item.title;

    const news = new RssFeedNewsModel({
      author: author,
      content: content,
      description: description,
      enclosure: enclosure,
      guid: guid,
      link: link,
      pubDate: pubDate,
      title: title,
    });
    try {
      await news.save();
      response.send("Inserted");
    } catch (error) {
      console.log("error ==>> ", error);
    }
  });
});

app.get("/read", async (request, response) => {
  RssFeedNewsModel.find({}, (error, result) => {
    if (error) {
      console.log("error ==>> ", error);
    } else {
      response.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
