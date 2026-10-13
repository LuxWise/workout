import { MongoClient } from "mongodb";
import { runSeed } from "../lib/seed";

async function main() {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("Falta MONGODB_URI (usa un archivo .env)");

    const client = await new MongoClient(uri).connect();
    try {
        const { routines, days } = await runSeed(client.db(process.env.MONGODB_DB ?? "workout"));
        console.log(`Seed listo: ${routines} rutinas, ${days} días y textos de la página.`);
    } finally {
        await client.close();
    }
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
