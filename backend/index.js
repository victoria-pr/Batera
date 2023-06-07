import express from "express"; //IMportamos express
import router from "./routes/router.js";
/*import passport from "passport";
import cookieParser from "cookie-parser";*/
import cors from "cors";
import verified from "./middlewares/jwt.js";

const app = express(); //Creamos una pp de express
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/* app.use(passport.initialize());
app.use(cookieParser()); */

app.get("/", verified, (req, res) => {
  res.send("Hello grannys");
});

app.use("/api", router);

app.listen(3000, () => {
  //INDICAMOS que el servidor escuche en el puerto 3000
  console.log("Server is running in port 3100");
});
