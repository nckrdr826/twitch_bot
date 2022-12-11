import sqlite3
import pandas as pd

connection = sqlite3.connect('/home/pi/Desktop/newUsers.db')
c = connection.cursor()

query = """SELECT * FROM users"""
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
    res.append((name[i], time[i], user_id[i]))
    
newDF = pd.DataFrame(res, columns=["Name", "Time", "User_ID"])
newDF.to_sql("users", connection, if_exists="replace")

c.close()
connection.close()
