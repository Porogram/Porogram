#!/usr/bin/env python3

import requests
import sys

BOT_ID = "8357d94d27da14ccdab39797ec"

def sendMessage(text):
    go = input(f"Are you sure you want to send the message? {text}\n")
    if go == 'y':
        requestData = {"bot_id": BOT_ID, "text": text}
        r = requests.post("https://api.groupme.com/v3/bots/post", data = requestData)
        print(r)
    else:
        print("Did not send message")

if __name__ == '__main__':
    if len(sys.argv) <= 1:
        print(f"Usage: {sys.argv[0]} TEXT")
        sys.exit(1)
    else:
        text = sys.argv[1]
        sendMessage(text)
