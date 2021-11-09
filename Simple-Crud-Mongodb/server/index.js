const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const FoodModel = require("./models/Food");

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://user:Password12345@crud.i8tsr.mongodb.net/food?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

app.post("/insert", async (request, response) => {
  const foodName = request.body.foodName;
  const days = request.body.days;
  const food = new FoodModel({ foodName: foodName, daySinceIAte: days });
  try {
    await food.save();
    response.send("Inserted");
  } catch (error) {
    console.log("error ==>> ", error);
  }
});

app.get("/read", async (request, response) => {
  FoodModel.find({}, (error, result) => {
    if (error) {
      console.log("error ==>> ", error);
    } else {
      response.send(result);
    }
  });
});

app.get("/find", async (request, response) => {
  const foodName = request.body.foodName;
  FoodModel.find({ $where: { foodName: foodName } }, (error, result) => {
    if (error) {
      console.log("error ==>> ", error);
    } else {
      response.send(result);
    }
  });
});

app.put("/update", async (request, response) => {
  const updateFoodName = request.body.updateFoodName;
  const id = request.body.id;

  try {
    await FoodModel.findById(id, (error, updatedFoodName) => {
      updatedFoodName.foodName = updateFoodName;
      updatedFoodName.save();
      response.send("update");
    });
  } catch (error) {
    console.log("error ==>> ", error);
  }
});

app.delete("/delete/:id", async (request, response) => {
  const id = request.params.id;
  await FoodModel.findByIdAndRemove(id).exec();
  response.send("Deteled");
});

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
