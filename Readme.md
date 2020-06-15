# Vehicle Renting System

**Tech Stack**
- React
- Python
- Flask
- MySql

**UI Framework**
- React Bootstrap


## Instructions to run locally

### FRONTEND
    - git clone https://github.com/Charul090/Vehicle-Renting-System.git

    - cd Vehicle-Renting-System-master/frontend
    -npm install
    -npm start

### BACKEND
**Before Proceeding to Flask, set up the mysql config in the server.py and then create databases with command given in the sql files**

    app.config['MYSQL_HOST'] = 'localhost'
    app.config['MYSQL_USER'] = 'root'
    app.config['MYSQL_PASSWORD'] = '//your password to access mysql'
    app.config['MYSQL_DB'] = '//your database'

**Setting Up flask enviornment**

    cd Vehicle-Renting-System-master/frontend
    pip install virtualenv
    source test/bin/activate
    pip install flask
    pip install flask_cors
    pip install flask-mysqldb
    export FLASK_ENV=development
    export FLASK_APP=server.py
    export FLASK_DEBUG=1
    flask run 
