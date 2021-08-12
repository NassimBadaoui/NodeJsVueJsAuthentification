const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();


const db = require("./models");
/*db.sequelize.sync();*/

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});


require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

function initial() {
  db.role.create({
    id: 1,
    name: "user"
  });
 
  db.role.create({
    id: 2,
    name: "moderator"
  });
 
  db.role.create({
    id: 3,
    name: "admin"
  });
}

var corsOptions = {
    origin: "http://localhost:8081"
  };
  
  app.use(cors(corsOptions));
  
  // parse requests of content-type - application/json
  app.use(bodyParser.json());
  
  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));
  
  // simple route
  app.get("/", (req, res) => {
    res.json({ message: "Welcome to SonGoku application." });
  });
  
  // set port, listen for requests
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });