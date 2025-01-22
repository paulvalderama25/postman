const {Client}=require('pg')
const express = require("express");

const app = express();
app.use(express.json());

const con=new Client({
    host: "localhost",
    user: "postgres",
    port: 5433,
    password: "postgres25",
    database: "postgres"
})

con.connect().then(() => console.log("connected"))

app.post('/postData', (req, res) => {req
    const {name, id} = req.body

    const insert_query='INSERT INTO postmantable (name,id) VALUES (Paul, 1)'

    con.query(insert_query,[name,id], (err, result) => {
        if(err){
            res.send(err)
        } else {
            console.log(result)
            res.send("POSTED DATA")
        }
    })

})


app.get("/", (req, res) => {
    res.send("Hello World!");
});

const PORT = 8080;

app.listen(PORT,
    console.log(`Server started on port ${PORT}`)
);
