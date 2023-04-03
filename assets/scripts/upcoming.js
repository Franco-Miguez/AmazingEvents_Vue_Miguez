import {
    mainEvents, mainCategories, search, dataEvents, upcomingEvents
} from "./events.js"
import { mainBanner } from "./banner.js";

async function main() {
    const data = await dataEvents()
    const events = await upcomingEvents(data.events, data.currentDate)
    mainBanner("upcoming events", events)
    mainCategories(events)
    mainEvents(events, "./")
    search(events)
}

main()