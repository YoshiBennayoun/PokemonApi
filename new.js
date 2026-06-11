const express = require("express");

const app = express();
app.use(express.json());
app.get("/", async (req, res) => {
  try {
    const login = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: "orssi",
        password: "admin",
      }),
    });
    const connect = await login.json();
    res.json({
      data: connect,
    });
    console.log(
        connect
    );
    
  } catch (error) {
    res.json({
      error: error,
    });
  }
});

app.get("/pokemons", async (req, res) => {
  try {
    let query = ''
    const {name}=req.query
    if (req.query.name !== null) {
        query = `?name=${name}` 
    }
    const response = await fetch("http://localhost:3000/api/pokemons"+query, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc4MTE3NDg5OCwiZXhwIjoxNzgxMjYxMjk4fQ.qsAALD59B5YcXcOX6qBhqAJbFNPEqAOjj3gTdqp16-c",
      },
    });
    const data = await response.json();
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.json({ error : {
        data:{
            [error.message]:error.message,
            data: error.data
        }
    }});
  }
});

app.get("/pokemons/limit", async (req, res) => {
    let limit = parseInt(req.query.limit);
  try {
    let data = (
      await fetch("http://localhost:3000/api/pokemons?limit=" + limit,{
         headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc4MTE3NDg5OCwiZXhwIjoxNzgxMjYxMjk4fQ.qsAALD59B5YcXcOX6qBhqAJbFNPEqAOjj3gTdqp16-c",
      }
      })
    );
    data = await data.json()
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});
app.listen(3001, () => {
  console.log("http://localhost:3001");
});
