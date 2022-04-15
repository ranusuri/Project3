import numpy as np
import pymongo
import pandas as pd

from flask import Flask, jsonify, render_template

conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)
db = client.ufoDB


app = Flask(__name__)

@app.route("/")
def home():
    return render_template('index.html')

@app.route("/test")
def get_results():
    sightings = db.sightings.find()
    poop = []
    for sights in sightings:
        sights.pop("_id")
        poop.append(sights)
    print(poop)
    return jsonify(poop)


@app.route("/test2")
def get_results2():
    sightings = db.sightings.find()
    poop = []
    for sights in sightings:
        sights.pop("_id")
        poop.append(sights)
    print(poop)
    df = pd.DataFrame(poop)
    series= df.groupby('state')['shape'].count()
    poop2 = {'states': list(series.index), 'sightings': list(series)}
    return jsonify(poop2)

@app.route("/test3")
def get_results3():
    sightings = db.sightings.find()
    poop = []
    for sights in sightings:
        sights.pop("_id")
        poop.append(sights)
    print(poop)
    df = pd.DataFrame(poop)
    series= df['shape'].value_counts()
    poop3 = {'shapes': list(series.index), 'count': list(series)}
    return jsonify(poop3)


if __name__ == '__main__':
    app.run(debug=True)
