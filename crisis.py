import requests
from urllib.parse import quote
from geopy.distance import geodesic
from geopy.geocoders import Nominatim

# Create a geocoder instance
geolocator = Nominatim(user_agent="my_geocoder")

def get_latitude_longitude(location):
    location_info = geolocator.geocode(location)
    if location_info:
        latitude = location_info.latitude
        longitude = location_info.longitude
        return latitude, longitude
    else:
        return None, None

def get_places_near_location(location, search_term):
    latitude, longitude = get_latitude_longitude(location)
    if latitude is None or longitude is None:
        return None

    url = f"https://nominatim.openstreetmap.org/search?q={quote(search_term)}+in+{quote(location)}&format=json&viewbox={longitude-0.1}%2C{latitude-0.1}%2C{longitude+0.1}%2C{latitude+0.1}&countrycodes=IN"
    response = requests.get(url)
    data = response.json()
    return data

def display_places(places, limit=5):
    for idx, place in enumerate(places[:limit], start=1):
        print(f'{idx}. Name: {place["display_name"]}')
        print()

def main():
    try:
        location = input('Hey there! Where are you located? (Please enter your city and pincode): ')
        search_term = input('Please let us know what kind of assistance do you need? (e.g., pharmacy, hospital, shelter, food, water): ')

        places = get_places_near_location(location, search_term)
        if places is not None:
            print(f"Great! There are a few places related to '{search_term}' near {location}:")
            show_distance_sort = input("Would you like to see the places in terms of the nearest distance? (yes/no): ")
            
            if show_distance_sort.lower() == "yes":
                user_coords = get_latitude_longitude(location)
                places.sort(key=lambda place: geodesic(user_coords, (place["lat"], place["lon"])).kilometers)

            display_places(places)
            
            show_more = input("Would you like to see more places? (yes/no): ")
            if show_more.lower() == "yes":
                display_places(places, limit=None)

            selected_idx = int(input("Select a place you want to go to by entering the number next to it: ")) - 1
            if 0 <= selected_idx < len(places):
                selected_place = places[selected_idx]
                user_coords = get_latitude_longitude(location)
                place_coords = (selected_place["lat"], selected_place["lon"])
                distance = geodesic(user_coords, place_coords).kilometers
                print(f"Sure thing! Here are the directions to {selected_place['display_name']} (Distance: {distance:.2f} km):")
                print(f"https://www.google.com/maps/dir/{user_coords[0]},{user_coords[1]}/{place_coords[0]},{place_coords[1]}")
            else:
                print("Oops! That's an invalid selection.")
        else:
            print(f"I'm sorry, but it looks like we couldn't find any relevant '{search_term}' near your location.")
    except KeyboardInterrupt:
        print("\nLooks like you changed your mind. Feel free to come back whenever you need assistance!")
    except Exception as e:
        print("Oh no! An error occurred:", str(e))

if __name__ == "__main__":
    main()
