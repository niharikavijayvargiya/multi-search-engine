function toggleSearchBox() {
    const searchEngine = document.getElementById('search-engine').value;
    const searchEngineInfo = document.getElementById('search-engine-info');
    const customSearch = document.getElementById('custom-search');
    const googleSearchBox = document.getElementById('google-search-box');

    if (searchEngine === 'select-engine') {
        searchEngineInfo.textContent = 'Please select a search engine.';
        customSearch.style.display = 'none';
        googleSearchBox.style.display = 'none';
    } else {
        searchEngineInfo.textContent = `Searching is based on ${searchEngine}.`;
        customSearch.style.display = searchEngine === 'google' ? 'none' : 'block';
        googleSearchBox.style.display = searchEngine === 'google' ? 'block' : 'none';
    }
}

// Other functions remain the same...

function performSearch() {
    const query = document.getElementById('search-query').value;
    const engine = document.getElementById('search-engine').value;
    const resultsList = document.getElementById('results-list');

    resultsList.innerHTML = '';

    if (!query) {
        alert('Please enter a search query.');
        return;
    }

    if (engine === 'google') {
        const googleSearchInput = document.querySelector('.gsc-input');
        googleSearchInput.value = query;
        const googleSearchButton = document.querySelector('.gsc-search-button');
        googleSearchButton.click();
    } else if (engine === 'gemini') {
        searchGemini(query);
    } else if (engine === 'wikipedia') {
        searchWikipedia(query);
    }
}

function searchGemini(query) {
    // Fetch data from the Gemini API
    fetch(`https://api.gemini.com/search?q=${query}`)
        .then(response => response.json())
        .then(data => {
            // Process the response data and display the search results
            const results = processData(data);
            displayResults(results);
        })
        .catch(error => {
            console.error('Error fetching Gemini data:', error);
        });
}

function processData(data) {
    // Process the response data as needed
    // Here, we'll assume that the response contains an array of search results objects
    return data.results.map(result => ({
        title: result.title,
        snippet: result.snippet,
        link: result.link
    }));
}


function searchWikipedia(query) {
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&format=json&origin=*`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const results = data.query.search.map(item => ({
                title: item.title,
                snippet: item.snippet,
                link: `https://en.wikipedia.org/wiki/${item.title}`
            }));
            displayResults(results);
        })
        .catch(error => console.error('Error:', error));
}

function displayResults(results) {
    const resultsList = document.getElementById('results-list');
    results.forEach(result => {
        const li = document.createElement('li');
        li.innerHTML = `<h3><a href="${result.link}" target="_blank">${result.title}</a></h3><p>${result.snippet}</p>`;
        resultsList.appendChild(li);
    });
}
