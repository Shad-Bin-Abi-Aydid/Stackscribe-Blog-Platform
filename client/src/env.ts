import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
    // that are the validation part
    server:{
        BACKEND_URL: z.url(),
        FRONTEND_URL: z.url(),
        API_URL: z.url(),
        AUTH_URL: z.url(),
        RESEND_API_KEY: z.string(),

    },
    // client:{

    // },
    runtimeEnv:{
        BACKEND_URL: process.env.BACKEND_URL,
        FRONTEND_URL: process.env.FRONTEND_URL,
        API_URL: process.env.API_URL,
        AUTH_URL: process.env.AUTH_URL,
        RESEND_API_KEY: process.env.RESEND_API_KEY,

    }

})