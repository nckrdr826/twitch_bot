import requests
import json
import os
import sqlite3
from config import Authorization, Client_Id
import time as timer
import pandas as pd
from datetime import datetime

headers = {"Authorization": Authorization, "Client-Id": Client_Id}
chat_list = []
response = requests.get('https://api.twitch.tv/helix/streams?user_login=emiru', headers=headers).json()

if len(response["data"]) == 0:
	os._exit(0)

else:
	for i, s in enumerate(chat_list):
		chat_list[i] = "&login=" + s

	chunks = [chat_list[x:x+99] for x in range(0, len(chat_list), 99)]

	for i in range(len(chunks)):
		chunks[i] = ''.join(chunks[i])

	for i in range(len(chunks)):
		chunks[i] = chunks[i][1:]

	data = {}
	for i in range(len(chunks)):
		try:
			url = f'https://api.twitch.tv/helix/users?{chunks[i]}'
			response = requests.get(url, headers=headers)
			info = response.json()
			for j in range(len(info['data'])):
				data[info['data'][j]['login']] = info['data'][j]['id']
		except:
			data[f'issue at #{i}'] = info
			print(f'issue at #{i}', info)
			continue
		timer.sleep(1)

	connection = sqlite3.connect('/home/pi/Desktop/newUsers.db')
	c = connection.cursor()
	query = """SELECT * FROM USERS"""
	c.execute(query)
	records = c.fetchall()

	name = []
	time = []
	user_id = []
	res = []
	for row in records:
		name.append(row[1])
		time.append(row[2])
		user_id.append(row[3])
	
	for i in range(len(records)):
		sub_list = []
		sub_list.append(name[i])
		sub_list.append(time[i] + 15)
		sub_list.append(user_id[i])
		res.append(sub_list)

	df = pd.DataFrame(res, columns=["Name", "Time", "User_ID"])

	for i, s in enumerate(missing):
		missing[i] = "&login=" + s

	missingChunks = [missing[x:x+99] for x in range(0, len(missing), 99)]

	for i in range(len(missingChunks)):
		missingChunks[i] = ''.join(missingChunks[i])

	for i in range(len(missingChunks)):
		missingChunks[i] = missingChunks[i][1:]

	missingData = {}
	for i in range(len(missingChunks)):
		try:
			url = f'https://api.twitch.tv/helix/users?{missingChunks[i]}'
			response = requests.get(url, headers=headers)
			info = response.json()
			for j in range(len(info['data'])):
				missingData[info['data'][j]['login']] = info['data'][j]['id']
		except:
			missingData[f'MISSING issue at #{i}'] = info
			print(f'MISSING issue at #{i}', info)
			continue
		timer.sleep(1)

	missing_output_list = list(missingData.keys())
	newMissing = []

	for i in range(len(missing_output_list)):
		sub_list = []
		sub_list.append(missing_output_list[i])
		sub_list.append(0)
		sub_list.append(0)
		newMissing.append(sub_list)

	df2 = pd.DataFrame(newMissing, columns=["Name", "Time", "User_ID"])
	df2.set_index("Name", inplace=True)

	for i in range(len(missing_output_list)):
		df2.at[missing_output_list[i], 'User_ID'] = data[missing_output_list[i]]

	df2.reset_index(inplace=True)

	df3 = pd.concat([df, df2])
	df3.to_sql("tmp_table", connection)

	c.execute("BEGIN")
	c.execute("DELETE FROM users WHERE User_ID IN (SELECT User_ID FROM tmp_table);")
	c.execute("INSERT INTO users SELECT * FROM tmp_table;")
	c.execute("COMMIT;")
	c.execute("DROP TABLE tmp_table")

	c.close()
	connection.close()
