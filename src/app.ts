import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import healthCheckRoute from "./routes/health-check";

// initialize configuration
dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 8080; // default port to listen

app.use(cors());
app.use("/healthcheck", healthCheckRoute());
app.get("/", (req, res) => {
    res.send('Welcome to pencil backend');
});

// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );
