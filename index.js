/*

☆.。.:*・°☆.。.:*・°☆.。.:*・°☆.。.:*・°☆
                                                 
  _________ ___ ___ ._______   _________    
 /   _____//   |   \|   \   \ /   /  _  \   
 \_____  \/    ~    \   |\   Y   /  /_\  \  
 /        \    Y    /   | \     /    |    \ 
/_______  /\___|_  /|___|  \___/\____|__  / 
        \/       \/                     \/  
                    
DISCORD :  https://discord.com/invite/xQF9f9yUEM                   
YouTube : https://www.youtube.com/@GlaceYT                         
                                                                       
☆.。.:*・°☆.。.:*・°☆.。.:*・°☆.。.:*・°☆


*/

const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const express = require('express');
const path = require('path');

// Initialize Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ],
});

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000; // Railway provides PORT automatically

// Serve static HTML file
app.get('/', (req, res) => {
  const imagePath = path.join(__dirname, 'index.html');
  res.sendFile(imagePath);
});

// Keep-alive endpoint for external monitoring
app.get('/ping', (req, res) => {
  res.json({ 
    status: 'alive', 
    uptime: process.uptime(),
    bot_status: client.user ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// Start the web server
app.listen(port, '0.0.0.0', () => {
  console.log('\x1b[36m[ SERVER ]\x1b[0m', '\x1b[32m SHIVA Server running on port ' + port + ' ✅\x1b[0m');
  console.log('\x1b[36m[ INFO ]\x1b[0m', '\x1b[35m Environment: ' + (process.env.NODE_ENV || 'development') + '\x1b[0m');
});

// Bot status configuration
const statusMessages = ["Lille Interactive", "Sortie du jeu en juillet", ""];
const statusTypes = ['dnd', 'online', 'invisible'];
let currentStatusIndex = 0;
let currentTypeIndex = 0;

// Bot login function with error handling
async function login() {
  try {
    const token = process.env.TOKEN || process.env.DISCORD_TOKEN;
    if (!token) {
      throw new Error('Discord token not found. Please set TOKEN or DISCORD_TOKEN environment variable.');
    }
    
    await client.login(token);
    console.log('\x1b[36m[ LOGIN ]\x1b[0m', `\x1b[32mLogged in as: ${client.user.tag} ✅\x1b[0m`);
    console.log('\x1b[36m[ INFO ]\x1b[0m', `\x1b[35mBot ID: ${client.user.id} \x1b[0m`);
    console.log('\x1b[36m[ INFO ]\x1b[0m', `\x1b[34mConnected to ${client.guilds.cache.size} server(s) \x1b[0m`);
  } catch (error) {
    console.error('\x1b[31m[ ERROR ]\x1b[0m', 'Failed to log in:', error.message);
    console.error('\x1b[31m[ ERROR ]\x1b[0m', 'Please ensure your Discord token is correctly set in environment variables.');
    process.exit(1);
  }
}

// Update bot status function
function updateStatus() {
  if (!client.user) {
    console.error('\x1b[31m[ ERROR ]\x1b[0m', 'Client user not available for status update');
    return;
  }

  const currentStatus = statusMessages[currentStatusIndex];
  const currentType = statusTypes[currentTypeIndex];
  
  client.user.setPresence({
    activities: [{ name: currentStatus, type: ActivityType.Custom }],
    status: currentType,
  });
  
  console.log('\x1b[33m[ STATUS ]\x1b[0m', `Updated status to: ${currentStatus} (${currentType})`);
  
  // Cycle through status messages and types
  currentStatusIndex = (currentStatusIndex + 1) % statusMessages.length;
  currentTypeIndex = (currentTypeIndex + 1) % statusTypes.length;
}

// Heartbeat monitoring function
function heartbeat() {
  setInterval(() => {
    const timestamp = new Date().toLocaleTimeString();
    const ping = client.ws.ping;
    console.log('\x1b[35m[ HEARTBEAT ]\x1b[0m', `Bot is alive at ${timestamp} | Ping: ${ping}ms`);
  }, 30000); // Every 30 seconds
}

// Bot ready event handler
client.once('ready', () => {
  console.log('\x1b[36m[ INFO ]\x1b[0m', `\x1b[34mPing: ${client.ws.ping} ms \x1b[0m`);
  console.log('\x1b[32m[ READY ]\x1b[0m', 'Bot is now ready and operational!');
  
  // Set initial status
  updateStatus();
  
  // Set up status rotation (every 10 seconds)
  setInterval(updateStatus, 10000);
  
  // Start heartbeat monitoring
  heartbeat();
});

// Handle bot disconnection
client.on('disconnect', () => {
  console.log('\x1b[31m[ DISCONNECT ]\x1b[0m', 'Bot disconnected from Discord');
});

// Handle errors
client.on('error', (error) => {
  console.error('\x1b[31m[ CLIENT ERROR ]\x1b[0m', error);
});

// Handle process termination gracefully
process.on('SIGINT', () => {
  console.log('\x1b[33m[ SHUTDOWN ]\x1b[0m', 'Shutting down bot...');
  client.destroy();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\x1b[33m[ SHUTDOWN ]\x1b[0m', 'Shutting down bot...');
  client.destroy();
  process.exit(0);
});

// Start the bot
login();

/*

☆.。.:*・°☆.。.:*・°☆.。.:*・°☆.。.:*・°☆
                                                 
  _________ ___ ___ ._______   _________    
 /   _____//   |   \|   \   \ /   /  _  \   
 \_____  \/    ~    \   |\   Y   /  /_\  \  
 /        \    Y    /   | \     /    |    \ 
/_______  /\___|_  /|___|  \___/\____|__  / 
        \/       \/                     \/  
                    
DISCORD :  https://discord.com/invite/xQF9f9yUEM                   
YouTube : https://www.youtube.com/@GlaceYT                         
                                                                       
☆.。.:*・°☆.。.:*・°☆.。.:*・°☆.。.:*・°☆


*/
