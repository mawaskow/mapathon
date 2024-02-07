from flask import Flask
from flask import render_template
from flask_wtf.csrf import CSRFProtect

# To run:
# if powershell: `$env:FLASK_APP = "run"`
# if bash: `export FLASK_APP=run`
# `flask run`

app = Flask(__name__)

SECRET_KEY = "pls_dont_hack_me"
app.config['SECRET_KEY'] = SECRET_KEY

csrf = CSRFProtect(app)

'''
ROUTES
'''
@app.route('/', methods=['GET', 'POST'])
def map_page():
    return render_template("map.html")

if __name__ == "__main__":
    app.run(debug=True, passthrough_errors=True, use_debugger=False, use_reloader=False)

