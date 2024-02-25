let API_URL;
let API_PORT;
let PTERO_URL;

async function parseYAMLFile(filename) {
    try {
        const yamlContent = await loadYAMLFile(filename);
        const configData = jsyaml.load(yamlContent);
        API_URL = configData['pterodactyl']['apiurl'];
        API_PORT = configData['pterodactyl']['apiport'];
        PTERO_URL = configData['pterodactyl']['panelurl'];
        console.log("API URL:", API_URL);
        console.log("API PORT:", API_PORT);
        console.log("PTERO URL:", PTERO_URL);
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

parseYAMLFile('../config.yml');

document.addEventListener('DOMContentLoaded', function() {
    fetchAndPopulateUsers();
    fetchAndPopulateServers();
    fetchAndPopulateNodes();
    fetchAndPopulateLocations();
});

console.log(`${API_URL}:${API_PORT}`);

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
                const serialCell = row.insertCell();
                serialCell.textContent = index + 1;
                const idCell = row.insertCell();
                idCell.textContent = user.id;
                const emailCell = row.insertCell();
                emailCell.textContent = user.email;
                const usernameCell = row.insertCell();
                usernameCell.textContent = user.username;
                const firstNameCell = row.insertCell();
                firstNameCell.textContent = user.first_name || 'Not available';
                const lastNameCell = row.insertCell();
                lastNameCell.textContent = user.last_name || 'Not available';
                const createdAtCell = row.insertCell();
                createdAtCell.textContent = new Date(user.created_at).toLocaleDateString() || 'Not available';
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
                const serialCell = row.insertCell();
                serialCell.textContent = index + 1;
                const idCell = row.insertCell();
                idCell.textContent = server.id;
                const nameCell = row.insertCell();
                nameCell.textContent = server.name;
                const descriptionCell = row.insertCell();
                descriptionCell.textContent = server.description || 'Not available';
                const statusCell = row.insertCell();
                statusCell.textContent = server.status || 'Not available';
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
                const serialCell = row.insertCell();
                serialCell.textContent = index + 1;
                const idCell = row.insertCell();
                idCell.textContent = node.id;
                const nameCell = row.insertCell();
                nameCell.textContent = node.name;
                const locationCell = row.insertCell();
                locationCell.textContent = node.location;
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
                const serialCell = row.insertCell();
                serialCell.textContent = index + 1;
                const idCell = row.insertCell();
                idCell.textContent = location.id;
                const shortNameCell = row.insertCell();
                shortNameCell.textContent = location.shortName;
                const longNameCell = row.insertCell();
                longNameCell.textContent = location.longName || 'Not Available';
                const createdOnCell = row.insertCell();
                createdOnCell.textContent = new Date(location.createdAt).toLocaleDateString();
            });
        })
        .catch(error => console.error('Error fetching locations data:', error));
}
