/**
 * @param {string} path of api or json for defaut it's ../assets/data/amazing.json
 * @returns json
 */
export async function dataEvents(path="../assets/data/amazing.json"){
    let data = await fetch(path)
                    .then(response => response.json())
                    .then(data => data)
    return data
}

/**
 * create event card and add it to the element whit id content-card
 * @param {array} events array the events
 * @param {string} pathPage path to the page for defaut it's ./
 */
export async function mainEvents(events, pathPage="./"){
    const contentCards = document.getElementById("content-cards")


    contentCards.appendChild(createCardEvents(events, pathPage))

}

/**
 * add checkbox the categories to the element whit id content-categories
 * @param {array} events array the events
 */
export async function mainCategories(events){
    const contentCategories = document.getElementById("content-categories")

    const categories = allCategories(events)

    contentCategories.appendChild(createItemCategory(categories))

}

/**
 * see the events in the form and search for string or categories
 * and add the new cards in the element whit id content-cards
 * @param {array} events array the events
 * @param {string} pathPage path to the folder page for defaut it's ./
 */
export async function search(events, pathPage="./"){
    const inputSearch = document.querySelector("input[placeholder='search']")
    const form = document.forms[0]
    const contentCategories = document.getElementById("content-categories")
    const contentCards = document.getElementById("content-cards")

    inputSearch.addEventListener("keyup", () => {
        contentCards.innerHTML = ""
        contentCards.appendChild(superFilter(events, pathPage))

    })

    contentCategories.addEventListener("change", () => {
        contentCards.innerHTML = ""
        contentCards.appendChild(superFilter(events, pathPage))
    })

    form.addEventListener("submit", (event) => {
        event.preventDefault()
        contentCards.innerHTML = ""
        contentCards.appendChild(superFilter(events, pathPage))
    })
}

/**
 * add new attendance properti whit value
 * @param {array} events array the events
 */
export function eventsAddAttendance(events){
    events.forEach(event =>{
        event.attendance = event.estimate?
                                event.estimate / event.capacity * 100:
                                event.assistance / event.capacity * 100

    })
}

/**
 * create and return array whit object categories whit attributes name - revenues - attendance
 * @param {array} events whit object events
 * @returns array whit object categories
 */
export function statisticsForCategory(events){
    const categories = []
    allCategories(events).forEach(category => {
        categories.push({name : category})
    })
    addRevenuesForCategories(events, categories)
    addPercentageOfAttendance(events, categories)
    return categories
}

/**
 * add attribute revenues in object categories
 * @param {array} events whit object events
 * @param {array} categories whit object categories
 */
export function addRevenuesForCategories(events,categories){
    categories.forEach(category => {
        category.revenues = 0
        events.forEach(event => {
            if (event.category === category.name){
                category.revenues += event.estimate?
                                        event.price * event.estimate:
                                        event.price * event.assistance
            }
        })
    })
}

/**
 * add the attribute attendace in object categories
 * @param {array} events array whit events object
 * @param {array} categories whit objects categories
 */
export function addPercentageOfAttendance(events, categories){
    categories.forEach(category =>{
        events.forEach(event => {
            if(category.name == event.category)
                "attendance" in category?
                    category.attendance = (event.attendance + category.attendance)/2:
                    category.attendance = event.attendance
        })
    })
}

/**
 * order events for date
 * return array of events
 * @param {array whit object event} events to ordered
 * @returns oredered array
 */
export function orderEvents(events) {
    events.sort((a, b) => {
        if (a.date === b.date) {
            return 0
        } else if (a.date < b.date) {
            return 1
        } else if (a.date > b.date) {
            return -1
        }
    })
    return events
}

/**
 *filter upcoming events
 *return array of events
 * @param {array whit object event} events it's event to filter
 * @param {string} date it's today date
 * @returns array
 */
export function upcomingEvents(events, date) {
    const arrayUpcomingEvents = []
    events.forEach(event => {
        if (event.date > date)
            arrayUpcomingEvents.push(event)
    })
    return orderEvents(arrayUpcomingEvents)
}

/**
 * filter past events
 * @param {array whit object event} events to filder
 * @param {string} date it's today date
 * @returns array
 */
export function pastEvents(events, date) {
    const arrayPastEvents = []
    events.forEach(event => {
        if (event.date < date)
            arrayPastEvents.push(event)
    })
    return orderEvents(arrayPastEvents)
}

/**
 * filter events the today
 * @param {array whit object events} events it's event to filter
 * @param {string} date it's today date
 * @returns array
 */
export function todayEvents(events, date) {
    const arrayTodayEvents = []
    events.forEach((event) => {
        if (event.date == date)
            arrayTodayEvents.push(event)
    })
    return orderEvents(arrayTodayEvents)
}

/**
 * create templates the cards events
 * @param {array whit object event} events it's events to create template
 * @param {string} ruta it's path the scripts folder
 * @returns fragment
 */
export function createCardEvents(events, path = "./") {
    const cardEvents = document.createDocumentFragment()
    if (events.length === 0){
        const h2 = document.createElement("h2")
        h2.innerHTML = "Event not exist"
        cardEvents.appendChild(h2)
        return cardEvents
    }
    events.forEach(event => {
        const section = document.createElement('section')
        section.classList.add('card', 'bg-secondary', 'text-light')
        section.innerHTML = `
                <img src="${event.image}" class="card-img-top" alt="card image">
                <div class="card-body column ">
                    <h3 class="card-title">${event.name}</h3>
                    <p class="card-text">${event.description}</p>
                </div>
                <div class="d-flex flex-row justify-content-around card-footer mb-3">
                    <div class="price align-self-end">$${event.price}</div>
                    <a href="${path}details.html?id=${event._id}" class="btn btn-primary">see more</a>
                </div>`
        cardEvents.appendChild(section)
    })
    return cardEvents
}

/**
 * all catogories not duplicated
 * @param {array whit object event} events it's events to filter categories
 * @returns array of categories
 */
export function allCategories(events) {
    const arrayCategories = []
    events.forEach(event => {
        if (arrayCategories.indexOf(event.category) === -1)
            arrayCategories.push(event.category)
    })
    arrayCategories.sort()
    return arrayCategories
}

/**
 * create fragment whit categories
 * @param {array} categories name of categories
 * @returns fragment
 */
export function createItemCategory(categories) {
    const arrayCategories = document.createDocumentFragment()

    categories.forEach(category => {
        const div = document.createElement('div')
        div.classList.add("form-check", "form-switch", "form-check-inline")
        div.innerHTML = `
                <label class="form-check-label">
                    <input class="form-check-input" type="checkbox" role="switch" id="${category}" name="category"
                        value="${category}">
                    ${category}
                </label>
        `
        arrayCategories.appendChild(div)
    })
    return arrayCategories
}

/**
 *
 * @param {array object} events filters events
 * @param {string} shearch text to filter
 * @returns array[events]
 */
export function eventsSearchFilter(events){
    const shearch = document.querySelector("input[placeholder='search']")
    return events.filter((event) =>{
        if(event.name.toLowerCase().includes(shearch.value.toLowerCase())){
            return event
        }
    })
}

/**
 * filter checkbox activate
 * @returns array
 */
export function valueCheckboxActivate(){
    const checkbox = document.querySelectorAll("input[type='checkbox']:checked")
    const valueCheckbox = Array.from(checkbox).map((check) => check.value)
    return valueCheckbox
}

/**
 * filter for checkbox activate
 * @param {Array object events} events
 * @returns array object events
 */
export function eventsCheckFilter(events){
    const valueCheckbox= valueCheckboxActivate()
    if (valueCheckbox.length > 0)
        return events.filter((event) =>{
        return valueCheckbox.includes(event.category)
        })
    return events
}

/**
 * filter whit checkbox activate and search
 * @param {events} events
 * @param {string} path the script folder
 * @returns fragment whit events card
 */
export function superFilter(events, path="./"){
    let eventsFilter = eventsSearchFilter(events)
    eventsFilter = eventsCheckFilter(eventsFilter)
    return createCardEvents(eventsFilter, path)
}