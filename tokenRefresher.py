import requests
import json
import os
from config import Client_Id, Client_Secret, Refresh_Token

with open("/home/pi/Desktop/bot_config.json", "r") as jsonFile:
	config = json.load(jsonFile)

headers = {"Authorization": config['twitch_oauth_timeout_token'], "Client-Id": Client_Id}
response = requests.get('https://api.twitch.tv/helix/streams?user_id=91067577', headers=headers)

if(response.status_code != 200):
	payload = {'client_id': Client_Id, 'client_secret': Client_Secret, 'grant_type':'refresh_token', 'refresh_token': Refresh_Token}
	refresh = requests.post("https://id.twitch.tv/oauth2/token", data=payload).json()
	
	config['twitch_oauth_timeout_token'] = 'Bearer ' + refresh['access_token']
	with open("/home/pi/Desktop/bot_config.json", "w") as jsonFile:
		json.dump(config, jsonFile, indent=4)
