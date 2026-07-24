import fs from "fs/promises";
import path from "path";

const ADMIN_FILE = path.join(process.cwd(),"data","admin.json");

export async function getAdmin(){

    const data = await fs.readFile(ADMIN_FILE,"utf8");

    return JSON.parse(data);

}