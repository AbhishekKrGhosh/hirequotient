# HireQuotient Assignment
## Live link of the assignment: https://hirequotient-2y4w.onrender.com/

![image](https://github.com/AbhishekKrGhosh/hirequotient/assets/92973940/60f916e8-49a5-4e83-bba7-cf63762cdf8f)


![image](https://github.com/AbhishekKrGhosh/hirequotient/assets/92973940/ab990f61-adc8-4367-baf9-df972b64dd52)


![image](https://github.com/AbhishekKrGhosh/hirequotient/assets/92973940/e0b2172e-0e17-4e12-a0ef-538f5bddc8d7)

The data is being fetched from the api: https://canopy-frontend-task.vercel.app/api/holdings

This project fetches data from an API endpoint using Axios, organizes the data based on asset classes, and dynamically displays it in a collapsible table format using Material-UI components. Each group of holdings can be expanded or collapsed individually, providing a user-friendly interface to view and manage data. The styling, including background colors and borders, is implemented using styled components for a visually appealing and cohesive design. This component enhances data presentation and interaction, making it suitable for applications requiring organized and interactive data display in a table format.

# Holdings Table Component

This React component fetches data from an API endpoint using Axios and displays the data in a table format using Material-UI components. Here's a breakdown of the key elements:

## Dependencies

- React for building the UI components.
- Axios for making asynchronous HTTP requests.
- Material-UI for UI components and styling.

## Styled Components

- `Component`, `StyledArrowUp`, `StyledKeyboardArrowDown`, `TableCellNew`, `TableCellNewData`, and `TypographyNew` are styled components using Material-UI's styling capabilities.

## State Management

- `useState` and `useEffect` hooks are used for managing component-level state and handling side effects like data fetching.
- `holdingsData` stores the fetched data.
- `expandedGroups` manages the state of expanded groups in the table.

## Data Fetching

- The `useEffect` hook is used to fetch data from the specified API endpoint (`https://canopy-frontend-task.now.sh/api/holdings`) when the component mounts.
- Fetched data is stored in `holdingsData` state.

## Rendering Table

- Data is grouped based on `asset_class` using `reduce` to prepare for rendering in grouped sections.
- Mapped over grouped data to render each group in a collapsible section with expand/collapse functionality.

## Styling

- Background colors, borders, and other styles are applied using styled components to achieve a visually appealing UI.

<hr>

# Run the Project Locally

### Clone the repository:

`git clone https://github.com/AbhishekKrGhosh/hirequotient.git`

### Navigate to the project directory:

`cd hirequotient`

### Install dependencies:
`npm install`

### Start the development server:
`npm start`

### View the Project

To view the project in your browser, open [http://localhost:3000](http://localhost:3000) in your web browser after starting the development server.
