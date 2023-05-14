document.getElementById("searchForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const courseName = document.getElementById("courseName").value;

    // 각 API별로 검색 함수를 작성하세요
    await searchGitHubAPI(courseName);
    await searchYoutubeAPI(courseName + "강의");
});

async function searchGitHubAPI(query) {
    const response = await fetch(`https://api.github.com/search/repositories?q=${query}`);
    const data = await response.json();
    displayResults(data.items, "GitHub");
}

async function searchYoutubeAPI(query) {
    const YOUTUBE_API_KEY = "AIzaSyDC9jmZdDUeKKYJ7ukS_72K4cuHsfya0vo";
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&type=video&key=${YOUTUBE_API_KEY}`);
    const data = await response.json();
    displayResults(data.items, "YouTube");
}

function displayResults(items, source) {
    const courseList = document.getElementById("courseList");
    const div = document.createElement("div");
    div.className = "result";
    div.innerHTML = `
      <h2>${source} 결과</h2>
      <ul>
        ${items
            .map(
                (item) => `
              <li>
                <a href="${source === "GitHub" ? item.html_url : "https://www.youtube.com/watch?v=" + item.id.videoId}" target="_blank" rel="noopener">
                  ${source === "GitHub" ? item.full_name : item.snippet.title}
                </a>
              </li>
            `
            )
            .join("")}
      </ul>
    `;
    courseList.appendChild(div);
}
