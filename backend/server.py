from flask import Flask
from flask import request
from flask_cors import CORS
from flask_mysqldb import MySQL
import json
import time
import jwt

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

@app.route("/userlogin")
def userLogin():
    username=request.json["username"]
    password=request.json["password"]

    cur=mysql.connection.cursor()

    cur.execute(''' SELECT username,password FROM user ''')
    result=cur.fetchall()

    flag=False

    for x in result:
        if x[0] == username:
            if x[1] == password:
                flag=True
    
    if flag:
        payload={
                    "username":username,
                    "status":"logged-in",
                    "time":time.time()+172800
                }

        key="masai"

        encode=jwt.encode(payload,key)

        return json.dumps({"token":encode.decode(),"message":"Login Successfull","error":False})
    else:
        return json.dumps({"message":"Login UnSuccessfull","error":True})


@app.route("/auth_check")
def authCheck():
    token=request.json["token"]

    key="masai"

    data=jwt.decode(token,key)

    current_time=time.time()

    if data["time"] < current_time:
        return json.dumps({
            "error":True,
            "message":"Invalid Token"
        })
    else:
        return json.dumps({
            "error":False,
            "message":"Valid Token"
        })

    