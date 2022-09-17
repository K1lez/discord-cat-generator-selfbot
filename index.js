const { Client } = require('discord.js-selfbot-v13');
const client = new Client({checkUpdate: false});
const settings = require('./settings.json');
const { request } = require('undici');

client.once('ready', async () => {
    console.log(`Cat Generator is work and loaded :) (Logged into ${client.user.username})`)
});

client.on('messageCreate', async (msg) => {
    if(msg.content == '.cat' && msg.author.id == client.user.id){
        const catRequest = await request('https://api.thecatapi.com/v1/images/search');
        const response = await getJSONResponse(catRequest.body);
        msg.reply(response[0].url);
    }
});

async function getJSONResponse(body) {
	let fullBody = '';

	for await (const data of body) {
		fullBody += data.toString();
	}

	return JSON.parse(fullBody);
}


client.login(settings.token);