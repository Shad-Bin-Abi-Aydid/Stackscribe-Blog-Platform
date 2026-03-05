import express from 'express';

const app = express();

// test routes
app.get("/", (req, res)=>{
    res.send('Hello, world!');
})


export default app;