import express from "express";
import dotenv from "dotenv";
import { MongoDBConnection } from "./db_connection";
import questionRoutes from './routes/question';
import cors from "cors";
import healthCheckRoute from "./routes/health-check";

// initialize configuration
dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 8080; // default port to listen
const mongoURI = process.env.MONGO_URI || "";

// setup database connection
const mongodb = new MongoDBConnection(mongoURI)

app.use(cors());
app.use("/healthcheck", healthCheckRoute());
app.get("/", (req, res) => {
    res.send('Welcome to pencil backend');
});

app.use('/search', questionRoutes(mongodb));

// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
});
