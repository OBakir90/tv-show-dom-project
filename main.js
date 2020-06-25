let main = document.querySelector("#main_boxes")
let mrShowBox = document.querySelectorAll(".box")
let image = document.querySelectorAll(".box img")
let mrShowName = document.querySelectorAll(".show_name")
let mrRating = document.querySelectorAll(".rating")
let sorting = document.querySelector(".dropdown")
let typeSelectBox = document.querySelector("#show_type_box")
let genresSelectBox = document.querySelector("#show_genres_box")
// let selectTypeInput = document.querySelectorAll(".checkbox")

function fetchedData() {
    main.innerHTML = ""
    fetch("http://api.tvmaze.com/shows")
        .then(res => res.json())
        .then(shows => {
            selectShowType(shows)
            selectGenresType(shows)
            displayAllMovies(shows)
            displayMostRated(shows)
        }
        )
}


function createElement(type, clsName) {
    let element = document.createElement(type);
    element.className += clsName;
    return element;
}

//MOST RATED SHOWS

function displayMostRated(shows) {
    let sortedShows = shows.sort(compareRate)
    sortedShows.forEach((show, index) => {
        image[index].src = show.image.medium
        mrShowName[index].innerText = show.name
        mrRating[index].innerText = show.rating.average
    })
}

//DISPLAY ALL SHOWS ON MAIN

let displayAllMovies = (shows) => {
    shows.forEach(show => {
        let showBox = createElement("div", "showBox")
        let showInBox = createElement("div", "showInBox")
        let showDownBox = createElement("div", "showDownBox")
        let image = createElement("img", "src")
        let rate = createElement("p", "rate")
        let summary = createElement("h3", "summary")
        let description = createElement("p", "description")
        let showName = createElement("h2", "showName")
        summary.innerText = "Summary"
        description.innerHTML = show.summary
        showName.innerText = show.name
        image.src = show.image.medium
        rate.innerText = show.rating.average
        showInBox.appendChild(showName)
        showInBox.appendChild(rate)
        showDownBox.appendChild(summary)
        showDownBox.appendChild(description)
        showBox.appendChild(showInBox)
        showBox.appendChild(image)
        showBox.appendChild(showDownBox)
        main.appendChild(showBox)
    })
    displayNumber(shows, shows)
}

//Sorting Shows 

sorting.addEventListener("change", (e) => {
    fetch("http://api.tvmaze.com/shows")
        .then(res => res.json())
        .then(shows => {
            let sortBy = e.target.value
            sortingShows(sortBy, shows)
        })
})

function sortingShows(compare, shows) {
    if (compare === "") {
        showSorted(shows)
    }
    if (compare === "compare_date") {
        let sortedShows = shows.sort(compareDate)
        showSorted(sortedShows)
    }
    if (compare === "compare_rate") {
        let sortedShows = shows.sort(compareRate)
        showSorted(sortedShows)
    }
}

function showSorted(sortedShows) {
    main.innerHTML = ""
    sortedShows.forEach(show => {
        let showBox = createElement("div", "showBox")
        let showInBox = createElement("div", "showInBox")
        let showDownBox = createElement("div", "showDownBox")
        let image = createElement("img", "src")
        let rate = createElement("p", "rate")
        let summary = createElement("h3", "summary")
        let description = createElement("p", "description")
        let showName = createElement("h2", "showName")
        summary.innerText = "Summary"
        description.innerHTML = show.summary
        showName.innerText = show.name
        image.src = show.image.medium
        rate.innerText = show.rating.average
        showInBox.appendChild(showName)
        showInBox.appendChild(rate)
        showDownBox.appendChild(summary)
        showDownBox.appendChild(description)
        showBox.appendChild(showInBox)
        showBox.appendChild(image)
        showBox.appendChild(showDownBox)
        main.appendChild(showBox)
    })
    displayNumber(sortedShows, sortedShows)
}

//SELECT SHOW TYPE
function selectShowType(shows) {
    let types = [];
    shows.forEach(p => {
        types.push(p.type)
    })
    let typeObjet = types.reduce(function (acc, curr) {
        if (typeof acc[curr] == 'undefined') {
            acc[curr] = 1;
        } else {
            acc[curr] += 1;
        }
        return acc;
    }, {});
    let showTypes = Object.keys(typeObjet)
    let typeNumbers = Object.values(typeObjet)
    showTypes.forEach((p, i) => {
        let selectTypeDiv = createElement("div", "ui checkbox selectType")
        let selectTypeInput = createElement("input", `${p.replace(" ", "").toLowerCase()}`)
        selectTypeInput.setAttribute("type", "checkbox")
        let selectTypeLabel = createElement("label", "type_label")
        selectTypeDiv.appendChild(selectTypeInput)
        selectTypeDiv.appendChild(selectTypeLabel)
        typeSelectBox.appendChild(selectTypeDiv)
        selectTypeLabel.innerText = `${p}(${typeNumbers[i]})`
    }
    )
}
let selected = false;
typeSelectBox.addEventListener("click", function (e) {
    fetch("http://api.tvmaze.com/shows")
        .then(res => res.json())
        .then(shows => {
            if (e.target && e.target.matches("input.scripted") && selected == false) {
                let scriptedShows = shows.filter(show => show.type == "Scripted")
                showSorted(scriptedShows)
                selected = true
            }
            if (e.target && e.target.matches("input.reality")) {
                let realityShows = shows.filter(show => show.type == "Reality")
                showSorted(realityShows)
                selected = true
            }
            if (e.target && e.target.matches("input.animation")) {
                let animationShows = shows.filter(show => show.type == "Animation")
                showSorted(animationShows)
                selected = true
            }
            if (e.target && e.target.matches("input.talkshow")) {
                let talkshowShows = shows.filter(show => show.type == "Talk Show")
                showSorted(talkshowShows)
                selected = true
            }
            if (e.target && e.target.matches("input.documentary")) {
                let documentaryShows = shows.filter(show => show.type == "Documentary")
                showSorted(documentaryShows)
                selected = true
            }
        })
});

typeSelectBox.addEventListener("click", (e) => {
    if (e.target && e.target.matches("input.scripted") && selected == true) {
        fetch("http://api.tvmaze.com/shows")
            .then(res => res.json())
            .then(shows => {
                displayAllMovies(shows)
                selected = false
            })
    }
    if (e.target && e.target.matches("input.reality") && selected == true) {
        fetch("http://api.tvmaze.com/shows")
            .then(res => res.json())
            .then(shows => {
                displayAllMovies(shows)
                selected = false
            })
    }
    if (e.target && e.target.matches("input.animation") && selected == true) {
        fetch("http://api.tvmaze.com/shows")
            .then(res => res.json())
            .then(shows => {
                displayAllMovies(shows)
                selected = false
            })
    }
    if (e.target && e.target.matches("input.talkshow") && selected == true) {
        fetch("http://api.tvmaze.com/shows")
            .then(res => res.json())
            .then(shows => {
                displayAllMovies(shows)
                selected = false
            })
    }
    if (e.target && e.target.matches("input.documentary") && selected == true) {
        fetch("http://api.tvmaze.com/shows")
            .then(res => res.json())
            .then(shows => {
                displayAllMovies(shows)
                selected = false
            })
    }
})


//SELECT SHOW GENRES 

function selectGenresType(shows) {
    let types = [];
    shows.forEach(p => {
        types.push(p.genres)
    })
    let typeObjet = types.reduce(function (acc, curr) {
        if (typeof acc[curr] == 'undefined') {
            acc[curr] = 1;
        } else {
            acc[curr] += 1;
        }
        return acc;
    }, {});
    let showGenres = Object.keys(typeObjet)
    let genresNumbers = Object.values(typeObjet)
    showGenres.forEach((p, i) => {
        let selectGenresDiv = createElement("div", "ui checkbox")
        let selectGenresInput = createElement("input", "checkbox")
        selectGenresInput.setAttribute("type", "checkbox")
        let selectGenresLabel = createElement("label", "genres_label")
        selectGenresLabel.appendChild(selectGenresInput)
        selectGenresDiv.appendChild(selectGenresLabel)
        genresSelectBox.appendChild(selectGenresDiv)
        selectGenresLabel.innerText = `${p}(${genresNumbers[i]})`
    }
    )
}





//SEARCH FUNCTION 
let searchForm = document.getElementById("search_form")
searchForm.addEventListener("input", handleSearch)
function handleSearch(e) {
    const searchWord = e.target.value.toLowerCase()
    let shows = [...main.children]
    shows.forEach(show => {
        const showText = show.innerText.toLowerCase()
        if (showText.indexOf(searchWord) < 0) {
            show.style.display = 'none'
        } else {
            show.style.display = 'flex'
        }
    })
    let filtered = shows.filter(ep => getComputedStyle(ep).display == "flex")
    displayNumber(filtered, shows)
}

//Display Episode Number
let episodeNumber = document.querySelector("#display_number p")
function displayNumber(displayed, all) {
    episodeNumber.innerText = `Displaying ${displayed.length} / ${all.length} episodes`
}

function createImage(src) {
    let image = document.createElement("img")
    image.setAttribute(src)
    return image
}


function compareDate(a, b) {
    const dateA = a.premiered;
    const dateB = b.premiered
    let comparison = 0;
    if (dateA < dateB) {
        comparison = 1;
    } else if (dateA > dateB) {
        comparison = -1;
    }
    return comparison;
}


function compareRate(a, b) {
    const ratingA = a.rating.average;
    const ratingB = b.rating.average
    let comparison = 0;
    if (ratingA < ratingB) {
        comparison = 1;
    } else if (ratingA > ratingB) {
        comparison = -1;
    }
    return comparison;
}



window.onload = fetchedData
