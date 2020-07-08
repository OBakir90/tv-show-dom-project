// //You can edit ALL of the code here
// function setup() {
//     const allEpisodes = getAllEpisodes();
//     // makePageForEpisodes(allEpisodes);
//     selectEpisode(allEpisodes)
//     displayNumber(allEpisodes, allEpisodes)
// }

// // Episode List
// let main = document.getElementById("main_boxes")

// function makePageForEpisodes(episodeList) {
//     episodeList.map(episode => {
//         let epsBox = document.createElement("div")
//         let image = document.createElement("img")
//         let textBox = document.createElement("div")
//         let epsName = document.createElement("h2")
//         let description = document.createElement("p")
//         epsBox.className += ("showbox")
//         image.src = episode.image.medium
//         epsName.innerText = `${episode.name}-S${episode.season.toString().padStart(2, "0")}E${episode.number.toString().padStart(2, "0")}`
//         description.innerHTML = episode.summary
//         epsBox.appendChild(image)
//         textBox.appendChild(epsName)
//         textBox.appendChild(description)
//         epsBox.appendChild(textBox)
//         main.appendChild(epsBox)
//     }
//     )
// }

// // Search Box
// let searchForm = document.getElementById("search_form")
// searchForm.addEventListener("input", handleSearch)

// function handleSearch(e) {
//     const searchWord = e.target.value.toLowerCase()
//     let episodes = [...main.children]
//     episodes.forEach(episode => {
//         const episodeText = episode.innerText.toLowerCase()
//         if (episodeText.indexOf(searchWord) < 0) {
//             episode.style.display = 'none'
//         } else {
//             episode.style.display = 'flex'
//         }
//     })
//     let filtered = episodes.filter(ep => getComputedStyle(ep).display == "flex")
//     displayNumber(filtered, episodes)
// }

// //Show Episode Selections
// let selection = document.querySelector(".dropdown")
// function selectEpisode(episodeList) {
//     episodeList.forEach(episode => {
//         let option = document.createElement("OPTION")
//         let episodeName = `S${episode.season.toString().padStart(2, "0")}E${episode.number.toString().padStart(2, "0")}-${episode.name}`
//         option.appendChild(document.createTextNode(episodeName))
//         selection.appendChild(option)
//     })
// }

// //Select Episode 
// selection.addEventListener("change", e => {
//     let episodes = [...main.children]
//     let episodeNumber = e.target.value.split("-")[0]
//     episodes.forEach(episode => {
//         const episodeText = episode.innerText
//         if (episodeText.indexOf(episodeNumber) < 0) {
//             episode.style.display = 'none'
//         } else {
//             episode.style.display = 'flex'
//         }
//     })
//     let filtered = episodes.filter(ep => getComputedStyle(ep).display == "flex")
//     displayNumber(filtered, episodes)
// })

// //Display Episode Number
// let episodeNumber = document.querySelector("#display_number p")
// function displayNumber(displayed, all) {
//     episodeNumber.innerText = `Displaying ${displayed.length}/${all.length} episodes`
// }


// //fetch API









// window.onload = setup;

// var post;

// // Call the API
// fetch('https://jsonplaceholder.typicode.com/posts/5').then(function (response) {
//     if (response.ok) {
//         return response.json();
//     } else {
//         return Promise.reject(response);
//     }
// }).then(function (data) {

//     // Store the post data to a variable
//     post = data;
//     console.log(post)
//     // Fetch another API
//     return fetch('https://jsonplaceholder.typicode.com/users/' + data.userId);

// }).then(function (response) {
//     if (response.ok) {
//         return response.json();
//     } else {
//         return Promise.reject(response);
//     }
// }).then(function (userData) {
//     console.log(post, userData);
// }).catch(function (error) {
//     console.warn(error);
// });