

// Assuming this is on your main page (index.html)

function performSearch() {
    const query = document.getElementById('search-query').value;
    const engine = document.body.classList.contains('gemini-background') ? 'gemini' : 'wikipedia';

    const resultsList = document.getElementById('results-list');
    resultsList.innerHTML = '';

    if (!query) {
        alert('Please enter a search query.');
        return;
    }

    if (engine === 'gemini') {
        searchGemini(query);
    } else if (engine === 'wikipedia') {
        searchWikipedia(query);
    }
}
async function searchGemini(query) {
    displayGeminiResults("Please wait"); // Initial message

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
        displayGeminiResults("Error occurred. Please try again."); // Display error message
    }
}

function displayGeminiResults(text) {
    const resultsList = document.getElementById('results-list');
    resultsList.innerHTML = '';

    const container = document.createElement('div');
    container.classList.add('gemini-text');

    // Check if text starts with "Please wait"
    if (text.startsWith("Please wait")) {
        const waitMessage = document.createElement('p1');
        waitMessage.textContent = text;
        waitMessage.style.fontSize = '30px'; // Increase font size for "Please wait"
        waitMessage.style.color = '#70757a'; // Gray text color
        container.appendChild(waitMessage);

        let dotCount = 0;
        const interval = setInterval(() => {
            dotCount = (dotCount % 3) + 1; // Cycle through 3 dots
            waitMessage.textContent = `${text}${'.'.repeat(dotCount)}`;
        }, 500); // Interval for adding dots (500ms)

        // Stop interval when content is loaded
        window.addEventListener('load', () => {
            clearInterval(interval);
            waitMessage.textContent = "Content loaded."; // Replace with loaded message
        });
    } else {
        // Display regular content
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
    }

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