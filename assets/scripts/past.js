import {
        mainEvents, mainCategories, search, dataEvents, pastEvents
} from "./events.js"
import { mainBanner } from "./banner.js";

async function main() {
    const data = await dataEvents()
    const events = await pastEvents(data.events, data.currentDate)
    mainBanner("past events", events)
    mainCategories(events)
    mainEvents(events, "./")
    search(events)
}

main()