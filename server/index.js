import express from "express";
import cors from "cors";

import sql from "./db.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"
import options from "./swagger.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

app.use(express.json())

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
  const  { task, is_completed } =req.body;
  // console.log(newTodo);
  const todos2 = await sql `INSERT INTO todos (task, is_completed) VALUES (${task}, ${is_completed}) RETURNING *`
   if (todos2) {
    res.status(201).send(todos2);
    
   } else {
    res.status(500).send("Internal server error");
    
   }

})


app.put("/api/todos2/:id", async (req, res) => {
  const { id } = req.params;
  const { task, is_completed } = req.body;

  try {
    const updatedTodo = await sql`
      UPDATE todos
      SET task = ${task}, is_completed = ${is_completed}
      WHERE id = ${id}
      RETURNING *
    `;

    if (updatedTodo && updatedTodo.length > 0) {
      res.status(200).json(updatedTodo[0]);
    } else {
      res.status(404).send("Todo not found");
    }
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).send("Internal server error");
  }
});

app.delete("/api/todos2/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTodo = await sql`DELETE FROM todos WHERE id = ${id} RETURNING *`;
    
    if (deletedTodo && deletedTodo.length > 0) {
      res.status(200).json(deletedTodo[0]);
    } else {
      res.status(404).send("Todo not found");
    }
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).send("Internal server error");
  }
});


// app.get("/api/todos2", async(req, res) => {
//   let todos2 = await sql `INSERT INTO todos (task, is_completed) VALUES('Eat jellof rice', false)`
//   if (todos2) {
//    res.status(201).send(`successfully inserted`);
   
//   } else {
//    res.status(404).send("Errorrrrrrr. Leave this planet");
   
//   }

// })

const specs = swaggerJSDoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

const PORT = 3000
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
