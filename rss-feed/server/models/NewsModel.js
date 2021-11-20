const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
  creator: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  pubDate: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: true,
  },
  contentSnippet: {
    type: String,
    required: true,
  },
  guid: {
    type: String,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
  },
  isoDate: {
    type: String,
    required: true,
  },
});

const News = mongoose.model("News", NewsSchema);

module.exports = News;