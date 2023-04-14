const server = require("./app.js");
const functions = require("firebase-functions")
const dotenv = require("dotenv")
const { conn } = require("./db.js");
const { test } = require("./Routes/test/controllers.js");

dotenv.config()


conn.sync({ force: true }).then(async () => {
  await test();
  server.listen(process.env.SV_PORT, () => {
    console.log(`Server listening at port ${process.env.SV_PORT}`);
  });
});

exports.api = functions.https.onRequest(server)


