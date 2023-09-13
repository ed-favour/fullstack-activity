import express from "express";
import cors from "cors";

import sql from "./db.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

const data = [
  { id: "1", task: "Take a bath", is_completed: true },
  { id: "2", task: "Take a walk", is_completed: true },
  { id: "3", task: "Walk the dog", is_completed: true },
];

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/api/todos", async (req, res) => {
  const todos = await sql`
    SELECT * FROM todos`;
  if (todos) {
    res.status(200).send(todos);
  } else {
    res.status(404).send("Errorrrrrrr. Leave this planet");
  }
  // console.log(todos);
});

app.post("/api/todos", async(req, res) => {
  const newTodo =req.body;
  console.log(newTodo);
  const todos2 = await sql `insert into todos (task, is_completed) values('Eat jellof rice', false)`
   if (todos2) {
    res.status(201).send(`successfully inserted`);
    
   } else {
    res.status(500).send("Internal server error");
    
   }

})



// app.get("/api/todos2", async(req, res) => {
//   let todos2 = await sql `INSERT INTO todos (task, is_completed) VALUES('Eat jellof rice', false)`
//   if (todos2) {
//    res.status(201).send(`successfully inserted`);
   
//   } else {
//    res.status(404).send("Errorrrrrrr. Leave this planet");
   
//   }

// })

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
