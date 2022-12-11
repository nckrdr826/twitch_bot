import requests
import json
import os
from config import Authorization, Client_Id

headers = {"Authorization": Authorization, "Client-Id": Client_Id}

response = requests.get('https://api.twitch.tv/helix/channels?broadcaster_id=91067577', headers=headers).json()

title_file = open("/home/pi/Desktop/title.txt", "r")
content = title_file.readline()
title = response["data"][0]["title"]
title_file.close()
if(content != title):
	title_file = open("/home/pi/Desktop/title.txt", "w")
	title_file.write(title)
	title_file.close()
os._exit(0)
