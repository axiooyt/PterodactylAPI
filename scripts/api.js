const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;
app.use(cors());


const config = require('config-yml');
const PTERO_URL = config.pterodactyl.panelurl;
const API_KEY = config.pterodactyl.apikey;
  

// Endpoint to fetch users data
app.get('/users', async (req, res) => {
    try {
        const response = await axios.get(`${PTERO_URL}/api/application/users`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Accept': 'application/json'
            }
        });

        const users = response.data.data.map(user => {
            return {
                id: user.attributes.id,
                username: user.attributes.username,
                email: user.attributes.email,
                first_name: user.attributes.first_name,
                last_name: user.attributes.last_name,
                created_at: user.attributes.created_at
            };
        });

        res.json(users);
    } catch (error) {
        console.error('Error fetching users data:', error.message);
        res.status(500).send('Error fetching users data');
    }
});

// Endpoint to fetch servers data
app.get('/servers', async (req, res) => {
    try {
        const response = await axios.get(`${PTERO_URL}/api/application/servers`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Accept': 'application/json'
            }
        });

        const servers = response.data.data.map(server => {
            return {
                id: server.attributes.id,
                name: server.attributes.name,
                description: server.attributes.description,
                isOnline: server.attributes.is_online,
                status: server.attributes.status,
                uuid: server.attributes.identifier,
                ram: server.attributes.limits.memory,
                disk: server.attributes.limits.disk,
                io: server.attributes.limits.io,
                cpu: server.attributes.limits.cpu
            };
        });

        res.json(servers);
    } catch (error) {
        console.error('Error fetching servers data:', error.message);
        res.status(500).send('Error fetching servers data');
    }
});

// Endpoint to fetch nodes data
app.get('/nodes', async (req, res) => {
    try {
        const response = await axios.get(`${PTERO_URL}/api/application/nodes`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Accept': 'application/json'
            }
        });

        const nodes = response.data.data.map(node => {
            return {
                id: node.attributes.id,
                name: node.attributes.name,
                location: node.attributes.location_id,
                isPublic: node.attributes.public,
                fdqn: node.attributes.fdqn,
                created_at: node.attributes.created_at
            };
        });

        res.json(nodes);
    } catch (error) {
        console.error('Error fetching nodes data:', error.message);
        res.status(500).send('Error fetching nodes data');
    }
});

// Endpoint to fetch locations data
app.get('/locations', async (req, res) => {
    try {
        const response = await axios.get(`${PTERO_URL}/api/application/locations`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Accept': 'application/json'
            }
        });

        const locations = response.data.data.map(location => {
            return {
                id: location.attributes.id,
                shortName: location.attributes.short,
                longName: location.attributes.long,
                totalNodes: location.attributes.total_nodes,
                totalServers: location.attributes.total_servers,
                createdAt: location.attributes.created_at,
            };
        });

        res.json(locations);
    } catch (error) {
        console.error('Error fetching locations data:', error.message);
        res.status(500).send('Error fetching locations data');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});