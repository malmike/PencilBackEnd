import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// initialize configuration
dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 8080; // default port to listen

app.use(cors());

// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );
