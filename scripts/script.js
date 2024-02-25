let API_URL;
let API_PORT;
let PTERO_URL;

// Function to parse YAML content
async function parseYAMLFile(filename) {
    try {
        // Load YAML file content
        const yamlContent = await loadYAMLFile(filename);
        // Parse YAML content
        const configData = jsyaml.load(yamlContent);
        // Set API_URL, API_PORT, and PTERO_URL
        API_URL = configData['pterodactyl']['apiurl'];
        API_PORT = configData['pterodactyl']['apiport'];
        PTERO_URL = configData['pterodactyl']['panelurl'];
        // Use API_URL, API_PORT, and PTERO_URL as needed
        console.log("API URL:", API_URL);
        console.log("API PORT:", API_PORT);
        console.log("PTERO URL:", PTERO_URL);
        // Call functions that use API_URL, API_PORT, and PTERO_URL
        fetchAndPopulateUsers();
        fetchAndPopulateServers();
        fetchAndPopulateNodes();
        fetchAndPopulateLocations();
    } catch (error) {
        console.error("Error parsing or loading YAML file:", error);
    }
}


async function loadYAMLFile(filename) {
    try {
        const response = await fetch(filename);
        if (!response.ok) {
            throw new Error('Failed to load YAML file');
        }
        const yamlContent = await response.text();
        return yamlContent;
    } catch (error) {
        console.error('Error loading YAML file:', error);
        throw error;
    }
}

// Example function that uses API_URL, API_PORT, and PTERO_URL
async function fetchAndPopulateUsers() {
    try {
        const response = await fetch(API_URL + ":" + API_PORT + "/users");
        if (!response.ok) {
            throw new Error('Failed to fetch users data');
        }
        const usersData = await response.json();
        console.log("Users data:", usersData);
    } catch (error) {
        console.error("Error fetching users data:", error);
    }
}

async function fetchAndPopulateServers() {
    try {
        const response = await fetch(API_URL + ":" + API_PORT + "/servers");
        if (!response.ok) {
            throw new Error('Failed to fetch servers data');
        }
        const serversData = await response.json();
        console.log("Servers data:", serversData);
    } catch (error) {
        console.error("Error fetching servers data:", error);
    }
}

// Usage
parseYAMLFile('../config.yml');


document.addEventListener('DOMContentLoaded', function() {
    fetchAndPopulateUsers();
    fetchAndPopulateServers();
    fetchAndPopulateNodes();
    fetchAndPopulateLocations();
});

console.log(`${API_URL}:${API_PORT}`)

function fetchAndPopulateUsers() {
    fetch(`${API_URL}:${API_PORT}/users`)
        .then(response => response.json())
        .then(users => {
            const usersTable = document.getElementById('users-table');
            if (!usersTable) {
                console.error("Users table element not found.");
                return;
            }

            users.forEach((user, index) => {
                const row = usersTable.insertRow();
                
                // Add serial number cell
                const serialCell = row.insertCell();
                serialCell.textContent = index + 1;

                // Add ID cell
                const idCell = row.insertCell();
                idCell.textContent = user.id;

                // Add email cell
                const emailCell = row.insertCell();
                emailCell.textContent = user.email;

                // Add username cell
                const usernameCell = row.insertCell();
                usernameCell.textContent = user.username;

                // Add first name cell
                const firstNameCell = row.insertCell();
                firstNameCell.textContent = user.first_name || 'Not available';
                console.log('First Name:', user.first_name);

                // Add last name cell
                const lastNameCell = row.insertCell();
                lastNameCell.textContent = user.last_name || 'Not available';
                console.log('Last Name:', user.last_name);

                // Add created at cell
                const createdAtCell = row.insertCell();
                createdAtCell.textContent = new Date(user.created_at).toLocaleDateString() || 'Not available';
                console.log('Created At:', user.created_at);
            });
        })
        .catch(error => console.error('Error fetching users data:', error));
}


function fetchAndPopulateServers() {
    fetch(`${API_URL}:${API_PORT}/servers`)
        .then(response => response.json())
        .then(data => {
            const serversTable = document.getElementById('servers-table');
            if (!serversTable) {
                console.error("Servers table element not found.");
                return;
            }

            data.forEach((server, index) => {
                const row = serversTable.insertRow();
                
                // Add serial number cell
                const serialCell = row.insertCell();
                serialCell.textContent = index + 1;

                // Add ID cell
                const idCell = row.insertCell();
                idCell.textContent = server.id;

                // Add name cell
                const nameCell = row.insertCell();
                nameCell.textContent = server.name;
                
                // Add description cell
                const descriptionCell = row.insertCell();
                descriptionCell.textContent = server.description || 'Not available';

                // Add status cell
                const statusCell = row.insertCell();
                statusCell.textContent = server.status || 'Not available';

                // Add "Click to open" button in the last column
                const actionCell = row.insertCell();
                const button = document.createElement('button');
                button.textContent = 'Click to open';
                button.classList.add('open-button');
                button.addEventListener('click', (event) => {
                    event.stopPropagation();
                    window.location.href = `https://${PTERO_URL}/server/${server.uuid}`;
                });
                actionCell.appendChild(button);
            });
        })
        .catch(error => console.error('Error fetching servers data:', error));
}



function fetchAndPopulateNodes() {
    fetch(`${API_URL}:${API_PORT}/nodes`)
        .then(response => response.json())
        .then(nodes => {
            const nodesTable = document.getElementById('nodes-table');
            if (!nodesTable) {
                console.error("Nodes table element not found.");
                return;
            }

            nodes.forEach((node, index) => {
                const row = nodesTable.insertRow();
                
                // Add serial number cell
                const serialCell = row.insertCell();
                serialCell.textContent = index + 1;

                // Add ID cell
                const idCell = row.insertCell();
                idCell.textContent = node.id;

                // Add name cell
                const nameCell = row.insertCell();
                nameCell.textContent = node.name;

                // Add location cell
                const locationCell = row.insertCell();
                locationCell.textContent = node.location;

                // Add created on cell
                const createdOnCell = row.insertCell();
                createdOnCell.textContent = new Date(node.created_at).toLocaleDateString();
            });
        })
        .catch(error => console.error('Error fetching nodes data:', error));
}

function fetchAndPopulateLocations() {
    fetch(`${API_URL}:${API_PORT}/locations`)
        .then(response => response.json())
        .then(locations => {
            const locationsTable = document.getElementById('locations-table');
            if (!locationsTable) {
                console.error("Locations table element not found.");
                return;
            }

            locations.forEach((location, index) => {
                const row = locationsTable.insertRow();
                
                // Add serial number cell
                const serialCell = row.insertCell();
                serialCell.textContent = index + 1;

                // Add ID cell
                const idCell = row.insertCell();
                idCell.textContent = location.id;

                // Add short name cell
                const shortNameCell = row.insertCell();
                shortNameCell.textContent = location.shortName;

                // Add long name cell
                const longNameCell = row.insertCell();
                longNameCell.textContent = location.longName || 'Not Available';

                // Add created on cell
                const createdOnCell = row.insertCell();
                createdOnCell.textContent = new Date(location.createdAt).toLocaleDateString();
            });
        })
        .catch(error => console.error('Error fetching locations data:', error));
}
