import * as express from "express";
import * as bodyParser from "body-parser";

import log from "./log";

import mailchimpRouter from "./routers/mailchimp";

const app = express();
app.use(bodyParser.json());

app.use("/mailchimp", mailchimpRouter);

app.listen(process.env.PORT || 5000, () => {
  log.info("app running");
});
