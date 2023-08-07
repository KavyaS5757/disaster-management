# app.py

from flask import Flask, jsonify, request
from flask_cors import CORS  # Import the CORS module
from crisis import get_latitude_longitude, get_places_near_location

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/get_latitude_longitude', methods=['POST'])
def get_lat_long():
    location = request.form.get('location')
    latitude, longitude = get_latitude_longitude(location)
    return jsonify({'latitude': latitude, 'longitude': longitude})

@app.route('/get_places_near_location', methods=['POST'])
def get_places_near():
    location = request.form.get('location')
    search_term = request.form.get('search_term')
    places = get_places_near_location(location, search_term)
    return jsonify(places)

if __name__ == '__main__':
    app.run(debug=True, port=5000)

@app.route('/test', methods=['GET'])
def test_route():
    return "Hello, this is a test route!"
