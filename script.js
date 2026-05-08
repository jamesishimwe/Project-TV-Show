//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const search = document.createElement("div");
  document.body.appendChild(search);
  const searchInput = document.createElement("input");
  search.appendChild(searchInput);
  searchInput.placeholder = "Search for an episode...";
  const searchCount = document.createElement("span");
  search.appendChild(searchCount);
  searchCount.style.marginLeft = "10px";
  searchCount.textContent = `Displaying ${episodeList.length} / ${episodeList.length}`;
  const rootElem = document.createElement("div");
  document.body.appendChild(rootElem);
  const copyWriter = document.createElement("div");
  copyWriter.classList.add("copywriter");
  copyWriter.innerHTML = `<p>All data is from <a href="https://www.tvmaze.com/" target="_blank">TVmaze.com</a></p>`;
  document.body.appendChild(copyWriter);
  episodeList.forEach((episode) => {
    if (episode.season < 10) {
      episode.season = " 0" + episode.season;
    }
    if (episode.number < 10) {
      episode.number = " 0" + episode.number;
    }
    const episodeElem = document.createElement("div");
    episodeElem.style.border = "1px solid black";
    episodeElem.style.margin = "10px";
    episodeElem.style.padding = "10px";
    episodeElem.style.color = "rgb(38, 142, 190)";
    episodeElem.classList.add("episode");
    episodeElem.innerHTML = `
      <h2>${episode.name}</h2>
      <img src="${episode.image.medium}" alt="${episode.name}">
     
      <h3>Season ${episode.season}, Episode${episode.number}</h3>
      <p>${episode.summary}</p>
    `;
    rootElem.appendChild(episodeElem);
    const searchInput = document.querySelector("input");
    searchInput.addEventListener("input", (event) => {
      const searchTerm = event.target.value.toLowerCase();
      if (
        episode.name.toLowerCase().includes(searchTerm) ||
        episode.summary.toLowerCase().includes(searchTerm)
      ) {
        episodeElem.style.display = "block";
      } else {
        episodeElem.style.display = "none";
      }
      const visibleEpisodes = document.querySelectorAll(
        ".episode:not([style*='display: none'])",
      );
      searchCount.textContent = ` ${visibleEpisodes.length} / ${episodeList.length}`;
    });
  });
  const searchDropdown = document.createElement("select");
  search.appendChild(searchDropdown);
  searchDropdown.style.marginLeft = "10px";
  searchDropdown.style.border = "5px";
  searchDropdown.style.backgroundColor = "rgb(38, 142, 190)";
  searchDropdown.style.color = "white";
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Select an episode";
  searchDropdown.appendChild(defaultOption);
  episodeList.forEach((episode) => {
    const option = document.createElement("option");
    option.value = episode.id;
    option.textContent = `S${episode.season}E${episode.number} - ${episode.name}`;
    searchDropdown.appendChild(option);
  });
  searchDropdown.addEventListener("change", (event) => {
    const selectedEpisodeId = event.target.value;
    const episodeElems = document.querySelectorAll(".episode");
    episodeElems.forEach((episodeElem) => {
      if (selectedEpisodeId === "") {
        episodeElem.style.display = "block";
      } else if (
        episodeElem.querySelector("h2").textContent ===
        episodeList.find((ep) => ep.id == selectedEpisodeId).name
      ) {
        episodeElem.style.display = "block";
      } else {
        episodeElem.style.display = "none";
      }
      const visibleEpisodes = document.querySelectorAll(
        ".episode:not([style*='display: none'])",
      );
      searchCount.textContent = ` ${visibleEpisodes.length} / ${episodeList.length}`;
    });
  });
}
window.onload = setup;
