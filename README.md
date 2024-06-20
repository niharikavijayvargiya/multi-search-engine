# Multi-Search Engine Interface

## Overview

The Multi-Search Engine Interface is a web application that allows users to select and redirect to different search engines, including Google, Gemini, and Wikipedia, from a central interface. The application is designed with a responsive layout, ensuring it works well on various devices and screen sizes.

## Features

- **Home Page**: Central interface to select from Google, Gemini, or Wikipedia search engines.
- **Search Engine Pages**: Dedicated pages for each search engine with their specific search functionalities.
- **Responsive Design**: Ensures the application works on different screen sizes and devices.
- **Dynamic Header**: Consistent header across all pages with navigation buttons to switch between search engines and the home page.

## Technologies Used

- HTML
- CSS
- JavaScript

## Getting Started

### Prerequisites

- Web browser (Chrome, Firefox, Safari, etc.)
- Text editor (VS Code, Sublime Text, etc.)

### Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/your-username/multi-search-engine-interface.git

2. **Navigate to the project directory**:
   ```sh
   cd multi-search-engine-interface
3. **File Structure**:
   ```sh
   multi-search-engine-interface/
│
├── index.html
├── google.html
├── gemini.html
├── wikipedia.html
├── styles.css
├── images/
│   └── multi-search-engine-logo.png
├── scripts/
│   └── script.js
└── README.md
## How to Run

1. **Open `index.html` in a web browser**:
   Simply double-click the `index.html` file, or open it with your web browser.

## Customization

### Update the Background Image

Replace `multi-search-engine-logo.png` in the `images` directory with your preferred background image.

### Modify Styles

Update `styles.css` to change the look and feel of the interface.

### CSS Media Queries for Responsive Design

To ensure the header and other elements are responsive, the following media queries are used in `styles.css`:

```css
/* Default styles for header */
header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 10px 20px;
    background-color: white;
    width: 100%;
    box-sizing: border-box;
}

.header-buttons {
    display: flex;
    gap: 10px;
}

.header-button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
}

/* Adjustments for smaller screens */
@media (max-width: 576px) {
    header {
        justify-content: center; /* Center align buttons on smaller screens */
        padding: 10px; /* Adjust padding */
    }

    .header-buttons {
        flex-wrap: wrap; /* Wrap buttons to new line */
        justify-content: center; /* Center buttons */
    }

    .header-button {
        padding: 8px 12px; /* Adjust button padding */
        font-size: 12px; /* Adjust button font size */
    }
}
## Adding More Search Engines

To add more search engines:

1. **Create a new HTML file for the search engine**:
   ```sh
   touch new_search_engine.html


2. **Update index.html and header**:
   ```sh
   Add a button for the new search engine and link it to the new HTML file.

3. **Implement the search functionality**:
   ```sh
   Add necessary JavaScript or embed code for the new search engine in the new HTML file.

Contact
For any inquiries or issues, please contact niharikajivijay@gmail.com

