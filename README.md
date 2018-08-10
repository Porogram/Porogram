# Porogram
Mobile responsive web application for League of Legends that provides a
customizable activity feed and profile summary for players
## Getting Started
```
$ git clone https://github.com/Porogram/Porogram.git
```
### Server
```
$ cd server
$ python3 -m venv venv
$ . venv/bin/activate
$ python3 -m pip install -r requirements.txt
```
make `.env` file inside `server` to store your Riot API key

**.env**
```
export API_KEY="<YOUR API_KEY>"
```
### Client
```
$ cd ../client
$ npm i
```
## Usage
```
$ ./startup
```
## Built With
* React - front end
* Python - back end
* Material-UI - user interface

## Authors
* Jewon Oh
* Matt Shan
* Edward Atkinson
* Matthew Phelps
