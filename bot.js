const sqlite3 = require('sqlite3');
require('dotenv').config();
var XMLHttpRequest = require('xhr2');
var fs = require('fs');
var tmi = require('tmi.js');
const ciqlJSON = require('ciql-json')
var request = require('request');
var moment = require('moment');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
var config = require('./bot_config.json');
var httpRequest = require('https');

var opts = {
	options: {
		debug: false
	},

	identity: {
		username: process.env.TWITCH_BOT_USERNAME,
		password: process.env.TWITCH_OAUTH_TOKEN
	},
	connection: {
		secure: true
	},
	channels: [
		"ribcrush",
		"emiru"
	]
};
var client = new tmi.client(opts);

client.on('message', onMessageHandler);

client.on('raided', onRaidHandler); //raid
client.on('submysterygift', onSubMysteryGiftHandler); //multiple gifts
client.on('subgift', onSubGiftHandler); //single gift
client.on('subscription', onSubHandler); //normal sub
client.on('resub', onResubHandler); //normal resub

client.connect();
client.on('connected', onConnectHandler);

var customs = new Set();
var editable = new Set();
editable.add("!elo").add("!rank").add("!pb").add("!buns").add("!team").add("!squad");

function onConnectHandler() {
	console.log("CONNECTED");
	const db = new sqlite3.Database('./newUsers.db');
	db.all("SELECT command FROM customCommands", (err, rows) => {
			rows.forEach(function (row) {
				customs.add(row.command);
			})
		});
	db.close();
}

var mass_sub_gift = 0;

function onRaidHandler(channel, username, viewers, tags) {
	if(tags['msg-param-login'].toLowerCase() != username.toLowerCase())
		client.say(channel, `${tags['msg-param-login']} (${username}) is raiding us with ${viewers} viewer(s)! emiruHYPERBUN thank u, u are epic catKISS`);
	else
		client.say(channel, `${username} is raiding us with ${viewers} viewer(s)! emiruHYPERBUN thank u, u are epic catKISS`);
}

function onSubMysteryGiftHandler(channel, username, giftSubCount, methods, tags) {
	client.say(channel, `${username} just gifted ${giftSubCount} subs!!! hell yea emiruDDR`);
	if(giftSubCount >= 2)
		mass_sub_gift += giftSubCount;
}

function onSubGiftHandler(channel, username, streakMonths, recipient, methods, tags) {
	if(mass_sub_gift > 0)
		mass_sub_gift--;
	else {
		if(tags['msg-param-recipient-user-name'].toLowerCase() != recipient.toLowerCase())
			client.say(channel, `${username} just gifted ${tags['msg-param-recipient-user-name']} (${recipient}) a sub! emiruEZ 👉 <3`);
		else
			client.say(channel, `${username} just gifted ${recipient} a sub! emiruEZ 👉 <3`);
	}
}

function onSubHandler(channel, username, methods, msg, tags) {
	if(methods["prime"])
		client.say(channel, `${username} just subscribed with TWITCH PRIME! widepeepoHappyRightHeart emiruPRIME <3`);
	else
		client.say(channel, `${username} just subscribed! PartyKirby Welcome emiruPls emiruCHAMP <3`);
}

function onResubHandler(channel, username, streakMonths, msg, tags, methods) {
	if(username.toLowerCase() != tags['login'].toLowerCase())
		client.say(channel, `/me ${tags['login']} (${username})just subscribed for ${tags["msg-param-cumulative-months"]} months in a row! thank you homie Drake <3 <3 <3 <3`);
	else
		client.say(channel, `/me ${username} just subscribed for ${tags["msg-param-cumulative-months"]} months in a row! thank you homie Drake <3 <3 <3 <3`);
}

const fileUrl = './cookie.txt';
const cannonFile = './cannon.txt';
const titleFile = './title.txt';

var badIDs = []
			
var safeCommands = ['!vanish', '!time', '!roulette'];

var goodIDs = [];

var cookie = Number(fs.readFileSync(fileUrl));
var cannons = Number(fs.readFileSync(cannonFile));
var streamTitle = fs.readFileSync(titleFile);


var rouletteActive = true;
var cookieActive = true;
var hateActive = true;
var loveActive = true;
var cannonActive = true;
var wednesdayActive = true;
var thursdayActive = true;
var wooActive = true;
var titleActive = true;
var chineseGermanActive = true;
var brotherActive = true;
var rulesActive = true;
var smiteActive = true;
var magicBallActive = true;
var sadActive = true;
var weebActive = true;
var discordActive = true;
var eloActive = true;
var rankActive = true;
var instagramActive = true;
var merchActive = true;
var opggActive = true;
var playlistActive = true;
var subActive = true;
var twitterActive = true;
var wallpapersActive = true;
var emiruezActive = true;
var hypeActive = true;
var cosplayActive = true;
var uwuActive = true;
var dmcaActive = true;
var faqActive = true;
var heightActive = true;
var tiktokActive = true;
var vanishActive = true;
var uptimeActive = true;
var followageActive = true;
var accountAgeActive = true;
var giveawayActive = true;
var songActive = true;
var neonblueActive = true;
var timeActive = true;
var toptimeActive = true;
var pbActive = true;
var bunsActive = true;
var mommyActive = true;
var youtubeActive = true;
var shortsActive = true;
var podcastActive = true;
var primeActive = true;
var gambleActive = true;
var pingActive = true;
var poActive = true;
var redditActive = true;
var starforgeActive = true;
var helpActive = true;
var essenceActive = true;
var teamActive = true;
var scheduleActive = true;
var timeoffActive = true;
var queryActive = true;
var commandsActive = true;


/*REDEEMED COMMANDS START HERE*/
var emiru_e_Active = true;
var kattahActive = true;
/*REDEEMED COMMANDS  END  HERE*/



var emiruDancyCount = 0;
var midnight = "0:00:00";
var now = null;
var emiruDancyActive = true;

const responses = ['All signs point to yes...', 'Yes!', 'My sources say nope.', 'You may rely on it.', 'Concentrate and ask again...', 'Outlook not so good...', 'It is decidedly so!', 'Better not tell you.', 'Very doubtful.', 'Yes - Definitely!', 'It is certain!', 'Most likely.', 'Ask again later.', 'No!', 'Outlook good.', 'Don\'t count on it.', 'No don\'t even think about.', 'hells no.', 'look deep in your heart and you will see the answer', 'the answer might not be not no', 'if the Twitch gods grant it Prayge'];

const survivalResponses = ['The trigger is pulled, and the revolver clicks. ${tags.username} has lived to survive roulette!', 'The trigger is pulled, but the revolver malfunctions! ${tags.username} has miraculously lived to survive roulette!'];

const deathResponses = ['The trigger is pulled, and the revolver fires! ${tags.username} lies dead in chat'];

const helpCommands = ['roulette', 'cookie', 'hate', 'love', '8ball', 'uptime', 'followage', 'accountage', 'watchtime', 'time', 'toptime'];

var blackistedWords = ['mommy', 'm0mmy'];
var searchRegex = new RegExp(blackistedWords.join('|'), 'g');

process
	.on('SIGINT', function() {
		var rawData = fs.readFileSync('data.json');
		var data = JSON.parse(rawData).emiruDancy;
		emiruDancyCount += parseInt(data);
		if(emiruDancyCount === parseInt(data))
			process.exit(0);
		else {
			ciqlJSON
				.open("data.json")
				.set("emiruDancy", emiruDancyCount)
				.save();
			process.exit(0);
		}
	})
	.on('unhandledRejection', (reason, p) => {
		console.error(reason, 'Bruh Unhandled Rejection at Promise', p);
		process.exit(1);
	})
	.on('uncaughtException', err => {
		console.error(err, 'Bruh Uncaught Exception thrown');
		process.exit(1);
	});

function onMessageHandler(channel, tags, message, self) {
	if(self) return;
    
	var regexMessage = message.replaceAll('0', 'o').replaceAll('ο', 'o').replaceAll('о', 'o').replaceAll('օ', 'o').replaceAll('у', 'y').replaceAll('γ', 'y').replaceAll('М', 'm');

	if(regexMessage.toLowerCase().match(searchRegex) !== null) { // || message.toLowerCase().match(reg2) !== null) {
		client.say(channel, `/timeout ${tags.username} 300 Using a blacklisted phrase`);
		//timeoutUser('timeout', tags.username, 300, 'Using a blacklisted phrase');
		// client.say(channel, `@${tags.username}, Please use english characters in this channel (automated message)`);
		mommyActive = false;
		setTimeout(() => {
			mommyActive = true;
		}, 500);
		return;
	}
	message = message.replace(/[^ -\~]/g, '').trimEnd();

	if(tags.username === "emirubot")
		process.exit(0);
		
	if(message.includes("emiruDancy") && message[0] !== '!' && !self) {
		emiruDancyCount += message.split("emiruDancy").length - 1;
		now = moment().format("H:mm:ss");
		if(now === midnight) {
			var rawData = fs.readFileSync('data.json');
			var data = JSON.parse(rawData).emiruDancy;
			emiruDancyCount += parseInt(data);
			ciqlJSON
				.open("data.json")
				.set("emiruDancy", emiruDancyCount)
				.save();
			emiruDancyCount = 0;
		}
	}

	const myMessage = message.toString().split(/\s+/g);
		
	if(customs.has(myMessage[0].toLowerCase())) {
		const db = new sqlite3.Database('./newUsers.db');
		db.get("SELECT response, isOnCooldown FROM customCommands WHERE command = $command", {$command: myMessage[0].toLowerCase()}, (err, row) => {
			if(err) {
				var now = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });
				console.log(now, '-> ', "CUSTOMS EXISTENCE ERROR");
				console.log(customs);
				console.log(myMessage);
				console.log(err);
			}
			else if(row.isOnCooldown == 1) {
				return;
			}
			else {		
				if(myMessage[1]) {
					if(myMessage[1].startsWith('@'))
						myMessage[1] = myMessage[1].slice(1);
					client.say(channel, `@${myMessage[1]} ${row.response}`);
				}
				else
					client.say(channel, `@${tags.username} ${row.response}`);
				
				changeCooldownBool(myMessage[0].toLowerCase(), 1, channel, tags);
				
				setTimeout(() => {
					changeCooldownBool(myMessage[0].toLowerCase(), 0, channel, tags);
				}, 2500);
			}
		});
		db.close();
	}

	switch(myMessage[0].toLowerCase()) {
		case '!emirudancy':
			if(emiruDancyActive) {
				var rawData = fs.readFileSync('data.json');
				var data = JSON.parse(rawData);
				var total = emiruDancyCount + data.emiruDancy;
				var count = Number(total).toLocaleString("en-US");
				
				client.say(channel, `emiruDancy has been used: ${count} times`);
				
				emiruDancyActive = false;
				setTimeout(() => {
					emiruDancyActive = true;
				}, 2500);
			}
			break;
				
		case '!addcom':
			if(tags.badges.broadcaster == 1 || goodIDs.includes(tags['user-id'])) {
				var command = myMessage[1].toLowerCase();
				var commandArgs = [];
				for(var i = 2; i < myMessage.length; i++) {
					commandArgs.push(myMessage[i]);
				}
				var response = commandArgs.join(' ');
				
				const db = new sqlite3.Database('./newUsers.db');
				var sql = `INSERT INTO customCommands (command, response, cooldown, isOnCooldown) VALUES ('!${command}', '${response}', 2500, 0)`;
				db.run(sql, (err) => {
					if(err) {
						var now = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });
						client.say(channel, `@${tags.username}, Something went wrong with adding the command`);
						console.log("ADDITION ERROR");
						console.log(now);
						console.log(err);
					}
					else {
						client.say(channel, `@${tags.username}, !${command} was added`);
						customs.add('!' + command)
					}
				});
				db.close();
			}
			break;
            
		case '!editcom':
			if(tags.badges.broadcaster == 1 || goodIDs.includes(tags['user-id'])) {
				if(myMessage[1] === 'cosplay') {
					var cosplayEditArgs = [];
					for(var i = 2; i < myMessage.length; i++) {
						cosplayEditArgs.push(myMessage[i]);
					}
					var newString = cosplayEditArgs.join(' ');
				
					ciqlJSON
						.open("data.json")
						.set("cosplay", newString)
						.save();
						
					client.say(channel, `@${tags.username}, Cosplay command updated`);
				}
				else if(editable.has(myMessage[1].toLowerCase())) {
					if(myMessage[1] == "!squad")
						myMessage[1] = "!team";
					
					var commandToEdit = myMessage[1].toLowerCase().slice(1);
					var args = [];
					for(var i = 2; i < myMessage.length; i++) {
						args.push(myMessage[i]);
					}
					var newResponse = args.join(' ');
					
					ciqlJSON
						.open("editableCommands.json")
						.set(commandToEdit, newResponse)
						.save();
						
					client.say(channel, `@${tags.username}, ${commandToEdit} command updated`);
				}
				else if(customs.has(myMessage[1].toLowerCase())) {
					var command = myMessage[1].toLowerCase();
					var args = [];
					for(var i = 2; i < myMessage.length; i++) {
						args.push(myMessage[i]);
					}
					var response = args.join(' ');
					var sql = `UPDATE customCommands SET response = '${response}' WHERE command = '${command}'`;
					const db = new sqlite3.Database('./newUsers.db');
					db.run(sql, (err) => {
						if(err) {
							var now = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });
							client.say(channel, `@${tags.username}, Something went wrong with editing the command`);
							console.log("EDITING ERROR");
							console.log(now);
							console.log(err);
						}
						else
							client.say(channel, `@${tags.username}, the ${command} command was successfully updated`);
					});
					db.close();
				}
			}
			break;
			
		case '!delcom':
			if(tags.badges.broadcaster == 1 || goodIDs.includes(tags['user-id'])) {
				var args = [];
				for(var i = 1; i < myMessage.length; i++) {
					if(!myMessage[i].includes('!')) {
						args.push(`'!${myMessage[i]}'`);
						customs.delete('!' + myMessage[i]);
					}
					else {
						args.push(`'${myMessage[i]}'`);
						customs.delete(myMessage[i]);
					}
				}
				var command = args.join(', ').toLowerCase();
				const db = new sqlite3.Database('./newUsers.db');
				var sql = `DELETE FROM customCommands WHERE command IN (${command})`;
				db.run(sql, (err) => {
					if(err) {
						var now = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });
						client.say(channel, `@${tags.username}, Something went wrong with deleting the command`);
						console.log("DELETION ERROR");
						console.log(now);
						console.log(err);
					}
					else
						client.say(channel, `@${tags.username}, the following command(s) were deleted: ${command}`);
				});
				db.close();
			}
			break;
			
		case '!quit':
			if(goodIDs.includes(tags['user-id'])) {
				console.log(`${tags.username} has stopped the bot`);
				process.exit(0);
			}
			break;

		case '!roulette':
			if(rouletteActive) {
				var rouletteVal = Math.random() * 6;
				if(myMessage[1] === undefined) {
					client.say(channel, `/me places the revolver to @${tags.username}'s head`);
					setTimeout(() => {
						if(rouletteVal < (1/6)) {
							var death = deathResponses[Math.floor(Math.random() * deathResponses.length)];
							let deathTPL = eval('`' + death + '`');
							client.say(channel, `${deathTPL}`);
							client.say(channel, `/timeout ${tags.username} 10 Lost the roulette`);
							//timeoutUser('timeout', tags.username, 10, 'Lost the roulette');
						}
						else {
							var survive = survivalResponses[Math.floor(Math.random() * survivalResponses.length)];
							let survivalTPL = eval('`' + survive + '`');
							client.say(channel, `${survivalTPL}`);
						}
					}, 1500);
				}
				
				else if(myMessage[1] !== undefined && myMessage[2] === undefined) { //no chambers specified START
					if(!isNaN(myMessage[1]) && (myMessage[1] > 604800)) {
						client.say(channel, `Max timeout of 1 week (604,800 seconds) exceeded`);
					}
					else {
						client.say(channel, `/me places the revolver to @${tags.username}'s head`);
						setTimeout(() => {
							if(rouletteVal < (1/6)) {
								var death = deathResponses[Math.floor(Math.random() * deathResponses.length)];
								let deathTPL = eval('`' + death + '`');
								client.say(channel, `${deathTPL}`);
								
								if(myMessage[1] === 'random') {
									if(rouletteVal < 0.03) {
										client.say(channel, `${tags.username} unfortunately you've got terrible luck and have hit the special hidden chamber which perma bans you.  You will be banned in 10 seconds so say your goodbyes.`);
										setTimeout(() => {
											client.say(channel, `/ban ${tags.username} Hit the special chamber of the roulette that bans :(`);
											//timeoutUser('ban', tags.username, , 'infinite', 'Hit the special chamber of the roulette that bans :(');
										}, 10000);
									}
									else {
										var randomTime = Math.floor(Math.random() * (3600 - 1 + 1) + 1);
										client.say(channel, `/timeout ${tags.username} ${randomTime} Lost the roulette and chose random timeout`);
										//timeoutUser('timeout', tags.username, randomTime, 'Lost the roulette and chose a random timeout');
									}
								}
								else  if(!isNaN(myMessage[1]) && myMessage[1] != 0) {
									var timeout = parseInt(myMessage[1]);
									client.say(channel, `/timeout ${tags.username} ${timeout} Lost the roulette and chose their own timeout`);
									//timeoutUser('timeout', tags.username, timeout, 'Lost the roulette and chose their own timeout');
								}
								else {
									client.say(channel, `${tags.username}, you tried to use a bad value and therefore your punishment is 5 minutes`);
									client.say(channel, `/timeout ${tags.username} 300 Lost the roulette`);
									//timeoutUser('timeout', tags.username, 300, 'Lost the roulette');
								}
							}
							else {
								var survive = survivalResponses[Math.floor(Math.random() * survivalResponses.length)];
								let survivalTPL = eval('`' + survive + '`');
								client.say(channel, `${survivalTPL}`);
							}
						}, 1500);
					}
					
				} //no chambers specified END
				
				else if( (myMessage[1] !== undefined && myMessage[2] !== undefined) && (!isNaN(myMessage[1])) && (!isNaN(myMessage[2]) || myMessage[2] === 'random') ) { //chambers specified START
					if(!isNaN(myMessage[2]) && myMessage[2] > 604800) {
						client.say(channel, `Max timeout of 1 week (604,800 seconds) exceeded`);
					}
					else if(!isNaN(myMessage[2]) && myMessage[2] < 1) {
						client.say(channel, `${tags.username}, you tried to use a bad value and therefore your punishment is 5 minutes`);
						client.say(channel, `/timeout ${tags.username} 300 Used bad value for the roulette`);
						//timeoutUser('timeout', tags.username, 300, 'Used bad value for the roulette');
					}
					else {
						var chambers = 1;
						if(!isNaN(myMessage[1])) {
							if(myMessage[1] > 6)
								chambers = 6;
							else if(myMessage[1] < 1)
								chambers = 1;
							else
								chambers = myMessage[1];
						}
						client.say(channel, `/me places the revolver to @${tags.username}'s head`);
						setTimeout(() => {
							if(rouletteVal < chambers) {
								var death = deathResponses[Math.floor(Math.random() * deathResponses.length)];
								let deathTPL = eval('`' + death + '`');
								client.say(channel, `${deathTPL}`);
								
								if(myMessage[2] === 'random') {
									if(rouletteVal < 0.03) {
										client.say(channel, `${tags.username} unfortunately you've got terrible luck and have hit the special hidden chamber which perma bans you.  You will be banned in 10 seconds so say your goodbyes.`);
										setTimeout(() => {
											client.say(channel, `/ban ${tags.username} Hit the special chamber of the roulette that bans :(`);
											//timeoutUser('ban', tags.username, 'infinite', 'Hit the special chamber of the roulette that bans :(');
										}, 10000);
									}
									else {
										const randomTime = Math.floor(Math.random() * (3600 - 1 + 1) + 1);
										client.say(channel, `/timeout ${tags.username} ${randomTime} Lost the roulette and chose random timeout`);
										//timeoutUser('timeout', tags.username, randomTime, 'Lost the roulette and chose a random timeout');
									}
								}
								else if(!isNaN(myMessage[2]) && myMessage[2] != 0) {
									var timeout = parseInt(myMessage[2]);
									client.say(channel, `/timeout ${tags.username} ${timeout} Lost the roulette and chose their own timeout duration`);
									//timeoutUser('timeout', tags.username, timeout, 'Lost the roulette and chose their own timeout');
								}
								else {
									client.say(channel, `${tags.username}, you tried to use a bad value and therefore your punishment is 5 minutes`);
									client.say(channel, `/timeout ${tags.username} 300 Lost the roulette`);
									//timeoutUser('timeout', tags.username, 300, 'Lost the roulette');
								}
							}
							else {
								var survive = survivalResponses[Math.floor(Math.random() * survivalResponses.length)];
								let survivalTPL = eval('`' + survive + '`');
								client.say(channel, `${survivalTPL}`);
							}
						}, 1500);
					}
				} //chambers specified END
				
				else {
					client.say(channel, `${tags.username}, you tried to use a bad value and therefore your punishment is 5 minutes`);
					client.say(channel, `/timeout ${tags.username} 300 Used bad value for the roulette`);
					//timeoutUser('timeout', tags.username, 300, 'Used bad value for the roulette');
				}

				rouletteActive = false;
				setTimeout(() => {
					rouletteActive = true;
				}, 5000);
			}
			break;

		case '!cookie':
			if(cookieActive) {
				const cookieVal = Math.ceil((Math.random() - 0.5) * 200);
				cookie += cookieVal;
				if(cookieVal < 0)
					client.say(channel, `You lost: ${cookieVal} cookies.  New cookie value: ${cookie}`);
				else
				{
					if(cookieVal == 1)
						client.say(channel, `You got: ${cookieVal} cookie.  New value: ${cookie}`);
					else
						client.say(channel, `You earned: ${cookieVal} cookies.  New cookie value: ${cookie}`);
				}
				fs.writeFile(fileUrl, cookie.toString(), (err) => {
					if(err)
						throw err;
				});
				cookieActive = false;
				setTimeout(() => {
					cookieActive = true;
				}, 2500);
			}
			break;

		case '!hate':
			if(hateActive) {
				const hateVal = Math.floor(Math.random() * 100) + 1 + '%';
				if(myMessage[1] === undefined)
					myMessage[1] = tags.username;
				client.say(channel, `There is ${hateVal} hatred between ${tags.username} and ${myMessage[1]} emiruANGRY `)

				hateActive = false;
				setTimeout(() => {
					hateActive = true;
				}, 2500);
			}
			break;

		case '!love':
			if(loveActive) {
				const loveVal = Math.floor(Math.random() * 100) + 1 + '%';
				if(myMessage[1] === undefined)
					myMessage[1] = tags.username;
				client.say(channel, `♥ There is ${loveVal} love between ${tags.username} and ${myMessage[1]} emiruLOVE ♥`)

				loveActive = false;
				setTimeout(() => {
					loveActive = true;
				}, 2500);
			}
			break;

		case '!cannon':
			if(cannonActive) {
				cannons++;
				client.say(channel, `Emiru has missed cannon ${cannons} times emiruYIKES`);

				fs.writeFile(cannonFile, cannons.toString(), (err) => {
					if(err)
						throw err;
				});

				cannonActive = false;
				setTimeout(() => {
					cannonActive = true;
				}, 2500);
			}
			break;

		case '!wednesday':
			if(wednesdayActive) {
				const timeZone = new Date().toLocaleString("en-US", { timeZone: "America/Chicago" });
				const day = new Date(timeZone).getDay();
				if(day === 3)
					client.say(channel, `emiWOO WOO WEDNESDAY emiWOO`);
				else
					client.say(channel, `It's not wednesday`);

				wednesdayActive = false;
				setTimeout(() => {
					wednesdayActive = true;
				}, 2500);
			}
			break;
			
		case '!thursday':
			if(thursdayActive) {
				const timeZone = new Date().toLocaleString("en-US", { timeZone: "America/Chicago" });
				const day = new Date(timeZone).getDay();
				if(day === 4)
					client.say(channel, `YoungThugJumpingOutOfASkyscraperOnAQuadbikeIntoGunnasHelicopterThenGunnaBlowsUpTheSkyscraper YOUNGTHUG THURSDAY YoungThugJumpingOutOfASkyscraperOnAQuadbikeIntoGunnasHelicopterThenGunnaBlowsUpTheSkyscraper `);
				else
					client.say(channel, `It's not thursday`);
					
				thursdayActive = false;
				setTimeout(() => {
					thursdayActive = true;
				}, 2500);
			}
			break;

		case '!woo':
			if(wooActive) {
				client.say(channel, `emiWOO`);

				wooActive = false;
				setTimeout(() => {
					wooActive = true;
				}, 2500);
			}
			break;

		case '!title':
			if(myMessage[1] != undefined)
				return
			else {
				if(titleActive) {
					var title = fs.readFileSync(titleFile);
					client.say(channel, `${title}`);

					titleActive = false;
					setTimeout(() => {
						titleActive = true;
					}, 2500);
				}
			}
			break;

		case '!doesemiruspeakchineseorgerman':
			if(chineseGermanActive) {
				client.say(channel, `No`);

				chineseGermanActive = false;
				setTimeout(() => {
					chineseGermanActive = true;
				}, 2500);
			}
			break;

		case '!brother':
			if(brotherActive) {
				client.say(channel, `https://www.twitch.tv/13rother`);

				brotherActive = false;
				setTimeout(() => {
					brotherActive = true;
				}, 2500);
			}
			break;

		case '!rules':
			if(rulesActive) {
				client.say(channel, `Emi's Rules: 1. Racism/sexism/homophobia/transphobia/etc. will not be tolerated.  2. If your spam sucks u will be timed out.  3. Dont be dicks to my mods and be nice to other chatters/stream guests.`);

				rulesActive = false;
				setTimeout(() => {
					rulesActive = true;
				}, 2500);
			}
			break;

		case '!smite':
			if(smiteActive) {
				client.say(channel, `emiru play smite emiruPls`);

				smiteActive = false;
				setTimeout(() => {
					smiteActive = true;
				}, 2500);
			}
			break;

		case '!8ball':
			if(magicBallActive) {
				if(!myMessage[1])
					client.say(channel, `Gotta ask a question first @${tags.username}`);
				else {
					const magic = responses[Math.floor(Math.random() * responses.length)];
					client.say(channel, `Magic-8ball says ... ${magic}`);
				}

				magicBallActive = false;
				setTimeout(() => {
					magicBallActive = true;
				}, 2500);
			}
			break;

		case '!sad':
			if(sadActive) {
				client.say(channel, `im not sad. thats just my face lol -emiru`);

				sadActive = false;
				setTimeout(() => {
					sadActive = true;
				}, 2500);
			}
			break;

		case '!weeb':
			if(weebActive) {
				client.say(channel, `/color #FF69B4`); //hot pink - emirubot's color
				setTimeout(() => {
					client.say(channel, `/me ░░░░█▐▄▒▒▒▌▌▒▒▌░▌▒▐▐▐▒▒▐▒▒▌▒▀▄▀▄░ ░░░█▐▒▒▀▀▌░▀▀▀░░▀▀▀░░▀▀▄▌▌▐▒▒▒▌▐░ ░░▐▒▒▀▀▄▐░▀▀▄▄░░░░░░░░░░░▐▒▌▒▒▐░▌ ░░▐▒▌▒▒▒▌░▄▄▄▄█▄░░░░░░░▄▄▄▐▐▄▄▀░░ ░░▌▐▒▒▒▐░░░░░░░░░░░░░▀█▄░░░░▌▌░░░ ▄▀▒▒▌▒▒▐░░░░░░░▄░░▄░░░░░▀▀░░▌▌░░░ ▄▄▀▒▐▒▒▐░░░░░░░▐▀▀▀▄▄▀░░░░░░▌▌░░░ ░░░░█▌▒▒▌░░░░░▐▒▒▒▒▒▌░░░░░░▐▐▒▀▀▄ ░░▄▀▒▒▒▒▐░░░░░▐▒▒▒▒▐░░░░░▄█▄▒▐▒▒▒ ▄▀▒▒▒▒▒▄██▀▄▄░░▀▄▄▀░░▄▄▀█▄░█▀▒▒▒▒`);
					client.say(channel, `/color #39FF14`); //neon green - my color
				}, 500);

				weebActive = false;
				setTimeout(() => {
					weebActive = true;
				}, 2500);
			}
			break;

		case '!discord':
			if(discordActive) {
				client.say(channel, `discord.gg/emiru emiruLOVE TO JOIN, GO TO THE VERIFICATION ROOM. To get sub status in Discord, simply sync your Twitch account to your Discord in settings!`);
				
				discordActive = false;
				setTimeout(() => {
					discordActive = true;
				}, 2500);
			}
			break;

		case '!elo':
			if(eloActive) {
				var rawData = fs.readFileSync('editableCommands.json');
				var data = JSON.parse(rawData);
				client.say(channel, `@${tags.username}, ${data.elo}`);

				eloActive = false;
				setTimeout(() => {
					eloActive = true;
				}, 2500);
			}
			break;

		case '!rank':
			if(rankActive) {
				var rawData = fs.readFileSync('editableCommands.json');
				var data = JSON.parse(rawData);
				client.say(channel, `@${tags.username}, ${data.rank}`);

				rankActive = false;
				setTimeout(() => {
					rankActive = true;
				}, 2500);
			}
			break;

		case '!instagram':
			if(instagramActive) {
				client.say(channel, `https://www.instagram.com/emiru.jpg/`);

				instagramActive = false;
				setTimeout(() => {
					instagramActive = true;
				}, 2500);
			}
			break;

		case '!merch':
			if(merchActive) {
				client.say(channel, `emiru.tv/merch // https://www.designbyhumans.com/shop/Emiru/`);

				merchActive = false;
				setTimeout(() => {
					merchActive = true;
				}, 2500);
			}
			break;

		case '!opgg':
			if(opggActive) {
				if(myMessage[1] === undefined)
					client.say(channel, `@${tags.username}, https://na.op.gg/multisearch/na?summoners=emiru%2Cdumbbun%2Ckirby%2Cbunwithagun%2Cegg`);
				else {
					var region = myMessage[1];
					var args = [];
					for(var i = 2; i < myMessage.length; i++) {
						args.push(myMessage[i]);
					}
					var newString = args.join('%20');
					client.say(channel, `@${tags.username}, https://na.op.gg/summoners/${region}/${newString}`);
				}

				opggActive = false;
				setTimeout(() => {
					opggActive = true;
				}, 2500);
			}
			break;

		case '!playlist':
			if(playlistActive) {
				client.say(channel, `INTRO MUSIC PLAYLIST: https://open.spotify.com/playlist/6MrVz9LUs9BAXKEIHzYVtR?si=0ee4e3a90db4462c 🖤 GENERAL PLAYLIST: https://open.spotify.com/playlist/3jpilqxMGQZIkUwIMaYmX4?si=6bbfbcbe972648c1 🖤 CHAT MADE PLAYLIST: https://open.spotify.com/playlist/7ijkZ4OgqiVMHc9LELuvZu?si=1266848860a341dd&nd=1`);

				playlistActive = false;
				setTimeout(() => {
					playlistActive = true;
				}, 2500);
			}
			break;

		case '!sub':
			if(subActive) {
				client.say(channel, `https://www.twitch.tv/products/lol_emiru/ticket/`);

				subActive = false;
				setTimeout(() => {
					subActive = true;
				}, 2500);
			}
			break;

		case '!twitter':
			if(twitterActive) {
				client.say(channel, `https://twitter.com/emiru`);

				twitterActive = false;
				setTimeout(() => {
					twitterActive = true;
				}, 2500);
			}
			break;

		case '!wallpaper':
		case '!wallpapers':
			if(wallpapersActive) {
				client.say(channel, `https://imgur.com/a/6hGXp (last updated 6/16/2018)`);

				wallpapersActive = false;
				setTimeout(() => {
					wallpapersActive = true;
				}, 2500);
			}
			break;

		case '!emiruez':
			if(emiruezActive) {
				client.say(channel, `emiruEZ Clap`);

				emiruezActive = false;
				setTimeout(() => {
					emiruezActive = true;
				}, 2500);
			}
			break;

		case '!hype':
			if(hypeActive) {
				client.say(channel, `HYPE emiruHYPERBUN HYPE emiruHYPERBUN HYPE emiruHYPERBUN HYPE emiruHYPERBUN HYPE emiruHYPERBUN HYPE emiruHYPERBUN HYPE emiruHYPERBUN HYPE emiruHYPERBUN HYPE emiruHYPERBUN HYPE emiruHYPERBUN HYPE emiruHYPERBUN HYPE emiruHYPERBUN HYPE emiruHYPERBUN HYPE emiruHYPERBUN HYPE emiruHYPERBUN HYPE emiruHYPERBUN HYPE emiruHYPERBUN HYPE emiruHYPERBUN`);

				hypeActive = false;
				setTimeout(() => {
					hypeActive = true;
				}, 2500);
			}
			break;

		case '!cosplay':
			if(cosplayActive) {
				var rawData = fs.readFileSync('data.json');
				var data = JSON.parse(rawData);
				client.say(channel, `@${tags.username} ${data.cosplay}`);

				cosplayActive = false;
				setTimeout(() => {
					cosplayActive = true;
				}, 2500);
			}
			break;

		case '!uwu':
			if(uwuActive) {
				client.say(channel, `⎝⎠ ╲╱╲╱ ⎝⎠`);

				uwuActive = false;
				setTimeout(() => {
					uwuActive = true;
				}, 2500);
			}
			break;

		case '!dmca':
			if(dmcaActive) {
				client.say(channel, `Emi has obs set up so that music does not show up in the vod or clips. tutorial: https://www.youtube.com/watch?v=ZwnD3tjhPO4 this does not protect against live strikes so use at ur own risk`);

				dmcaActive = false;
				setTimeout(() => {
					dmcaActive = true;
				}, 2500);
			}
			break;

		case '!faq':
			if(faqActive) {
				client.say(channel, `https://emiru.tv/faq`);

				faqActive = false;
				setTimeout(() => {
					faqActive = true;
				}, 2500);
			}
			break;

		case '!height':
			if(heightActive) {
				client.say(channel, `5'3 or 160 cm`);

				heightActive = false;
				setTimeout(() => {
					heightActive = true;
				}, 2500);
			}
			break;

		case '!tiktok':
			if(tiktokActive) {
				client.say(channel, `https://www.tiktok.com/@emiru`);

				tiktokActive = false;
				setTimeout(() => {
					tiktokActive = true;
				}, 2500);
			}
			break;

		case '!vanish':
			if(vanishActive) {
				client.say(channel, `/timeout ${tags.username} 1`);
				//timeoutUser('timeout', tags.username, 1, 'vanished');

				vanishActive = false;
				setTimeout(() => {
					vanishActive = true;
				}, 2500);
			}
			break;

		case '!uptime':
			if(uptimeActive) {
				var xhr = new XMLHttpRequest();
				xhr.open('GET', 'https://api.twitch.tv/helix/streams?user_login=emiru', true);
				xhr.onreadystatechange = () => {
					if(xhr.readyState === 4 && xhr.status === 200) {
						var myArr = JSON.parse(xhr.responseText);
						if(Object.keys(myArr.data).length === 0) {
							var title = fs.readFileSync(titleFile);
							var ans = downtimeFunction();
							ans.then(function(result) { //days, hours, minutes, seconds
								if(result[0] == 0 && result[1] == 0 && result[2] == 0) //0,0,0,4
									client.say(channel, `@${tags.username}, Stream is currently offline - last stream was ${result[3]} second(s) ago; title: ${title}`);
								else if(result[0] == 0 && result[1] == 0) //0,0,3,4
									client.say(channel, `@${tags.username}, Stream is currently offline - last stream was ${result[2]} minutes and ${result[3]} second(s) ago; title: ${title}`);
								else if(result[0] == 0) //0,2,3,4
									client.say(channel, `@${tags.username}, Stream is currently offline - last stream was ${result[1]} hour(s) and ${result[2]} minute(s) ago; title: ${title}`);
								else //1,2,3,4
									client.say(channel, `@${tags.username}, Stream is currently offline - last stream was ${result[0]} day(s) and ${result[1]} hour(s) ago; title: ${title}`);
							});
						}
						else {
							var ans = uptimeFunction(myArr);
							var viewerCount = Number(myArr.data[0].viewer_count).toLocaleString("en-US");
							client.say(channel, `@${tags.username}, Stream has been live for: ${ans} and is currently streaming for ${viewerCount} viewers`);
						}
					}
				}
				xhr.setRequestHeader("Authorization", process.env.UPTIME_TWITCH_AUTH);
				xhr.setRequestHeader("Client-Id", process.env.TWITCH_CLIENT);
				xhr.send(null);

				uptimeActive = false;
				setTimeout(() => {
					uptimeActive = true;
				}, 5000);
			}
			break;

		case '!followage':
			if(followageActive) { //format is forced as: !followage {user to search for} {channel to search user on}
				var xhr = new XMLHttpRequest();
				if(myMessage[2] === undefined) { //if other channel to search is undefined
					//use emi's channel
					if(myMessage[1] === undefined) { //if other user to search is undefined then search for the user that issued the command
						xhr.open('GET', `https://decapi.me/twitch/followage/emiru/${tags.username}?precision=4`, true);
					}
					else { //else search for the user requested
						xhr.open('GET', `https://decapi.me/twitch/followage/emiru/${myMessage[1]}?precision=4`, true);
					}
				}
				else { //if channel to search IS defined
					xhr.open('GET', `https://decapi.me/twitch/followage/${myMessage[2]}/${myMessage[1]}?precision=4`, true);
				}


				xhr.onreadystatechange = () => {
					if(xhr.readyState === 4 && xhr.status === 200) {
						if(xhr.responseText.includes('User not found')) {
							var name = xhr.responseText.split(" ").pop();
							client.say(channel, `@${tags.username}, The user ${name} was not found` );
						}
						else if(myMessage[2] === undefined) { //meaning other channel was not defined
							if(myMessage[1] === undefined) {
								if(xhr.responseText.includes('does not follow')) {
									client.say(channel, `@${tags.username} does not follow emiru`);
								}
								else {
									client.say(channel, `@${tags.username}, you have been following emiru for ${xhr.responseText}`);
								}
							}
							else {
								if(xhr.responseText.includes('does not follow')) {
									client.say(channel, `@${tags.username}, ${myMessage[1]} does not follow emiru`);
								}
								else {
									client.say(channel, `@${tags.username}, ${myMessage[1]} has been following emiru for ${xhr.responseText}`);
								}
							}
						}
						else {
                            if(xhr.responseText.includes('does not follow')) {
                                client.say(channel, `@${tags.username}, ${myMessage[1]} does not follow ${myMessage[2]}`);
                            }
                            else {
                                if(tags.username.toLowerCase() === myMessage[1].toLowerCase())
                                    client.say(channel, `@${tags.username}, you have been following ${myMessage[2]} for ${xhr.responseText}`);
                                else
                                    client.say(channel, `@${tags.username}, ${myMessage[1]} has been following ${myMessage[2]} for ${xhr.responseText}`);
                            }
						}
					}
				}
				xhr.send(null);

				followageActive = false;
				setTimeout(() => {
					followageActive = true;
				}, 7500);
			}
			break;
			
		case '!accountage':
			if(accountAgeActive) {
				var xhr = new XMLHttpRequest();
				if(myMessage[1] === undefined) { //if other user to search is undefined then search for the user that issued the command
					xhr.open('GET', `https://decapi.me/twitch/accountage/${tags.username}?precision=4`, true);
				}
				else { //else search for the user requested
					xhr.open('GET', `https://decapi.me/twitch/accountage/${myMessage[1]}?precision=4`, true);
				}

				xhr.onreadystatechange = () => {
					if(xhr.readyState === 4 && xhr.status === 200) {
						if(xhr.responseText.includes('User not found')) {
							var name = xhr.responseText.split(" ").pop();
							client.say(channel, `@${tags.username}, The user ${name} was not found` );
						}
						else if(xhr.responseText.includes('A username has to be specified.')) {
							client.say(channel, `Something went wrong`);
						}
						else if(myMessage[1] === undefined) {						
							client.say(channel, `@${tags.username} Your account was created ${xhr.responseText} ago`);
						}
						else {
							client.say(channel, `@${tags.username}, ${myMessage[1]}'s account was created ${xhr.responseText} ago`);
						}
					}
				}
				xhr.send(null);
				
				accountAgeActive = false;
				setTimeout(() => {
					accountAgeActive = true;
				}, 7500);
			}
			break;
			
		case '!giveaway':
			if(giveawayActive) {
				client.say(channel, `${tags.username}, You have been entered into the giveaway emiruSMUG`);

				giveawayActive = false;
				setTimeout(() => {
					giveawayActive = true;
				}, 2000);
			}
			break;

		case '!song':
			if(songActive) {
				client.say(channel, `@${tags.username}, The name of the song + the artist can be found above chat or at the top of the stream`);

				songActive = false;
				setTimeout(() => {
					songActive = true;
				}, 2000);
			}
			if(channel == '#ribcrush') {
				var rawData = fs.readFileSync('spotify.json');
				var data = JSON.parse(rawData);
				var access = data["SPOTIFY_ACCESS_TOKEN"];
				
				var isLive = new XMLHttpRequest();
				isLive.open('GET', 'https://api.twitch.tv/helix/streams?user_login=emiru', true);
				isLive.onreadystatechange = () => {
					if(isLive.readyState === 4 && isLive.status === 200) {
						var myArr = JSON.parse(isLive.responseText);
						if(Object.keys(myArr.data).length !== 0)
							client.say(channel, `@${tags.username}, Stream is currently offline`);
						else {
							var xhr = new XMLHttpRequest();
							xhr.open('GET', `https://api.spotify.com/v1/me/player/currently-playing?market=ES`, true);
							xhr.onreadystatechange = () => {
								if(xhr.readyState === 4 && xhr.status === 200) {
									var myArr = JSON.parse(xhr.responseText);
									var songName = myArr['item']['name'];
									var artist = myArr['item']['artists'][0]['name'];
									var link = myArr['item']['external_urls']['spotify'];
									if(myArr['item']['artists'].length > 1) {
										var artistList = []
										for(var i = 0; i < myArr['item']['artists'].length; i++) {
											artistList.push(myArr['item']['artists'][i]['name']);
										}
										artist = artistList.join(', ');
									}
									client.say(channel, `@${tags.username}, Song Info -> ${songName} - ${artist} - ${link}`);
								}
								else if(xhr.readyState === 4 && xhr.status === 204) {
									client.say(channel, `@${tags.username}, No music is currently playing`);
								}
								else if(xhr.readyState === 4 && xhr.status === 401) {
									refreshSpotifyToken(channel, tags);
								}
							}
							xhr.setRequestHeader("Authorization", access);
							xhr.setRequestHeader("Accept", "application/json");
							xhr.setRequestHeader("Content-Type", "application/json");
							xhr.send(null);
						}
					}
				}
				isLive.setRequestHeader("Authorization", process.env.UPTIME_TWITCH_AUTH);
				isLive.setRequestHeader("Client-Id", process.env.TWITCH_CLIENT);
				isLive.send(null);
			}
			break;
		
		case '!watchtime':	
		case '!time':
			if(timeActive) {
				if(channel === "#emiru" || channel === "#ribcrush") {
					const db = new sqlite3.Database('./newUsers.db');
					if(myMessage[1] === undefined) {
						var ans = getUser(tags.username);
						ans.then(function(result) {
							var sql = `SELECT time FROM users WHERE user_id = ${result}`;
							db.get(sql, (err, row) => {
								if(row === undefined) {
									client.say(channel, `@${tags.username} You haven't spent enough time in chat`);
								}
								else {
									var totalTime = Math.round((row.Time / 60) * 100) / 100;
									var hours = Math.floor(totalTime);
									var minutes = (totalTime - hours) * 60;
									client.say(channel, `@${tags.username} You have spent ${hours} hours and ${minutes} minutes in chat`);
								}
							});
							db.close()
						});
					}
					else {
						if(myMessage[1].startsWith('@'))
							myMessage[1] = myMessage[1].slice(1)
						var ans = getUser(myMessage[1]);
						ans.then(function(result) {
							if(result == null)
								client.say(channel, `@${tags.username}, the search parameters are invalid.  Please try again.`);
							else {
								var sql = `SELECT time FROM users WHERE user_id = ${result}`;
								db.get(sql, (err, row) => {
									if(row === undefined) {
										client.say(channel, `@${tags.username}, ${myMessage[1]} hasn't spent enough time in chat.`);
									}
									else {
										var totalTime = Math.round((row.Time / 60) * 100) / 100;
										var hours = Math.floor(totalTime);
										var minutes = (totalTime - hours) * 60;
										client.say(channel, `@${tags.username} ${myMessage[1]} has spent ${hours} hours and ${minutes} minutes in chat`);
									}
								});
								db.close()
							}
						});
					}
				}
				else {
					const db = new sqlite3.Database('./users.db');
					if(myMessage[1] === undefined) { //search for user that called command
						var sql = `SELECT time FROM users WHERE name = '${tags.username.toLowerCase()}'`;
						db.get(sql, (err, row) => {
							if(row === undefined) {
								if(channel == '#ribcrush')
									client.say(channel, `extra @${tags.username} You haven't spent enough time in chat`);
								else
									client.say(channel, `@${tags.username} You haven't spent enough time in chat`);
							}
							else {
								var totalTime = Math.round((row.Time / 60) * 100) / 100;
								var hours = Math.floor(totalTime);
								var minutes = (totalTime - hours) * 60;
								if(channel == '#ribcrush')
									client.say(channel, `extra @${tags.username} You have spent ${hours} hours and ${minutes} minutes in chat`);
								else
									client.say(channel, `@${tags.username} You have spent ${hours} hours and ${minutes} minutes in chat`);
							}
						});
						db.close();
					}
					else { //search for other user
						var sql = `SELECT time FROM users WHERE name = '${myMessage[1].toLowerCase()}'`;
						db.get(sql, (err, row) => {
							if(row === undefined) {
								if(channel == '#ribcrush')
									client.say(channel, `extra @${tags.username}, ${myMessage[1]} hasn't spent enough time in chat.`);
								else
									client.say(channel, `@${tags.username}, ${myMessage[1]} hasn't spent enough time in chat.`);
							}
							else {
								var totalTime = Math.round((row.Time / 60) * 100) / 100;
								var hours = Math.floor(totalTime);
								var minutes = (totalTime - hours) * 60;
								if(channel == '#ribcrush')
									client.say(channel, `extra @${tags.username} ${myMessage[1]} has spent ${hours} hours and ${minutes} minutes in chat`);
								else
									client.say(channel, `@${tags.username} ${myMessage[1]} has spent ${hours} hours and ${minutes} minutes in chat`);
							}
						});
						db.close();
					}
				}

				timeActive = false;
				setTimeout(() => {
					timeActive = true;
				}, 5000);
			}
			break;
			
		case '!toptime':
			if(toptimeActive) {
				var rawData = fs.readFileSync('new_top_users_list.txt');
				client.say(channel, `${rawData}`);
				
				toptimeActive = false;
				setTimeout(() => {
					toptimeActive = true;
				}, 2500);
			}
			break;
							
		case '!pb':
			if(pbActive) {
				var rawData = fs.readFileSync('editableCommands.json');
				var data = JSON.parse(rawData);
				client.say(channel, `@${tags.username}, ${data.pb}`);
				
				pbActive = false;
				setTimeout(() => {
					pbActive = true;
				}, 2500);
			}
			break;
			
		case '!buns':
			if(bunsActive) {
				var rawData = fs.readFileSync('editableCommands.json');
				var data = JSON.parse(rawData);
				client.say(channel, `@${tags.username}, ${data.buns}`);
				
				bunsActive = false;
				setTimeout(() => {
					bunsActive = true;
				}, 2500);
			}
			break;
			
		case '!youtube':
			if(youtubeActive) {
				var youtube = youtubeGatherInfo("normal", channel);
				youtube.then(function(result) {
					client.say(channel, `Latest video: ${result} - YouTube Channel: https://youtube.com/c/Emiru1`);
				});

				youtubeActive = false;
				setTimeout(() => {
					youtubeActive = true;
				}, 5000);
			}
			break;
			
		case '!shorts':
			if(shortsActive) {
				var shorts = youtubeGatherInfo("short", channel);
				shorts.then(function(result) {
					client.say(channel, `Latest short: ${result} - YouTube Channel: https://youtube.com/c/Emiru1/shorts`);
				});
				
				shortsActive = false;
				setTimeout(() => {
					shortsActive = true;
				}, 2500);
			}
			break;
			
		case '!podcast':
		case '!pod':
		case '!noodleshop':
			if(podcastActive) {
				var podcast = youtubeGatherInfo('podcast', channel);
				podcast.then(function(result) {
					client.say(channel, `Latest Podcast: ${result} - Youtube Channel: https://www.youtube.com/channel/UCigQHgvqkxlF-e2OCji3Bzg - Tweet: https://twitter.com/NoodleShop/status/1569139677424414720`);
				});
				
				podcastActive = false;
				setTimeout(() => {
					podcastActive = true;
				}, 5000);
			}
			break;
		
		case '!prime':
			if(primeActive) {
				client.say(channel, `Did you know you can use Amazon Twitch Prime to subscribe to Emiru for free! WOW! PogChamp 👉 emiruEZ`);
				
				primeActive = false;
				setTimeout(() => {
					primeActive = true;
				}, 5000);
			}
			break;
			
		case '!ping':
			if(pingActive) {
				var time = process.uptime();
				String.prototype.toHHMMSS = function() {
					var days = Math.floor((this / (60 * 60 * 24))),
						hours = Math.floor((this / (60 * 60)) % 24),
						minutes = Math.floor((this / 60) % 60),
						seconds = Math.floor(this % 60);
					var time = [days, hours, minutes, seconds];
					return time;
				}
				var uptime = (time + "").toHHMMSS();
				const temp = getTemp();
				temp.then(function(result) {
					var cpuTemp = `${result.match(/([\d.]+)/)[1]}°C`;
					client.say(channel, `PONG!!!, bot has been up for: ${uptime[0]} day(s), ${uptime[1]} hour(s), ${uptime[2]} minute(s), ${uptime[3]} second(s); CPU Temp: ${cpuTemp}`);
				});
				
				
				pingActive = false;
				setTimeout(() => {
					pingActive = true;
				}, 5000);
			}
			break;
			
		case '!po':
		case '!pobox':
			if(poActive) {
				client.say(channel, `Emi's PO BOX: Emiru, 500 E Whitestone Blvd #10, Cedar Park, TX 78613`);
				
				poActive = false;
				setTimeout(() => {
					poActive = true;
				}, 2500);
			}
			break;
			
		case '!reddit':
			if(redditActive) {
				client.say(channel, `Emiru subreddit: https://www.reddit.com/r/emiru/`);
				
				redditActive = false;
				setTimeout(() => {
					redditActive = true;
				}, 2500);
			}
			break;
			
		case '!starforge':
			if(starforgeActive) {
				client.say(channel, `The best PCs in the universe. Get yours today: https://starforgepc.com/3OWT5El ⭐`);
				
				starforgeActive = false;
				setTimeout(() => {
					starforgeActive = true;
				}, 2500);
			}
			break;
			
		case '!essence':
			if(essenceActive) {
				client.say(channel, `Fun Makeup for Fun People www.essencemakeup.com`);
				
				essenceActive = false;
				setTimeout(() => {
					essenceActive = true;
				}, 2500);
			}
			break;

		case '!squad':
		case '!team':
			if(teamActive) {
				var rawData = fs.readFileSync('editableCommands.json');
				var data = JSON.parse(rawData);
				client.say(channel, `@${tags.username}, ${data.team}`);
				
				teamActive = false;
				setTimeout(() => {
					teamActive = true;
				}, 2500);
			}
			break;
			
		case '!schedule': //if the check for if the user exists becomes too much, change it so that myMessage[1] is forced to start with an @ (no slicing needed)
			if(scheduleActive) {
				if(myMessage[1]) {
					if(myMessage[1].startsWith('@'))
						myMessage[1] = myMessage[1].slice(1);
					var checkUser = getUser(myMessage[1]);
					checkUser.then(function(result){
						if(result == null)
							client.say(channel, `@${tags.username}, ⭐ SCHEDULE: https://tinyurl.com/emischedule ⭐`);
						else
							client.say(channel, `@${myMessage[1]}, ⭐ SCHEDULE: https://tinyurl.com/emischedule ⭐`);
					});
				}					
				else
					client.say(channel, `@${tags.username}, ⭐ SCHEDULE: https://tinyurl.com/emischedule ⭐`);
				
				scheduleActive = false;
				setTimeout(() => {
					scheduleActive = true;
				}, 2500);
			}
			break;
			
		case '!timeoff':
			if(timeoffActive) {
				client.say(channel, `/timeout ${tags.username} 86400 decided to take some much needed time off`);
				client.say(channel, `${tags.username} has decided that they need to take some much needed time away from twitch`);
				//timeoutUser('timeout', tags.username, 86400, 'decided to take some much needed time off');
				
				timeoffActive = false;
				setTimeout(() => {
					timeoffActive = true;
				}, 10000);
			}
			break;
			
		case '!help':
			if(helpActive) {
				if(myMessage[1] === undefined)
					client.say(channel, `@${tags.username}, Help is available for the following commands: roulette, cookie, hate, love, 8ball, uptime, followage, accountage, watchtime/time, toptime`);
				else if(!helpCommands.includes(myMessage[1].toLowerCase()))
					client.say(channel, `That command isn't one of the available commands`);
				else {
					var command = myMessage[1].toLowerCase();
					if(command.charAt(0) == '!')
						command = command.slice(1);
					var response = getHelp(command);
					if(response.length == 1)
						client.say(channel, `@${tags.username}, ${response[0]}`);
					else
						client.say(channel, `@${tags.username}, Syntax: ${response[0]} - Info: ${response[1]} - ${response[2]} CD`);
				}
				
				helpActive = false;
				setTimeout(() => {
					helpActive = true;
				}, 2500);
			}
			break;
			
		case '!query':
			if(queryActive) {
				var args = [];
				for(var i = 1; i < myMessage.length; i++) {
					args.push(myMessage[i]);
				}
				var input = args.join('+');
                var rawData = fs.readFileSync('data.json');
				var data = JSON.parse(rawData);
				var url = `https://api.wolframalpha.com/v1/result?i=${input}%3F&appid=${data.wolframAppID}`;
				var xhr = new XMLHttpRequest();
				xhr.open('GET', url);
				xhr.onreadystatechange = () => {
					if(xhr.readyState === 4)
						client.say(channel, `@${tags.username}, ${xhr.responseText}`);
				}
				xhr.send(null);
				
				queryActive = false;
				setTimeout(() => {
					queryActive = true;
				}, 5000);
			}
			break;

		case '!commands':
			if(commandsActive) {
				client.say(channel, `Command List: roulette, cookie, hate, love, cannon, wednesday, woo, title, doesemiruspeakchineseorgerman, brother, rules, smite, 8ball, sad, weeb, discord, elo, rank, instagram, merch, opgg, playlist, sub, twitter, wallpapers, emiruez, hype, cosplay, uwu, dmca, faq, height, tiktok, vanish, uptime, followage, accountage, time, toptime, pb, buns, youtube, shorts, podcast/pod/noodleshop, prime, po/pobox, reddit, starforge, essence, team/squad, schedule, help, commands`);
				
				if(customs.size > 0) {
					var commands = Array.from(customs).join(', ');
					client.say(channel, `Additional Commands: ${commands}`);
				}
				
				commandsActive = false;
				setTimeout(() => {
					commandsActive = true;
				}, 2500);
			}
			break;
			
			
			
			
			
			
		/*REDEEMED COMMANDS START HERE*/
		case '!emirue':
			if(emiru_e_Active) {
				client.say(channel, `emiru1 emiru2`);
				client.say(channel, `emiru3 emiru4 emiruE don't talk to me or my daughter ever again`);
				
				emiru_e_Active = false;
				setTimeout(() => {
					emiru_e_Active = true;
				}, 5000);
			}
			break;
		
		case '!kattah':
			if(kattahActive) {
				client.say(channel, `PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad PoroSad`);
				
				kattahActive = false;
				setTimeout(() => {
					kattahActive = true;
				}, 5000);
			}
			break;
		/*REDEEMED COMMANDS  END  HERE*/
	}
}

async function youtubeGatherInfo(videoType, channel) {
	var normalIncrement = 0;
	var shortIncrement = 0;
	var podcastIncrement = 0;

	var podcastURL = `https://decapi.me/youtube/latest_video?id=UCigQHgvqkxlF-e2OCji3Bzg&format={id}%^{title} - {url}`;
	var url = `https://decapi.me/youtube/latest_video?id=UCZprw7Bxzfh2IysXNnl1S3g&format={id}%^{title} - {url}`;
	if(videoType == "normal") {
		var result = await getYoutubeStuff('GET', `${url}&skip=${normalIncrement}`);
		var ans = await checkForShorts(result[0]);
		while(ans != 303) {
			result = await getYoutubeStuff('GET', `${url}&skip=${normalIncrement += 1}`);
			ans = await checkForShorts(result[0]);
		}
	}
	else if(videoType == "short") {
		var result = await getYoutubeStuff('GET', `${url}&skip=${shortIncrement}`);
		var ans = await checkForShorts(result[0]);
		while(ans != 200) {
			result = await getYoutubeStuff('GET', `${url}&skip=${shortIncrement += 1}`);
			ans = await checkForShorts(result[0]);
		}
	}
	else if(videoType == "podcast") {
		var result = await(getYoutubeStuff('GET', `${podcastURL}&skip=${podcastIncrement}`));
		var ans = await checkForShorts(result[0]);
		while(ans != 303) {
			result = await(getYoutubeStuff('GET', `${podcastURL}&skip=${podcastIncrement += 1}`));
			ans = await checkForShorts(result[0]);
		}
	}
	return result[1];
}

function getYoutubeStuff(method, url) {
	return new Promise(function (resolve, reject) {
		var xhr = new XMLHttpRequest();
		var now = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });
		xhr.open(method, url);
		xhr.onload = function() {
			if(xhr.readyState === 4 && xhr.status === 200) {
				var videoInfo = []
				var videoID = xhr.responseText.split('%^')[0];
				var videoTitle_URL = xhr.responseText.split('%^')[1];
				videoInfo.push(videoID);
				videoInfo.push(videoTitle_URL);

				resolve(videoInfo);
			}
			else {
				reject({
					timestamp: now,
					status: this.status,
					statusText: xhr.statusText,
					method: method,
					url: url,
					xhr: xhr,
					text: 'rejection occurred in getYoutubeStuff onload'
				});
			}
		};
		xhr.onerror = function() {
			reject({
				timestamp: now,
				status: this.status,
				statusText: xhr.statusText,
				method: method,
				url: url,
				xhr: xhr,
				text: 'rejection occurred in getYoutubeStuff onerror'
			});
		};
		xhr.send();
	});
}
const checkForShorts = ((id) => {
	var url = `https://www.youtube.com/shorts/${id}`;
	return new Promise((resolve, reject) => {
	  const req = httpRequest.request(url, (res) => {
		  let body = '';
		  res.on('data', (chunk) => (body += chunk.toString()));
		  res.on('error', reject);
		  res.on('end', () => {
			if (res.statusCode >= 200) {
			  resolve(res.statusCode);
			}
			else {
			  reject('Request failed. status: ' + res.statusCode + ', body: ' + body);
			}
		  });
		});
	  req.on('error', reject);
	  req.end();
	});
  }
);


async function timeoutUser(method, username, duration, reason) {
	const result = JSON.parse(await makeRequest('GET', `https://api.twitch.tv/helix/users?login=${username}`));
	var userID = result['data'][0]['id'];
	
	if(method === 'timeout')
		var data = {"data": {"user_id":userID, "duration": duration, "reason": reason}};
	else if(method === 'ban')
		var data = {"data": {"user_id":userID, "reason": reason}};
		
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'https://api.twitch.tv/helix/moderation/bans?broadcaster_id=91067577&moderator_id=98397195', true);
	xhr.onload = function() {
		console.log(`Loaded: ${xhr.status} ${xhr.response}`);
	}
	xhr.onerror = function() {
		console.log(`Network error`);
	}
	xhr.onprogress = function(event) {
		console.log(`Received ${event.loaded} of ${event.total}`);
	}
	xhr.setRequestHeader("Authorization", config.twitch_oauth_timeout_token);
	xhr.setRequestHeader("Client-Id", process.env.TWITCH_CLIENT);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send(JSON.stringify(data));
}

function uptimeFunction(arr) {
	var now = Date.now();
	var startedAt = new Date(arr.data[0].started_at).getTime();
	var diff = now - startedAt;
	var hours = Math.floor((diff / (1000 * 60 * 60)) % 24),
		minutes = Math.floor((diff / (1000 * 60)) % 60),
		seconds = Math.floor((diff / 1000) % 60);

	hours = (hours < 10) ? "0" + hours : hours;
	minutes = (minutes < 10) ? "0" + minutes : minutes;
	seconds = (seconds < 10) ? "0" + seconds : seconds;
	
	ciqlJSON
		.open("data.json")
		.set("lastStartedAt", new Date(arr.data[0].started_at))
		.save();

	return (hours + ":" + minutes + ":" + seconds);
}

async function downtimeFunction() {
	var rawData = fs.readFileSync('data.json');
	var lastStartedAt = new Date(JSON.parse(rawData).lastStartedAt);
	
	var result = JSON.parse(await makeRequest('GET', 'https://api.twitch.tv/helix/videos/?user_id=91067577&first=1'));
	var duration = result['data'][0]['duration'];
	var mult = 1000;
	const vodDuration = duration.split(/\D/).filter(Boolean).map(Number).reverse().reduce((acc, cur) => {
		acc += cur * mult;
		mult *= 60;
		return acc;
	}, 0);
	var endTime = lastStartedAt.getTime() + vodDuration;
	var now = Date.now();
	var diff = now - endTime;
	
	var days = Math.floor((diff / (1000 * 60 * 60 * 24))),
		hours = Math.floor((diff / (1000 * 60 * 60)) % 24),
		minutes = Math.floor((diff / (1000 * 60)) % 60),
		seconds = Math.floor((diff / 1000) % 60);
		
	var returnValues = [];
	returnValues.push(days);
	returnValues.push(hours);
	returnValues.push(minutes);
	returnValues.push(seconds);
	
	return returnValues;
}

function makeRequest(method, url) {
	return new Promise(function (resolve, reject) {
		var xhr = new XMLHttpRequest();
		var now = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });
		xhr.open(method, url);
		xhr.onload = function() {
			if(xhr.readyState === 4 && xhr.status === 200) {
				resolve(xhr.responseText);
			}
			else {
				reject({
					timestamp: now,
					status: this.status,
					statusText: xhr.statusText,
					method: method,
					url: url,
					text: 'rejection occurred in makeRequest onload'
				});
			}
		};
		xhr.onerror = function() {
			reject({
				timestamp: now,
				status: this.status,
				statusText: xhr.statusText,
				method: method,
				url: url,
				text: 'rejection occurred in makeRequest onerror'
			});
		};
		xhr.setRequestHeader("Authorization", process.env.UPTIME_TWITCH_AUTH);
		xhr.setRequestHeader("Client-Id", process.env.TWITCH_CLIENT);
		xhr.send();
	});
}

async function getUser(username) {
	var userID;
	var url = `https://api.twitch.tv/helix/users?login=${username}`;
	await makeRequest('GET', url)
	.then(function(data) {
		var result = JSON.parse(data);
		if(result['data'].length == 0)
			userID = null;
		else
			userID = result['data'][0]['id'];
	})
	.catch(function(err) {
		console.log(`ERROR when performing "GET USER":`);
		console.log(`\tStatus Text: ${err.statusText}`);
		console.log(`\tURL: ${url}`);
		console.log();
	})
	return userID;
}

async function getTemp() {
	try {
		const {stdout, stderr} = await exec("/usr/bin/vcgencmd measure_temp");
		return stdout;
	}
	catch (e) {
		console.log(e);
	}
}

function refreshSpotifyToken(channel, tags) {
	var rawData = fs.readFileSync('spotify.json');
	var data = JSON.parse(rawData);
	var refresh = data["SPOTIFY_REFRESH_TOKEN"];
	var authOptions = {
		url: 'https://accounts.spotify.com/api/token',
		headers: {'Authorization': /*base64 client_id:client_secret*/}, 
		form: {
			grant_type: 'refresh_token',
			refresh_token: refresh
		},
		json: true
	};
	
	request.post(authOptions, function(error, response, body) {
		if(!error && response.statusCode === 200) {
			var newAccess = "Bearer " + body.access_token;
			ciqlJSON
				.open("spotify.json")
				.set("SPOTIFY_ACCESS_TOKEN", newAccess)
				.save();
			redoSongName(channel, newAccess, tags);
		}
	});
}

function redoSongName(channel, accessToken, tags) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', `https://api.spotify.com/v1/me/player/currently-playing?market=ES`, true);
	xhr.onreadystatechange = () => {
		if(xhr.readyState === 4 && xhr.status === 200) {
			var myArr = JSON.parse(xhr.responseText);
			var songName = myArr['item']['name'];
			var artist = myArr['item']['artists'][0]['name'];
			var link = myArr['item']['external_urls']['spotify'];
			if(myArr['item']['artists'].length > 1) {
				var artistList = []
				for(var i = 0; i < myArr['item']['artists'].length; i++) {
					artistList.push(myArr['item']['artists'][i]['name']);
				}
				artist = artistList.join(', ');
			}
			client.say(channel, `@${tags.username}, Song Info -> ${songName} - ${artist} - ${link}`);
		}
		else if(xhr.readyState === 4 && xhr.status === 204) {
			client.say(channel, `@${tags.username}, No music is currently playing`);
		}
	}
	xhr.setRequestHeader("Authorization", accessToken);
	xhr.setRequestHeader("Accept", "application/json");
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send(null);
}

function changeCooldownBool(command, value, channel, tags) {
	const db = new sqlite3.Database('./newUsers.db');
	db.run("UPDATE customCommands SET isOnCooldown = $value WHERE command = $command", {$command: command, $value: value}, (err) => {
		if(err) {
			var now = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });
			client.say(channel, `@${tags.username}, something went wrong.  Please try again later on`);
			console.log(now, ': command -> ', command, '; value -> ', value);
			console.log(err);
		}
	});
	db.close();
}

function getHelp(command) {
	var response = [];
	switch(command) {
		case 'roulette':
			response.push(`!roulette - Params: 1) timeout: 1-604800 OR 'random' 2) 'chambers': 1-6 AND timeout: 0-604800 OR 'random'.  Examples: !roulette; !roulette 500; !roulette 6 604800`);
			response.push(`Play Russian Roulette where you have a 1/6 chance to be timed out for 10 seconds, the time specified (param 1) or a 'chambers'/6 chance for the time specified.  In either Optional param case, if 'random' is used, you have a very small chance of something worse happening peepoEvil`);
			response.push(5000);
		break;
		
		case 'cookie':
			response.push(`!cookie`);
			response.push(`Community wide cookie jar.  Every usage will generate a number between -99 and +100 and that value will be added (or subtracted) from the community wide cookie jar`);
			response.push(2500);
		
		case 'hate':
			response.push(`!hate - Optional parameter: another user's name: !hate Emiru`);
			response.push(`Show how much you either hate someone else in chat or how much you hate yourself!`);
			response.push(2500);
		break;
		
		case 'love':
			response.push(`!love - Optional parameter: another user's name: !love Emiru`);
			response.push(`Show how much you either love someone else in chat or how much you love yourself!`);
			response.push(2500);
		break;
		
		case '8ball':
			response.push(`!8ball`);
			response.push(`Ask the magic 8-ball a question`);
			response.push(2500);
		break;
		
		case 'uptime':
			response.push(`!uptime`);
			response.push(`Find out how long the stream has been live for.  If the stream is currently offline, this will return how long it has been since the last stream`);
			response.push(5000);
		break;
		
		case 'followage':
			response.push(`!followage - Parameters: 1) user to check; 2) channel to check in.  Examples: !followage; !followage Pokimane; !followage Emiru Pokimane`);
			response.push(`Check how long you (no params) or someone else (param 1) has been following this channel.  Check how long you or someone else has been following a different channel (param 2)`);
			response.push(7500);
		break;
		
		case 'accountage':
			response.push(`!accountage - Optional parameter: another user's name in chat`);
			response.push(`Find out how long ago either your own Twitch account or another user's Twitch account was made`);
			response.push(7500);
		break;
		
		case 'watchtime':
		case 'time':
			response.push(`!time (or !watchtime)- Optional parameter: another user's name in chat`);
			response.push(`Find out how many hours and minutes you have spent as a part of chat while the stream is live`);
			response.push(5900);
		break;
		
		case 'toptime':
			response.push(`!toptime`);
			response.push(`Find out who the top 10 people are that have spent the most time in chat`);
			response.push(2500);
		break;
	}
	return response;
}
