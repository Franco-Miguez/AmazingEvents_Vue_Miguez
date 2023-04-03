
export function mainBanner(title, events){
    title = title.toUpperCase()
    const contentBanner = document.getElementById("content-banner")

    contentBanner.appendChild(createImages(events))
    contentBanner.appendChild(createTitle(title))
}

/**
 * create the fragment whit image
 * @param {array whit object events} events
 * @returns fragment whit images
 */
export function createImages(events) {
    const imagesBanner = document.createDocumentFragment()
    for (let i = 0; i < 6; i++) {
        if (i >= 5)
            break
        else {
            const div = document.createElement('div')
            div.classList.add("carousel-item")
            if (i === 0)
                div.classList.add("active")
            div.innerHTML += `<img src="${events[i].image}" class="d-block" alt="home image">`
            imagesBanner.appendChild(div)
        }
    }
    return imagesBanner
}

/**
 * create the div whit h1 for the title in the banner
 * @param {text} title for the header
 * @returns h1 whit text
 */
export function createTitle(title) {
    const h1 = document.createElement('h1')
    h1.classList.add('position-absolute', 'top-50', 'start-50')
    h1.textContent = title
    return h1
}