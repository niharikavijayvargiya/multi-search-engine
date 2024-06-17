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
async function searchGemini(query) {
    displayGeminiResults("Please wait...");
    // Define the request body
    const requestBody = {
        contents: [{
            parts: [{
                text: query
            }]
        }]
    };

    try {
        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDN40DfPeXOLG7vpu16SYWrFkpZgyaLABU', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const results = processGeminiData(data);
        displayGeminiResults(results);
    } catch (error) {
        console.error('Error fetching Gemini data:', error);
    }
}
function displayGeminiResults(text) {
    const resultsList = document.getElementById('results-list');

    resultsList.innerHTML = '';

    const container = document.createElement('div');

    container.classList.add('gemini-text');

    const sections = text.split('\n\n');

    sections.forEach(section => {
        const sectionElement = document.createElement('div');
        if (section.startsWith('**')) {
            sectionElement.classList.add('heading');
            section = section.substring(2, section.length - 2);
            sectionElement.textContent = section;
            sectionElement.innerHTML = '<br>' + sectionElement.innerHTML;
        } else {
            sectionElement.classList.add('paragraph');
            sectionElement.innerHTML = section.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        }

        container.appendChild(sectionElement);
    });

    resultsList.appendChild(container);
}

function processGeminiData(data) {
    const content = data.candidates[0]?.content?.parts?.[0]?.text;
    return content || "No content found";
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
            displayWikiResults(results);
        })
        .catch(error => console.error('Error:', error));
}

function displayWikiResults(results) {
    const resultsList = document.getElementById('results-list');
    results.forEach(result => {
        const li = document.createElement('li');
        li.innerHTML = `<h3><a href="${result.link}" target="_blank">${result.title}</a></h3><p>${result.snippet}</p>`;
        resultsList.appendChild(li);
    });
}