import * as express from "express";
import asyncHandler from "express-async-handler";
import fetch from "node-fetch";

const URL = "https://us18.api.mailchimp.com/3.0/lists/c4134a41f4/members";
const API_KEY = "7c99bc77b56744ee691e9c02b3639262-us18";

const router = express.Router();

router.post(
  "/",
  asyncHandler(async (request, resp) => {
    try {
      const { email } = request.body;

      if (!email) {
        throw new Error("Email is required");
      }

      const data = {
        email_address: email,
        status: "subscribed"
      };

      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `apikey ${API_KEY}`
        },
        body: JSON.stringify(data)
      });

      resp.status(200).send({ success: true, message: response });
    } catch (e) {
      resp.status(400).send({ error: true, message: e });
    }
  })
);

export default router;
