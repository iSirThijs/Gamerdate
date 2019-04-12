# GamerDate
## Description
GamerDate is a (web)app which matches users based on the games they play! After making a profile, you can add games to your library and find a match to the games you play as well. When you are looking at potential
matches you can decide per match if you want to match with them or if you don't like the other person.

## Screenshots
![Screenshot](https://github.com/iSirThijs/Gamerdate/wiki/images/screenshot1.png)
![Screenshot](https://github.com/iSirThijs/Gamerdate/wiki/images/Screenshot2.png)
![Screenshot](https://github.com/iSirThijs/Gamerdate/wiki/images/Screenshot3.png)
![Screenshot](https://github.com/iSirThijs/Gamerdate/wiki/images/Screenshot4.png)

## Get started
### Perquisites
* Node v11.12.0
* NPM v6.7.0
* A MongoDB installation (local, cloud or server)
* IGDB api key

### Install

#### 1. App and dependencies
1. Clone this repository to your computer
```bash
git clone https://github.com/iSirThijs/gamerdate.git
```
2. Navigate into the repository and install the dependencies
```bash
npm install
```

#### 2. Environment variables
1. Create an .env file and add these values
```bash
MONGO_DB = '<location of your MongoDB database>'
SESSION_SECRET = '<session key>'
IGDB_API_KEY = '< Your IGDB api key >'
```
  * if you want use a local database use `mongodb://localhost:30000`
#### 3. Database
* Setup the database:
In the terminal navigate to the repository and use:
```bash
mkdir data data/log data/db
```

* To access the database:
In the terminal use:
```bash
mongo --port 30000 --shell
```
* To close the database:
```bash
mongo --port 30000 --shell
use admin
db.shutdownServer()
exit
```

For more information on using the database consult the [MongoDB documentation](https://docs.mongodb.com)

### Usage
The app uses nodemon for development to automatically restart after a crash.

#### To use the app
*To use the app **with** nodemon*
1. Start up the mongoDB database with `npm run monogStart`
2. navigate to the repository and use `npm run nmStart`

*To use the app **without** nodemon*
1. Start up the mongoDB database with `npm run monogStart`
2. navigate to the repository and use `npm run Start`


## Copyright information
This is a school project for Blok Tech by team 3
This repository is based on the repository by [Giovanni](https://https://github.com/GiovanniDw/pt-course) but also includes code from the other team members repository/work
[Thijs](https://github.com/iSirThijs/Player2)
[Emma](https://github.com/emmaoudmaijer/datingsite)
[Remco](https://github.com/Kuckelkorn/Assignment-Project-Tech)
