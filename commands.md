# Commands List
### List of commands available, details, cooldowns and any special syntax/ex (if necessary) (all commands start with !):

1. emirudancy
    - Details: The `emiruDancy` emote is being counted everytime it's used.  This command returns the current count of said emote
    - Cooldown: 2.5 seconds
    - Permissions: null
    - Syntax/Ex: null
2. addcom
    - Details: Add a custom command to the bot to be used. 
    - Cooldown: null
    - Permissions: specific people
    - Syntax/Ex: `!addcom [command to add with or without the !] [response]`
        - Ex: `!addcom test This is a test command` OR `!addcom !test This is a test command`
3. editcom
    - Details: Edit one of the commands added via `!addcom` or a preset list of commands whose response have the potential to change on a per-stream basis
    - Cooldown: null
    - Permissions: specific people
    - Syntax/Ex: `!editcom [the command to edit with or without the !] [the new response for the command]`
        - Ex: `!editcom !camera No camera is used` OR `!editcom !camera No camera is used`
4. delcom
    - Details: Delete one or more of the commands added via `!addcom`
    - Cooldown: null
    - Permissions: specific people
    - Syntax/Ex: `!delcom [the command or commands to delete with or without the !]`
        -  Ex: `!delcom !camera` OR `!delcom camera masks test team`
5. roulette
    - Details: Play russian roulette where you have a:
        - 1/6 chance to be timed out for 10 seconds
        - 1/6 chance to be timed out for a chosen duration
        - `chambers`/6 chance to be timed out for a chosen duration
        - very small chance that something worse happens
    - Cooldown: 5 seconds
    - Permissions: null
    - Notes: `chambers` can only be 1-6.  `(chambers < 1) = 1; (chambers > 6) = 6`; `chosen duration` can be from 1-604800
    - Syntax/Ex: `!roulette` OR `!roulette [chosen duration]` OR `!roulette [chambers] [chosen duration]`
        - Ex: `!roulette` OR `!roulette 60` OR `!roulette 6 604800`
6. cookie
    - Details: Community wide cookie jar.  Every usage will generate a random number between -99 and +100 and that value will be added to (or subtracted from) the community wide cookie jar
    - Cooldown: 2.5 seconds
    - Permissions: null
    - Syntax/Ex: null
7. hate
    - Details: Show how much you either hate someone else in chat or how much you hate yourself
    - Cooldown: 2.5 seconds
    - Permissions: null
    - Syntax/Ex: `!hate` OR `!hate [other user's name]`
8. love
    - Details: Show how much you either love someone else in chat or how much you love yourself
    - Cooldown: 2.5 seconds
    - Permissions: null
    - Syntax/Ex: `!love` OR `!love [other user's name]`
9. cannon
    - Details: Returns how many times Emiru has missed a cannon in League of Legends (counter increases by 1 everytime the command is used)
    - Cooldown: 2.5 seconds
    - Permissions: null
    - Syntax/Ex: null
10. wednesday
    - Details: If the current date is Wednesday based on Central Time in the US, replies appropriately.  If it's not Wednesday, replies that it's not
    - Cooldown: 2.5 seconds
    - Permissions: null
    - Syntax/Ex: null
11. thursday
    - Details: If the current date is Thursday based on Central Time in the US, replies appropriately.  If it's not Thursday, replies that it's not
    - Cooldown: 2.5 seconds
    - Permissions: null
    - Syntax/Ex: null
12. woo
    - Details: Replies with emiWOO
    - Cooldown: 2.5 seconds
    - Permissions: null
    - Syntax/Ex: null
13. title
    - Details: Returns the current title of the stream
    - Cooldown: 2.5 seconds
    - Permissions: null
    - Syntax/Ex: null
14. doesemiruspeakchineseorgerman
    - Details: Returns "no"
    - Cooldown: 2.5 seconds
    - Permissions: null
    - Syntax/Ex: null
15. brother:
    - Details: Returns the twitch channel of Emiru's brother
    - Cooldown: 2.5 seconds
    - Permissions: null
    - Syntax/Ex: null
16. rules
    - Details: Returns the chat's rules that Emiru has set
    - Cooldown: 2.5 seconds
    - Permissions: null
    - Syntax/Ex: null
17. smite
    - Details: Returns a string that tells Emiru to play smite
    - Cooldown: 2.5 seconds
    - Permissions: null
    - Syntax/Ex: null
18. 8ball
    - Details: Ask the magic 8-ball a question
    - Cooldown: 2.5 seconds
    - Permissions: null
    - Syntax/Ex: `!8ball [question goes here]`
19. sad
    - Details: Replies with message that Emiru said on stream a long time ago
    - Cooldown: 2.5 seconds
    - Permissions: null
    - Syntax/Ex: null
20. weeb
    - Details: Returns ASCII art of an anime character
    - Cooldown: 2.5 seconds
    - Permissions: null
    - Syntax/Ex: null
21. discord
    - Details: Returns the link to Emiru's Discord server with instructions on how to get the `Subscriber` role in the server
    - Cooldown: 2.5 seconds
    - Permissions: null
    - Syntax/Ex: null
22. elo
    - Details: Returns Emiru's current rank in both League of Legends and Overwatch 2
    - Cooldown: 2.5 seconds
    - Permissions: null
    - Syntax/Ex: null
23. rank
    - Details: Returns Emiru's current rank in both League of Legends and Overwatch 2
    - Cooldown: 2.5 seconds
    - Permissions: null
    - Syntax/Ex: null
24. instagram
    - Details: Returns a link to Emiru's Instagram
    - Cooldown: 2.5 seconds
    - Permissions: null
    - Syntax/Ex: null
25. merch
    - Details: Returns 2 links to Emiru's merch stores
    - Cooldown: 2.5 seconds
    - Permissions: null
    - Syntax/Ex: null
26. opgg
    - Details: Returns either a preset link to Emiru's multiple League of Legends account rankings or if other parameters are provided, returns a link with that new info
    - Cooldown: 2.5 seconds
    - Permissions: null
    - Syntax/Ex: `!opgg` `!opgg KR Hide on Bush`
27. playlist
    - Details: Returns Spotify links to Emiru's Intro playlist, General playlist, and the Chat made playlist
    - Cooldown: 2.5 seconds
    - Permissions: null
    - Syntax/Ex: null
28. sub
    - Details: Returns a link to subscribe to Emiru's Twitch channel
    - Cooldown: 2.5 seconds
    - Permissions: null
    - Syntax/Ex: null
29. twitter
    - Details: Returns a link to Emiru's Twitter
    - Cooldown: 2.5 seconds
    - Permissions: null
    - Syntax/Ex: null
30. wallpaper/wallpapers
    - Details: Returns an Imgur album link that has Emiru's desktop backgrounds (last updated 6/16/2018)
    - Cooldown: 2.5 seconds
    - Permissions: null
    - Syntax/Ex: null
31. emiruez
    - Details: Returns emiruEZ Clap
    - Cooldown: 2.5 seconds
    - Permissions: null
    - Syntax/Ex: null
32. hype
    - Details: Returns a repeated string filled with the 2 emotes: `HYPE` and `emiruHYPERBUN`
    - Cooldown: 2.5 seconds
    - Permissions: null
    - Syntax/Ex: null
33. cosplay
    - Details: Returns the currently set cosplay that Emiru is wearing
    - Cooldown: 2.5 seconds
    - Permissions: null
    - Syntax/Ex: null
34. uwu
    - Details: Returns an UWU
    - Cooldown: 2.5 seconds
    - Permissions: null
    - Syntax/Ex: null
35. dmca
    - Details: Returns a YouTube link that explains how you can setup your OBS to have music that plays live not appear in the VODs (use the info in the link at your own risk)
    - Cooldown: 2.5 seconds
    - Permissions: null
    - Syntax/Ex: null
36. faq
    - Details: Returns Emiru's FAQ page
    - Cooldown: 2.5 seconds
    - Permissions: null
    - Syntax/Ex: null
37. height
    - Details: Returns Emiru's height
    - Cooldown: 2.5 seconds
    - Permissions: null
    - Syntax/Ex: null
38. tiktok
    - Details: Returns a link to Emiru's TikTok page
    - Cooldown: 2.5 seconds
    - Permissions: null
    - Syntax/Ex: null
39. vanish
    - Details: Times you out for 1 second
    - Cooldown: 2.5 seconds
    - Permissions: null
    - Syntax/Ex: null
40. uptime
    - Details: Find out how long the stream has been live for.  If the stream is currently offline, this will return how long it has been since the last stream and whatever the current title is set to
    - Cooldown: 5 seconds
    - Permissions: null
    - Syntax/Ex: null
41. followage
    - Details: Check how long you or someone else has been following this channel or another channel
    - Cooldown: 7.5 seconds
    - Permissions: null
    - Syntax/Ex: `!followage` OR `!followage pokimane` OR `!followage emiru pokimane`
42. accountage
    - Details: Find out how long ago either your own Twitch account or another user's Twitch account was made
    - Cooldown: 7.5 seconds
    - Permissions: null
    - Syntax/Ex: `!accountage` OR `!accountage emiru`
43. giveaway
    - Details: Enter a giveaway (that doesn't exist)
    - Cooldown: 2.5 seconds
    - Permissions: null
    - Syntax/Ex: null
44. song
    - Details: Returns how to find the current playing song's name/artist
    - Cooldown: 2.5 seconds
    - Permissions: null
    - Syntax/Ex: null
45. time/watchtime
    - Details: Find out how many hours and minutes you or another user have spent as a part of chat WHILE THE STREAM IS LIVE
    - Cooldown: 5 seconds
    - Permissions: null
    - Syntax/Ex: `!time` OR `!time emiru` OR `!watchtime` OR `!watchtime emiru`
46. toptime
    - Details: Find out who the top 10 people are that have spent the most time in chat
    - Cooldown: 2.5 seconds
    - Permissions: null
    - Syntax/Ex: null
47. pb
    - Details: Returns Emiru's current 16\* and 70\* personal bests in Super Mario 64 speed runs
    - Cooldown: 2.5 seconds
    - Permissions: null
    - Syntax/Ex: null
48. buns
    - Details: Returns a list of Emiru's current bunnies
    - Cooldown: 2.5 seconds
    - Permissions: null
    - Syntax/Ex: null
49. youtube
    - Details: Fetches and returns the latest posted YouTube video on Emiru's channel and a link to the channel
    - Cooldown: 5 seconds
    - Permissions: null
    - Syntax/Ex: null
50. shorts
    - Details: Fetches and returns the latest posted YouTube short on Emiru's channel and a link to the shorts page
    - Cooldown: 5 seconds
    - Permissions: null
    - Syntax/Ex: null
51. podcast/pod/noodleshop
    - Details: Fetches and returns the latest posted YouTube video on the NoodleShop's podcast channel
    - Cooldown: 5 seconds
    - Permissions: null
    - Syntax/Ex: null
52. prime
    - Details: Provides a "Did you know" about how you can use your Twitch Prime to subscribe to Twitch Channels for free
    - Cooldown: 2.5 seconds
    - Permissions: null
    - Syntax/Ex: null
53. ping
    - Details: Returns how long the bot has been running for and the current CPU temp
    - Cooldown: 5 seconds
    - Permissions: null
    - Syntax/Ex: null
54. po/pobox
    - Details: Returns Emiru's PO Box address
    - Cooldown: 2.5 seconds
    - Permissions: null
    - Syntax/Ex: null
55. reddit
    - Details: Returns a link to Emiru's Subreddit page
    - Cooldown: 2.5 seconds
    - Permissions: null
    - Syntax/Ex: null
56. starforge
    - Details: Returns a link to the Starforge PC website
    - Cooldown: 2.5 seconds
    - Permissions: null
    - Syntax/Ex: null
57. essence
    - Details: Prints message related to Essence Makeup Sponsor
    - Cooldown: 2.5 seconds
    - Permissions: null
    - Syntax/Ex: null
58. squad/team
    - Details: If data is set, returns who Emiru is currently playing with on stream
    - Cooldown: 2.5 seconds
    - Permissions: null
    - Syntax/Ex: null
59. schedule
    - Details: Returns a link to Emiru's stream schedule
    - Cooldown: 2.5 seconds
    - Permissions: null
    - Syntax/Ex: null
60. timeoff
    - Details: Times out the user for 1 day so that they can "take some time off from Twitch"
    - Cooldown: 10 seconds
    - Permissions: null
    - Syntax/Ex: null
61. help
    - Details: Without paramters, returns what commands are available for "help".  With a specified command, returns some additional info about the command
    - Cooldown: 2.5 seconds
    - Permissions: null
    - Syntax/Ex: null
62. query
    - Details: Provide a question to ask Wolfram Alpha
    - Cooldown: 5 seconds
    - Permissions: null
    - Syntax/Ex: null
63. commands
    - Details: Returns a list of commands that currently exist plus any custom commands created with `!addcom`
    - Cooldown: 2.5 seconds
    - Permissions: null
    - Syntax/Ex: null
