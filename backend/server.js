const express = require("express");
const helmet = require("helmet");
const dbmongo = require("mongoose");
// const cors = require('cors')
const env = require("dotenv");
const morgen = require("morgan");
env.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.get("env") === "dev" && app.use(morgen("tiny"));
// app.use(express.urlencoded({extended: false}))
app.use("/api", require("./todo_routes/todoRoutes"));
// app.use(cors())

const uri = process.env.MONGODB_URI
dbmongo.connect(uri)
.then(() => console.log("*********** Connected ************ ")) 
.catch((error) => {console.log(" +++++++++++++ Connexion failed ++++++++")
process.exit(404)
})

const port_front = process.env.PORT || 5000;
console.log(`MODE ------>  ${app.get("env")}`);
app.listen(port_front, () =>
  console.log(`- Im listening on port ${port_front} just go work -`)
);
