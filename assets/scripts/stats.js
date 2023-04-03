import { dataEvents, eventsAddAttendance, pastEvents, statisticsForCategory, upcomingEvents } from "./events.js";
import { mainBanner } from "./banner.js";

// get elemnts the DOM
const eventStatistics = document.querySelector("#events-statistics")
const upcomingStatistics = document.querySelector("#upcoming-statistics")
const pastStatistics = document.querySelector("#past-statistics")

async function main(){
    //create variables whit events
    const data = await dataEvents()
    const upcomingEvent = upcomingEvents(data.events, data.currentDate)
    const pastEvent = pastEvents(data.events, data.currentDate)

    mainBanner("stats", data.events)
    eventsAddAttendance(data.events)
    //create arrays whit statistcs the past and upcoming events
    const pastStatisticsValues = statisticsForCategory(pastEvent)
    const upcomingStatisticsValues = statisticsForCategory(upcomingEvent)
    // sort events for most attendance to lower
    data.events.sort((a,b) =>{
        return a.attendance > b.attendance ?  -1 :
                    a.attendance < b.attendance ? 1 : 0
    })
    //create variables the first table
    const highestAttendance = data.events[0].name
    const lowerAttendance = data.events[ data.events.length - 1 ].name
    const largerCapacity = data.events.reduce((a,b) => a.capacity > b.capacity ? a : b).name

    // insert values in the tables
    eventStatistics.innerHTML = `
                                <td>${highestAttendance}</td>
                                <td>${lowerAttendance}</td>
                                <td>${largerCapacity}</td>
    `

    upcomingStatistics.innerHTML = ""
    upcomingStatisticsValues.forEach(object => {
        upcomingStatistics.innerHTML += `
                                <tr>
                                    <td>${object.name}</td>
                                    <td>$ ${Intl.NumberFormat().format(object.revenues)}</td>
                                    <td>% ${object.attendance.toFixed(2)}</td>
                                </tr>
        `
    })

    pastStatistics.innerHTML = ""
    pastStatisticsValues.forEach(object => {
        pastStatistics.innerHTML += `
                                <tr>
                                    <td>${object.name}</td>
                                    <td>$ ${Intl.NumberFormat().format(object.revenues)}</td>
                                    <td>% ${object.attendance.toFixed(2)}</td>
                                </tr>
        `
    })

}

main()