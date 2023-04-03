import {
        mainEvents, mainCategories, search, dataEvents, orderEvents
} from "./events.js"

async function main() {
    const data = await dataEvents("./assets/data/amazing.json")
    const events = await orderEvents(data.events)
//    mainCategories(events)
    //mainEvents(events, "./page/")
    search(events, "./page/")
}

main()