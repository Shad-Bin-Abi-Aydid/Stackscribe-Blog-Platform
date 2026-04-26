import express from 'express';
import { postRouter } from './modules/posts/post.router';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth';
import cors from 'cors'
import { commentRouter } from './modules/comment/comment.router';
import errorHandler from './middlewares/globalErrorHandler';
import { notFound } from './middlewares/notFound';

const app = express();

const allowedOrigins = [
    process.env.APP_URL || "http://localhost:4000",
    "http://localhost:3000",
    "http://localhost:3001",
    "https://stackscribe-blog-platform.vercel.app",
    "https://stackscribe-blog-platform-shad-aydids-projects.vercel.app",
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}))

app.use(express.json());

app.all('/api/auth/{*any}', toNodeHandler(auth));

// test routes
app.get("/", (req, res)=>{
    res.send('Hello, world!!!!');
})

// Post route
app.use('/posts',postRouter);

// Comment Route
app.use("/comment", commentRouter)

app.use(notFound);

// global error handler
app.use(errorHandler);
export default app;