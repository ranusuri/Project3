import numpy as np
import pymongo

from flask import Flask, jsonify

conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)
db = client.ufoDB


app = Flask(__name__)


@app.route("/")
def home():
    sightings = db.sightings.find()
    poop = []
    for sights in sightings:
        sights.pop("_id")
        poop.append(sights)
    print(poop[0])
    return jsonify(poop)



if __name__ == '__main__':
    app.run(debug=True)
