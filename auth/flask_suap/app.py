from flask import Flask, redirect, url_for, session, request, jsonify, render_template
from authlib.integrations.flask_client import OAuth
from views.main import oauthRegister, User

app = Flask(__name__)
app.debug = True
app.secret_key = 'development'
oauth = OAuth(app)
oauthRegister(oauth, 
              name = "suap", 
              api_base_url="https://suap.ifrn.edu.br/api/", 
              request_token_url=None, 
              access_token_method="POST", 
              access_token_url="https://suap.ifrn.edu.br/o/token/", 
              authorize_url="https://suap.ifrn.edu.br/o/authorize/", token="suap_token")

@app.route('/')
def index():
    if 'suap_token' in session:
        user = User(oauth)
        meus_dados = user.fetchUserDados()
        return render_template('user.html', user_data=meus_dados.json())
    else:
        return render_template('index.html')


@app.route('/login')
def login():
    redirect_uri = url_for('auth', _external=True)
    return oauth.suap.authorize_redirect(redirect_uri)


@app.route('/logout')
def logout():
    session.pop('suap_token', None)
    return redirect(url_for('index'))


@app.route('/login/authorized')
def auth():
    token = oauth.suap.authorize_access_token()
    session['suap_token'] = token
    return redirect(url_for('index'))

@app.route("/boletim")
def boletim():
    user = User(oauth)
    data  = user.fetchUserDados()
    return render_template()

if __name__ == "__main__":
    app.run()
    
    