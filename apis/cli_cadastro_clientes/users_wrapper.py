import requests

class Users_wrapper:
    api_url = "https://jsonplaceholder.typicode.com/users/"

    def list_users(self):
        response = requests.get(self.api_url)
        return response.json()

    def create_user(self, name, username, email):
        user = {
            "id": 1,
            "name": name,
            "username": username,
            "email": email,
            "address": {
                "street": None,
                "suite": None,
                "city": None,
                "zipcode": None,
                "geo": {
                    "lat": None,
                    "lng": None
                }
            },
            "phone": None,
            "website": None,
            "company": {
                "name": None,
                "catchPhrase": None,
                "bs": None
            }
        }
        response = requests.post(self.api_url, json=user)
        return response.status_code

    def delete_user(self, id):
        response = requests.delete(self.api_url + f"{id}")
        return response.status_code
    
    def detail_user(self, id):
        response = requests.get(self.api_url + f"{id}")
        return response.json()
    
    def update_user(self, id, name=None, username=None, email=None):
        response = requests.get(self.api_url + f"{id}")
        user = {
            "id": None,
            "name": name,
            "username": username,
            "email": email,
            "address": {
                "street": None,
                "suite": None,
                "city": None,
                "zipcode": None,
                "geo": {
                    "lat": None,
                    "lng": None
                }
            },
            "phone": None,
            "website": None,
            "company": {
                "name": None,
                "catchPhrase": None,
                "bs": None
            }
        }
        response = requests.put(response, json=user)
        return response.status_code

