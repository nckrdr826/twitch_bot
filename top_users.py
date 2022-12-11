import json
from operator import itemgetter
import sqlite3
from datetime import datetime

connection = sqlite3.connect('/home/pi/Desktop/newUsers.db')
c = connection.cursor()

query = """SELECT Name, Time/60 FROM users ORDER BY Time DESC LIMIT 10"""
c.execute(query)
records = c.fetchall()

top_people = []
for i, row in enumerate(records):
    top_people.append(str(i + 1) + '. ' + row[0] + ': ' + str(row[1]))
top_string = "Top 10 users are: " + ', '.join(top_people)

c.close()
connection.close()

new_file = open("/home/pi/Desktop/new_top_users_list.txt", "w")
new_file.write(top_string)
new_file.close()
