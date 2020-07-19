const main = document.querySelector("#main_boxes");
const side = document.querySelector("#main_side");
const mrShowBox = document.querySelectorAll(".box");
const image = document.querySelectorAll(".box img");
const mrShowName = document.querySelectorAll(".show_name");
const mrRating = document.querySelectorAll(".rating");
const sorting = document.querySelector(".dropdown");
const typeSelectBox = document.querySelector("#show_type_box");
const genresSelectBox = document.querySelector("#show_genres_box");
const selectTypeInput = document.querySelectorAll(".checkbox");
const sortForm = document.querySelector("div.ui.form");
const space = document.querySelector("div.space");
const seasonScreen = document.querySelector(".season_screen");
const showMainDiv = document.querySelector("#main_boxes");
let pageNumberList = document.getElementById("pageNumber");
let allshows;

function fetchedData() {
    main.innerHTML = "";
    seasonScreen.style.display = "none";
    fetch("https://api.tvmaze.com/shows")
        .then((res) => res.json())
        .then((shows) => {
            allshows = shows;
            if (allshows) {
                selectShowType(allshows);
                displayAllMovies(allshows);
                displayMostRated(allshows);
                makePaginationNumber(allshows);
            }
        });
}

//CREATE NEW ELEMENT

function createElement(type, clsName) {
    let element = document.createElement(type);
    element.className += clsName;
    return element;
}
function createElementId(type, idName) {
    let element = document.createElement(type);
    element.id = idName;
    return element;
}

//MOST RATED SHOWS

function displayMostRated(shows) {
    let sortedShows = shows.sort(compareRate);
    sortedShows.forEach((show, index) => {
        if (image[index]) {
            image[index].src = show.image.medium;
        }
        if (mrShowName[index]) {
            mrShowName[index].innerText = show.name;
        }
        if (mrRating[index]) {
            mrRating[index].innerText = show.rating.average;
        }
    });
}

//DISPLAY ALL SHOWS ON MAIN

let displayAllMovies = (shows, num = 0) => {
    main.innerHTML = "";
    showsPerPage = shows.slice(num * 30, num * 30 + 30);
    createShows(showsPerPage);
};


function makePaginationNumber(shows) {
    let pageNumber = Math.ceil(shows.length / 30);
    for (let i = 0; i < pageNumber; i++) {
        var button = createElement("button", "pageNum");
        button.innerText = i + 1;
        button.id = i + 1;
        pageNumberList.appendChild(button);
        button.addEventListener("click", handleClickPage);
    }
}
function handleClickPage() {
    let pageNumber = event.target.id;
    displayAllMovies(allshows, pageNumber);
}

function createShows(shows) {
    shows.forEach((show) => {
        let showBox = createElement("div", "showBox");
        let showInBox = createElement("div", "showInBox");
        let showDownBox = createElement("div", "showDownBox");
        let image = createElement("img", "src");
        let rate = createElement("p", "rate");
        let summary = createElement("h3", "summary");
        let description = createElement("p", "description");
        let showName = createElement("h2", "showName");
        summary.innerText = "Summary";
        description.innerHTML = show.summary;
        showName.innerText = show.name;
        image.src = show.image.medium;
        rate.innerText = show.rating.average;
        showInBox.appendChild(showName);
        showInBox.appendChild(rate);
        showDownBox.appendChild(summary);
        showDownBox.appendChild(description);
        showBox.appendChild(showInBox);
        showBox.appendChild(image);
        showBox.appendChild(showDownBox);
        main.appendChild(showBox);
    });
}

//Sorting Shows

sorting.addEventListener("change", (e) => {
    if (allshows) {
        console.log(allshows);
        let sortBy = e.target.value;
        sortingShows(sortBy, allshows);
    }
});

function sortingShows(compare, shows) {
    if (compare === "") {
        displayAllMovies(shows);
    }
    if (compare === "compare_date") {
        let sortedShows = shows.sort(compareDate);
        displayAllMovies(sortedShows);
    }
    if (compare === "compare_rate") {
        let sortedShows = shows.sort(compareRate);
        displayAllMovies(sortedShows);
    }
}

//SELECT SHOW TYPE
function selectShowType(shows) {
    typeObjet = getShowTypeObject(shows);
    let showTypes = Object.keys(typeObjet);
    let typeNumbers = Object.values(typeObjet);
    createShowTypeDiv(showTypes, typeNumbers);
}

function createShowTypeDiv(showTypes, typeNumbers) {
    const typeForm = createElement("div", "ui form");
    const headlabel = createElement("label", "headLabel");
    const groupedFields = createElement("div", "grouped fields");
    const typelabel = createElementId("label", `alltypes`);
    const checkboxDiv = createElement("div", "ui radio checkbox alltypes");
    const input = createElementId("div", `alltypes`);
    input.setAttribute("type", "radio");
    input.setAttribute("checked", "checked");
    const field = createElement("div", "field");
    field.appendChild(checkboxDiv);
    checkboxDiv.appendChild(input);
    checkboxDiv.appendChild(typelabel);
    typeForm.appendChild(headlabel);
    typeForm.appendChild(groupedFields);
    groupedFields.appendChild(checkboxDiv);
    headlabel.innerText = "Select A Show Type";
    typelabel.innerText = `All Shows(${allshows.length})`;
    showTypes.forEach((type, index) => {
        const field = createElement("div", "field");
        const checkboxDiv = createElement("div", "ui radio checkbox");
        const input = createElementId(
            "div",
            `${type.replace(" ", "").toLowerCase()}`
        );
        input.setAttribute("type", "radio");
        const typelabel = createElementId(
            "label",
            `${type.replace(" ", "").toLowerCase()}`
        );
        typelabel.style.hover = "white";
        typelabel.innerText = `${type}(${typeNumbers[index]})`;
        groupedFields.appendChild(field);
        field.appendChild(checkboxDiv);
        checkboxDiv.appendChild(input);
        checkboxDiv.appendChild(typelabel);
        typeSelectBox.appendChild(typeForm);
    });
}

function getShowTypeObject(shows) {
    let types = [];
    shows.forEach((p) => {
        types.push(p.type);
    });
    let typeObjet = types.reduce(function (acc, curr) {
        if (typeof acc[curr] == "undefined") {
            acc[curr] = 1;
        } else {
            acc[curr] += 1;
        }
        return acc;
    }, {});
    return typeObjet;
}
typeSelectBox.addEventListener("click", function (e) {
    let selectedShows = [];
    if (e.target.id === "alltypes") {
        selectedShows = allshows;
    } else {
        selectedShows = allshows.filter(
            (show) => show.type.replace(" ", "").toLowerCase() == e.target.id
        );
    }
    displayAllMovies(selectedShows);
    displayNumber(selectedShows, allshows);
});

//SEARCH FUNCTION
let searchForm = document.getElementById("search_form");
searchForm.addEventListener("input", handleSearch);

function handleSearch(e) {
    const searchWord = e.target.value.toLowerCase();
    let filtered = allshows.filter((showText) => {
        return (showText.summary + showText.name)
            .toLowerCase()
            .includes(searchWord);
    });
    displayNumber(filtered, allshows);
    displayAllMovies(filtered);
}

//Display Episode Number
function displayNumber(displayed, all) {
    let episodeNumber = document.querySelector("#display_number p");
    episodeNumber.innerText = `Displaying ${displayed.length} / ${all.length} episodes`;
}

function createImage(src) {
    let image = document.createElement("img");
    image.setAttribute(src);
    return image;
}

function compareDate(a, b) {
    const dateA = a.premiered;
    const dateB = b.premiered;
    if (dateA > dateB) {
        return -1;
    }
}

function compareRate(a, b) {
    const ratingA = a.rating.average;
    const ratingB = b.rating.average;
    if (ratingA > ratingB) {
        return -1;
    }
}
window.onload = fetchedData;

//GET SHOW SEASONS

showMainDiv.addEventListener("click", (e) => {
    let element = e.target.parentElement;
    let showName = element.querySelector("h2").textContent;
    allshows.forEach((show) => {
        if (show.name == showName) {
            fetch(`https://api.tvmaze.com/shows/${show.id}/seasons`)
                .then((res) => res.json())
                .then((seasons) => {
                    displayShowOnSeasonPage(showName);
                    displaySeasons(seasons);
                });
            fetch(`https://api.tvmaze.com/shows/${show.id}/cast`)
                .then((res) => res.json())
                .then((casts) => {
                    console.log(casts);
                    displayCastsOnSeasonPage(casts);
                });
        }
    });
});

function displaySeasons(show) {
    main.style.display = "none";
    side.style.display = "none";
    sortForm.style.display = "none";
    space.style.display = "none";
    searchForm.style.display = "none";
    seasonScreen.style.display = "flex";
    episodeNumber = "";

    createSeasonBox(show);
}

function displayShowOnSeasonPage(showname) {
    selectedShow = allshows.filter((p) => p.name == showname);
    console.log(selectedShow[0]);
    const showCastBox = createElement("div", "showCastBox");
    const showImage = createElement("img", "showImage");
    showImage.src = selectedShow[0].image.medium;
    const showSummary = createElement("p", "showSummary");
    showSummary.innerHTML = selectedShow[0].summary;
    const detailBox = createElement("div", "detailBox");
    const summaryCastBox = createElement("div", "summaryCastBox");
    const castBox = createElement("div", "castBox");
    const rating = createElement("h3", "rating");
    rating.innerHTML = `Rating: <span>${selectedShow[0].rating.average}</span>`;
    const genres = createElement("h3", "genres");
    genres.innerHTML = `Genres: <span> ${selectedShow[0].genres}</span>`;
    const status = createElement("h3", "status");
    status.innerHTML = `Status:<span> ${selectedShow[0].status}</span>`;
    const runtime = createElement("h3", "runtime");
    runtime.innerHTML = `Duration: <span>${selectedShow[0].runtime}</span>`;
    detailBox.appendChild(rating);
    detailBox.appendChild(genres);
    detailBox.appendChild(status);
    detailBox.appendChild(runtime);
    summaryCastBox.appendChild(showSummary);
    summaryCastBox.appendChild(castBox);
    showCastBox.appendChild(showImage);
    showCastBox.appendChild(summaryCastBox);
    showCastBox.appendChild(detailBox);
    seasonScreen.appendChild(showCastBox);
}

function createSeasonBox(show) {
    const seasonsBox = createElement("div", "seasonsBox");
    show.forEach((season) => {
        const seasonBox = createElement("div", "seasonBox");
        const seasonInBox = createElement("div", "seasonInBox");
        const seasonDownBox = createElement("div", "seasonDownBox");
        const seasonNumberBox = createElement("div", "seasonNumberBox");
        const image = createElement("img", "src");
        const summary = createElement("h3", "summary");
        const description = createElement("p", "description");
        const seasonNumberDate = createElement("h2", "seasonNumber");
        const episodeOrder = createElement("h3", "episodeOrder");
        summary.innerText = "Summary";
        season.summary == "" || season.summary == null
            ? (description.innerHTML =
                "We don't have a summary yet. Hang in there, or go ahead and contribute one.")
            : (description.innerHTML = season.summary);
        seasonNumberDate.innerText = `Season ${
            season.number
            } (${season.endDate.slice(0, 4)})`;
        image.src = season.image.medium;
        episodeOrder.innerText = `Episode number (${season.episodeOrder})`;
        seasonNumberBox.appendChild(seasonNumberDate);
        seasonDownBox.appendChild(seasonNumberBox);
        seasonDownBox.appendChild(episodeOrder);
        seasonDownBox.appendChild(summary);
        seasonDownBox.appendChild(description);
        seasonBox.appendChild(seasonInBox);
        seasonBox.appendChild(image);
        seasonBox.appendChild(seasonDownBox);
        seasonsBox.appendChild(seasonBox);
        seasonScreen.appendChild(seasonsBox);
    });
}

function displayEpisodes(episodeList) {
    let seasonScreen = document.querySelectorAll(".seasonScreen");
    main.innerHTML = "";
    // seasonScreen.style.display = "none"
    episodeList.map((episode) => {
        const epsBox = document.createElement("div");
        const image = document.createElement("img");
        const textBox = document.createElement("div");
        const epsName = document.createElement("h2");
        const description = document.createElement("p");
        epsBox.className += "showbox";
        image.src = episode.image.medium;
        // epsName.innerText = `${episode.name}-S${episode.season.toString().padStart(2, "0")}E${episode.number.toString().padStart(2, "0")}`
        description.innerHTML = episode.summary;
        epsBox.appendChild(image);
        textBox.appendChild(epsName);
        textBox.appendChild(description);
        epsBox.appendChild(textBox);
        main.appendChild(epsBox);
    });
}

function displayCastsOnSeasonPage(casts) {
    const castsBox = createElement("div", "castsBox");
    casts.forEach((cast, index) => {
        if (index < 5) {
            const castBox = createElement("div", "castBox");
            const castImage = createElement("img", "castImage");
            const castCharacterName = createElement("h5", "castCharacterName");
            const castPersonName = createElement("h6", "castPersonName");
            if (cast.character.image.medium) {
                castImage.src = cast.character.image.medium;
            } else {
                castImage.alt = cast.character.name;
            }
            castCharacterName.innerText = cast.character.name;
            castPersonName.innerText = cast.person.name;
            castBox.appendChild(castCharacterName);
            castBox.appendChild(castImage);
            castBox.appendChild(castPersonName);
            castsBox.appendChild(castBox);
            seasonScreen.appendChild(castsBox);
        }
    });
}