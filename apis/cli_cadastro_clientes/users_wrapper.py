import requests

class Users_wrapper:
    api_url = "https://jsonplaceholder.typicode.com/users"
    
    def list_users(self):
        response = requests.get(self.api_url).json()
        return response
    