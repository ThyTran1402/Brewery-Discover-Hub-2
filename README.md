# Web Development Project 6 - *Brewery Discover Hub 2.0*

Submitted by: **Thy Tran**

This web app: **A comprehensive React-based brewery discovery platform featuring interactive data visualizations, detailed brewery information, and advanced analytics capabilities. Built as part of CodePath WEB102 Project 6.**

Time spent: **5** hours spent in total

## Required Features

The following **required** functionality is completed:

- [X] **Clicking on an item in the list view displays more details about it**
  - Clicking on an item in the dashboard list navigates to a detail view for that item
  - Detail view includes extra information about the item not included in the dashboard view
  - The same sidebar is displayed in detail view as in dashboard view
  - *To ensure an accurate grade, your sidebar **must** be viewable when showing the details view in your recording.*
- [X] **Each detail view of an item has a direct, unique URL link to that item’s detail view page**
  -  *To ensure an accurate grade, the URL/address bar of your web browser **must** be viewable in your recording.*
- [X] **The app includes at least two unique charts developed using the fetched data that tell an interesting story**
  - At least two charts should be incorporated into the dashboard view of the site
  - Each chart should describe a different aspect of the dataset


The following **optional** features are implemented:

- [X] The site’s customized dashboard contains more content that explains what is interesting about the data 
  - e.g., an additional description, graph annotation, suggestion for which filters to use, or an additional page that explains more about the data
- [X] The site allows users to toggle between different data visualizations
  - User should be able to use some mechanism to toggle between displaying and hiding visualizations 

  
The following **additional** features are implemented:

* [X] List anything else that you added to improve the site's functionality!

## Technology Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | Frontend Framework | 18.0+ |
| **React Router DOM** | Client-side Routing | 6.0+ |
| **Recharts** | Data Visualization Library | 2.0+ |
| **CSS3** | Styling & Animations | Latest |
| **Open Brewery DB API** | Data Source | REST API |

## Project Structure

```
src/
├── components/
│   ├── BreweryList.jsx          # Main brewery grid with navigation links
│   ├── BreweryList.css          # Brewery list styling
│   ├── DataVisualization.jsx   # Interactive charts with toggle controls
│   ├── DataVisualization.css   # Visualization styling
│   ├── DataAnalysisPage.jsx    # Comprehensive analysis page
│   ├── DataAnalysisPage.css    # Analysis page styling
│   ├── DetailView.jsx          # Individual brewery detail pages
│   ├── DetailView.css          # Detail view styling
│   ├── Sidebar.jsx             # Persistent navigation sidebar
│   ├── Sidebar.css             # Sidebar styling
│   ├── Statistics.jsx          # Summary statistics component
│   ├── SearchBar.jsx           # Real-time search functionality
│   └── [FilterComponents]/     # Various filter components
├── App.js                      # Main application with routing
├── App.css                     # Global application styles
└── index.js                    # Application entry point
```

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='/src/Project6CodePath.gif/' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with [ScreenToGif](https://www.screentogif.com/) for Windows


## Notes

Describe any challenges encountered while building the app.

## License

    Copyright [2025] [Thy Tran made with ❤️]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
