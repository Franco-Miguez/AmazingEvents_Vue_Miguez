import { dataEvents } from "./events.js";
import { mainBanner } from "./banner.js";

async function main(){
    const data = await dataEvents()
    mainBanner("contact", data.events)
}

main()