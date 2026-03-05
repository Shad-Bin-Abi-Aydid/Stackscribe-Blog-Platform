import app from "./app";
import { prisma } from "./lib/prisma";

const PORT = process.env.PORT || 5000;

async function main(){
    try{
        // here we try to connect the prisma first
        await prisma.$connect();
        console.log('connected to the database successfully');

        // now run the server to the specific port
        app.listen(PORT, ()=>{
            console.log(`Server is running on ${PORT}`);
        })


    }catch(err){
        console.error('An error occurred:', err);
        await prisma.$disconnect();
        process.exit(1);
    }
}

main();