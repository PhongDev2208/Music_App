import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import { connect as connectDatabase } from './config/database';
import clientRoutes from "./routes/client/index.route";
import adminRoutes from "./routes/admin/index.route";
import { systemConfig } from "./config/system";
import bodyParser from "body-parser";
import methodOverride from "method-override";

connectDatabase();

const app: Express = express();
const port: string | number = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOverride("_method"));

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

/* New Route to the TinyMCE Node module */
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

app.use(express.static(`${__dirname}/public`));

// App Local Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Routes
adminRoutes(app);
clientRoutes(app);

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
