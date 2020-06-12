from flask import Flask
from flask import request
from flask_cors import CORS
from flask_mysqldb import MySQL
import json

app=Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'project'

CORS(app)

mysql=MySQL(app)


@app.route("/")
def home():
    return "Home"

# User Register Function
@app.route("/register",methods=["POST"])
def userRegister():
    first_name=request.json["first_name"]
    last_name=request.json["last_name"]
    username=request.json["username"]
    password=request.json["password"]

    cur=mysql.connection.cursor()

    cur.execute(''' INSERT INTO user(first_name,last_name,username,password,admin) VALUES("%s","%s","%s","%s",False); ''' %(first_name,last_name,username,password))
    mysql.connection.commit()
    cur.close()

    return json.dumps({"message":"User Registration is successfully"})