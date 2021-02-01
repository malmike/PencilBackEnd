import express from "express";
import nconf from "nconf";
import { MongoDBConnection } from "./db_connection";
import questionRoutes from './routes/question';
import cors from "cors";
import healthCheckRoute from "./routes/health-check";

// Read in keys and secrets. Using nconf use can set secrets via
// environment variables, command-line arguments, or a keys.json file.
nconf.argv().env().file('keys.json');

const app = express();
const port = nconf.get('port') || 8080; // default port to listen
const mongoURI = nconf.get('mongoURI');

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
