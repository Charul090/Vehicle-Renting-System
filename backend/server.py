from flask import Flask
from flask import request
from flask_cors import CORS
from flask_mysqldb import MySQL
from datetime import datetime
import json
import time
import jwt
import math

app=Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '@TorresDash09'
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

    cur.execute(''' SELECT username from user ''')
    result=cur.fetchall()

    flag=False

    for x in result:
        if username == x[0]:
            flag=True

    if flag:
        return json.dumps({"message":"Username Already Exists","error":True})
    else:
        cur.execute(''' INSERT INTO user(first_name,last_name,username,password,admin) VALUES("%s","%s","%s","%s",False); ''' %(first_name,last_name,username,password))
        mysql.connection.commit()
        cur.close()

        return json.dumps({"message":"User Registration is successfull","error":False})

#User Login Function
@app.route("/userlogin",methods=["POST"])
def userLogin():
    username=request.json["username"]
    password=request.json["password"]

    cur=mysql.connection.cursor()

    cur.execute(''' SELECT username,password,id FROM user ''')
    result=cur.fetchall()

    flag=False

    user_id=None

    for x in result:
        if x[0] == username:
            if x[1] == password:
                user_id=x[2]
                flag=True
    
    if flag:
        payload={   
                    "user_id":user_id,
                    "username":username,
                    "status":"logged-in",
                    "time":time.time()+172800
                }

        key="masai"

        encode=jwt.encode(payload,key)

        return json.dumps({"token":encode.decode(),"message":"Login Successfull","error":False,"admin":False})
    else:
        return json.dumps({"message":"Username or password is incorrect","error":True})


#Admin Login function
@app.route("/adminlogin",methods=["POST"])
def adminLogin():
    username=request.json["username"]
    password=request.json["password"]

    cur=mysql.connection.cursor()

    cur.execute(''' SELECT username,password,admin,id FROM user ''')
    result=cur.fetchall()

    flag=False
    user_id=None

    for x in result:
        if x[0] == username:
            if x[1] == password:
                if x[2] == 1:
                    user_id=x[3]
                    flag=True
    
    if flag:
        payload={
                    "user_id":user_id,
                    "username":username,
                    "status":"logged-in",
                    "time":time.time()+172800
                }

        key="masai"

        encode=jwt.encode(payload,key)

        return json.dumps({"token":encode.decode(),"message":"Login Successfull","error":False,"admin":True})
    else:
        return json.dumps({"message":"Login UnSuccessfull","error":True})


#Function for Authentication of token
@app.route("/auth_check",methods=["POST"])
def authCheck():
    token=request.json["token"]

    key="masai"

    data=jwt.decode(token,key)

    current_time=time.time()

    cur=mysql.connection.cursor()
    cur.execute(''' SELECT * FROM user WHERE id="%d" ''' %(data["user_id"]))
    result=cur.fetchall()

    info={
        "first_name":result[0][1],
        "last_name":result[0][2],
        "username":result[0][3],
        "user_id":data["user_id"]
    }


    if data["time"] < current_time:
        return json.dumps({
            "error":True,
            "message":"Invalid Token"
        })
    else:
        return json.dumps({
            "error":False,
            "data":info,
            "message":"Valid Token"
        })

    
#############################


@app.route("/car/basic")
def getBasicCarData():

    cur=mysql.connection.cursor()
    cur.execute(''' SELECT c.id,c.car_name,c.car_make,c.car_vin,l.id,l.location,c.color FROM car as c LEFT JOIN location as l ON c.current_location_id=l.id;''')

    result=cur.fetchall()

    data=[]

    for x in result:
        obj={
            "car_id":x[0],
            "car_model":x[1],
            "car_make":x[2],
            "car_vin":x[3],
            "location_id":x[4],
            "location":x[5],
            "car_color":x[6]
        }
        data.append(obj)

    return json.dumps({"data":data})

#Returns location information
@app.route("/location")
def getLocationData():
    cur=mysql.connection.cursor()
    cur.execute(''' SELECT * FROM location; ''')

    result=cur.fetchall()

    data=[]

    for x in result:
        obj={
            "location_id":x[0],
            "location":x[1],
            "latitude":x[2],
            "longitutde":x[3]
        }
        data.append(obj)

    return json.dumps({"data":data})


#Updating car information after ride
def updateCarInfo(car_id,distance,destination):
    cur=mysql.connection.cursor()

    cur.execute(''' SELECT total_distance FROM car WHERE id="%d" ''' %(car_id))
    result=cur.fetchall()

    total_distance=int(result[0][0])+distance

    cur.execute(''' UPDATE car SET total_distance="%d" WHERE id="%d"; ''' %(total_distance,car_id))
    mysql.connection.commit()

    cur.execute(''' UPDATE car SET current_location_id="%d" WHERE id="%d"; ''' %(destination,car_id))
    mysql.connection.commit()
    
    cur.close()



##Function to Update user's travel information undertaken
@app.route("/user/updateride",methods=["POST"])
def updateRide():
    token=request.json["token"]
    car_id=request.json["car_id"]
    distance=request.json["distance"]
    time=request.json["time"]
    start=request.json["start"]
    destination=request.json["destination"]


    cost=(int(distance)//8)*76

    key="masai"
    data=jwt.decode(token,key)
    user_id=data["user_id"]

    cur=mysql.connection.cursor()
    cur.execute(''' INSERT INTO user_car(user_id,car_id,distance,cost,time,start,destination) VALUES("%s","%s","%s","%s","%s","%s","%s"); ''' %(user_id,car_id,distance,cost,time,start,destination))
    mysql.connection.commit()

    updateCarInfo(car_id,int(distance),int(destination))

    cur.execute(''' SELECT car_make,car_name FROM car WHERE id="%d" ;''' %(int(car_id)))
    result=cur.fetchall()

    for x in result:
        car_make=x[0]
        car_name=x[1]
    

    cur.execute(''' SELECT location FROM location WHERE id="%d"; ''' %(int(start)))
    result=cur.fetchall()

    start=result[0][0]

    cur.execute(''' SELECT location FROM location WHERE id="%d"; ''' %(int(destination)))
    result=cur.fetchall()

    cur.close()

    destination=result[0][0]

    info={
        "user_name":data["username"],
        "car_make":car_make,
        "car_name":car_name,
        "distance":distance,
        "cost":cost,
        "time":time,
        "start":start,
        "destination":destination
    }

    return json.dumps({"status":True,"message":"Your Ride has completed Successfully","info":info})


def Pagination(page,per_page,total):
    total_pages=math.ceil(total/per_page)
    start_index=(page-1)*per_page
    end_index=page*per_page

    return [total_pages,start_index,end_index]


@app.route("/user/prevride")
def userPrevRide():
    user_id=request.args.get("user_id")
    page=request.args.get("page",default=1,type=int)
    per_page=request.args.get("per_page",default=10,type=int)

    cur=mysql.connection.cursor()
    cur.execute(''' SELECT c.car_name,c.car_make,l1.location,l2.location,uc.time FROM user_car as uc JOIN car as c ON uc.car_id=c.id JOIN location as l1 ON uc.start=l1.id JOIN location as l2 ON uc.destination=l2.id WHERE uc.user_id="%d" ORDER BY uc.time DESC;''' %(int(user_id)))
    result = cur.fetchall()

    data=[]
    for x in result:
        obj={
            "car_name":x[0],
            "car_make":x[1],
            "start":x[2],
            "destination":x[3],
            "time":x[4].strftime("%Y/%m/%d, %H:%M:%S")
        }

        data.append(obj)
    
    total=len(data)
    page_info=Pagination(page,per_page,total)

    data=data[page_info[1]:page_info[2]]


    return json.dumps({"total_pages":page_info[0],"current_page":page,"data":data})