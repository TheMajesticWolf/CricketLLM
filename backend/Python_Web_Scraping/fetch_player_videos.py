import sys
import requests
import bs4
import tabulate
import json
import random
from youtubesearchpython import VideosSearch, VideoSortOrder, CustomSearch

userQuestion = json.loads(sys.stdin.read())["question"] or None


videosSearch = VideosSearch(userQuestion, limit = 15)


to_send = []

for item in videosSearch.result()["result"]:

	try:
		to_send.append({
			"title": item["title"],
			"duration": item["duration"],
			"link": item["link"],
			"thumbnails": item["thumbnails"][0]["url"],
			"embed_link": f'https://youtube.com/embed/{item["link"].split("=")[-1]}'
		})
	except Exception as e:
		pass




sys.stdout.write(json.dumps({"output": to_send[:3], "return_format": "videos_of_player", "question": userQuestion}))