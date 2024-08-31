import requests, os, json
from getpass import getpass

api_url = "https://suap.ifrn.edu.br/api/"

def auth(api_url):
    user = input("Matrícula: ")
    password = getpass("Senha: ")

    data = {"username":user,"password":password}

    response = requests.post(api_url+"v2/autenticacao/token/", json=data)
    return response.json()["access"]

def boletim_request(api_url, token, ano_letivo):
    headers = {
        "Authorization": f'Bearer {token}'
    }
    response = requests.get(f"{api_url}v2/minhas-informacoes/boletim/{ano_letivo}/1", headers=headers)
    return response.json()

if (os.path.isfile("auth/suap_api/token.json")):
    with open("auth/suap_api/token.json") as file:
        token = json.load(file)['token']
        response = boletim_request(api_url, token, 2023)
        for disciplina in response:
            print(f"{disciplina['disciplina']} - Média final: {disciplina['media_disciplina']}")  
else:
    with open("auth/suap_api/token.json", "w") as file:
        token = auth(api_url)
        data = {"token": token}
        json.dump(data, file)



