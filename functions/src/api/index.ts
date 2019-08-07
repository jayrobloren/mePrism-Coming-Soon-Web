import express from "express";
import { https } from "firebase-functions";

import mailchimpRouter from "./routers/mailchimp";

const app = express();

app.use("/mailchimp", mailchimpRouter);

export const api = https.onRequest(app);
