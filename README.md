# Twitch Chat Bot - RibBot

1. Run `npm install` to setup all the node packages that are used
2. Generate the necessary tokens/API keys

    1. Tokens/Keys needed include:
    
        1. Twitch API Client ID, Client Secret, Bearer Token (Authorization)
        2. Twitch OAUTH Token (to sign in)
        3. Spotify API Access Token and Refresh Token

3. You will also need to create a SQLite Database file that is setup in the following manner:
    
    1. There are 2 tables:
        
        1. `users` table that has columns: `Name, Time, User_ID` (also has `Index` but that's auto added).
        2. `customCommands` table has columns: `Command, Response, Cooldown, isOnCooldown`
        
4. The Python scripts are also setup as cron jobs so that they can constantly run and update their data when needed

    1. Current setup for each are as follows:

        1. TimeTracker.py => every 15 minutes of every day
        2. TitleGrabber.py => every minute of every day
        3. EndTime.py => every minute of every day
        4. Top_Users.py => every day at 1:05 am
        5. fixDB.py => every day at 11:53 pm
        6. tokenRefresher.py => every 3 hours of every day
        
        (optional)
        
        1. `users.db` SQLite file makes a backup copy every day at 11:58pm (23:58) with that days date on it and stores it in another folder
        2. every day at 11:59pm (23:59) delete all `.db` files from the backup folder that are older than 30 days

5. Run `node bot.js` to run the bot and let it go

6. Commands list, details, cooldown and syntax (if necessary) can be found here -> [Commands](https://github.com/nckrdr826/twitch_bot/blob/main/commands.md)
