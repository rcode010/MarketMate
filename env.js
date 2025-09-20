import { config } from "dotenv";

config({path:".env.development"});

export const {PORT, DB_URL,
      ACCESS_TOKEN,
      REFRESH_TOKEN,
      REDIS_URL,
      NODE_ENV,CLOUDINARY_CLOUD_NAME,
      CLOUDINARY_API_KEY,
      CLOUDINARY_API_SECRET,
      ARCJET_ENV,
      ARCJET_KEY,
      CORS_ORIGIN
    } = process.env;