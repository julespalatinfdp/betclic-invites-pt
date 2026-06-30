require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = '1517178158842118406'; // Même client ID que France
const GUILD_ID_PT = '1507359535013040318'; // Betclic Portugal

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
  try {
    console.log('🔄 Déploiement des commandes slash pour Betclic Portugal...');
    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID_PT),
      { body: commands },
    );
    console.log('✅ Commandes déployées avec succès pour Betclic Portugal !');
  } catch (error) {
    console.error('❌ Erreur lors du déploiement:', error);
  }
})();
