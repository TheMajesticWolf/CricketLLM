import datetime
import sys
import requests
import bs4
import tabulate
import json
import random


def get_latest_news():

	url = r"https://www.espncricinfo.com/cricket-news"
	soup = bs4.BeautifulSoup(requests.get(url).text, "html.parser")

	news_cards = soup.find_all("div", attrs={"class": "ds-border-b ds-border-line ds-p-4"})

	to_return = []

	for news_card in news_cards:

		tmp = {}


		

		title = news_card.find("h2", attrs={"class": "ds-text-title-s ds-font-bold ds-text-typo"}).get_text()
		desc = news_card.find("p", attrs={"class": "ds-text-compact-s ds-text-typo-mid2 ds-mt-1"}).get_text()
		link = f'https://www.espncricinfo.com/cricket-news{news_card.find("a")["href"]}'

		tmp["title"] = title
		tmp["desc"] = desc
		tmp["link"] = link
		
		
		
		
		to_return.append(tmp)

	return to_return


to_send = get_latest_news()
curr_time = datetime.datetime.now().strftime("%H:%M, %d-%b-%Y")

sys.stdout.write(json.dumps({"output": to_send, "return_format": "news", "question": f"Latest news (Last updated on {curr_time})"}))

