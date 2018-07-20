#!/usr/local/bin/python3

import requests
import sys

BOT_ID = "8357d94d27da14ccdab39797ec"

def sendMessage(text):
    requestData = {"bot_id": BOT_ID, "text": text}
    r = requests.post("https://api.groupme.com/v3/bots/post", data = requestData)
    print(f"Sent message '{text}' to groupMe channel")

if __name__ == '__main__':
    if len(sys.argv) <= 1:
        print(f"Usage: {sys.argv[0]} TEXT")
        sys.exit(1)
    else:
        text = sys.argv[1]
        sendMessage(text)
