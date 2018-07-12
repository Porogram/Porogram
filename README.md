# LOL Stats
Statistics interface for League of Legends
## Getting Started
```
$ git clone git@github.com:lolstats/lolstats.git
```
### Installation
#### Server
```
$ cd server
$ npm install
$ python3 -m venv venv
$ source venv/bin/activate
$ pip install -r requirements.txt
```
#### Client
```
$ cd ../client
$ npm install
```
make `.env` file inside `server` to store your Riot API key

**.env**
```
export API_KEY="<YOUR API_KEY>"
```
### Usage
```
$ ./startup.sh
```
## Built With
* React - front end
* Python - back end
* Material-UI - user interface

## Authors
* Jewon Oh
* Matt Shan
* Edward Atkinson
