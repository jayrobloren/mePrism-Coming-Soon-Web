import * as cors from "cors";

const whitelist = ["localhost:3000", "https://meprism-promo.firebaseapp.com"];

const corsOptions = {
  origin: whitelist
};

export const corsMiddleware = cors(corsOptions);
