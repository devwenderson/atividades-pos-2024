import os
from authlib.integrations.flask_client import OAuth
from flask import session
from dotenv import load_dotenv


if (os.path.isfile(".env")):
    load_dotenv()

def oauthRegister(oauth, **kwargs):
    return oauth.register(
        name=kwargs["name"],
        client_id=os.getenv("CLIENT_ID"),
        client_secret=os.getenv("CLIENT_SECRET"),
        api_base_url=kwargs["api_base_url"],
        request_token_url=kwargs["request_token_url"],
        access_token_method=kwargs["access_token_method"],
        access_token_url=kwargs["access_token_url"],
        authorize_url=kwargs["authorize_url"],
        fetch_token=lambda: session.get('suap_token')
    )

class User:
    def __init__(self, oauth):
        self.oauth = oauth
        
    def fetchUserDados(self):
        return self.oauth.suap.get('v2/minhas-informacoes/meus-dados')

    def fetchUserBoletim(self, ano_letivo):
        return self.oauth.suap.get(f"/api/v2/minhas-informacoes/boletim/{ano_letivo}/1/")
    