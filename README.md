# Cricket LLM

Cricket LLM is a web application powered by an LLM model with Retrival Augmented Generation (RAG) that provides various functionalities related to cricket information retrieval and analysis.

## Dataset
- A custom JSON dataset was created by extracting data related to cricket from the wikidump <https://dumps.wikimedia.org/enwiki/latest/enwiki-latest-pages-articles-multistream.xml.bz2> along with web scraping various cricket related websites.
- The dataset consists of an array of objects where each object has the keys "context", "embedding", "title", "text" among others.
- The size of the dataset is around 153MB.

## Creating the embeddings
- There are around 15000 embeddings (vectors) each of shape (384, ) along with the corrosponding contexts. The embeddings were created using the all-MiniLM-L6-v2 embedding model from the sentence-transformers library in python.
- The embeddings were locally generated on a machine running Arch Linux (btw), utilizing the NVIDIA GTX 1050 (4GB VRAM Notebook variant) with a batch size of 384.
- To view the dataset in a good format, try loading it into a pandas dataframe

## Features

- **Question Answering**: Ask the model cricket-related questions and get accurate answers.
- **Player Profile**: Retrieve detailed profiles of cricket players.
- **Points Tables**: View and analyze points tables for various cricket tournaments.
- **Latest News**: Stay updated with the latest cricket news.
- **Chat Room**: Connect and talk with like minded cricket fans.

## Usage

### Question Answering

To ask the model questions and get answers:

1. Navigate to the question answering section.
2. Enter your cricket-related question.
3. Receive an accurate answer based on the model's analysis.

### Player Profile

To retrieve player profiles:

1. Go to the player profile section.
2. Select the name of the player whose profile you want.
3. View comprehensive details about the player's career statistics and achievements.

### Points Tables

To access points tables:

1. Visit the points tables section.
2. Select the tournament for which you want to view the points table.
3. Analyze the standings and statistics of teams in the tournament.

### Latest News

To stay updated with cricket news:

1. Check out the latest news section.
2. Browse through the most recent articles and updates in the world of cricket.

### Chat Room

To talk anonymously with other like minded people and cricket fans:

1. Check out the chat room feature.
2. Chat with everyone globally or inside specific rooms.

### Running the project locally
1. ```git clone https://github.com/TheMajesticWolf/CricketLLM.git```
2. ```cd backend```
3. ```echo -e "MONGO_URI={Your MongoDB URI}\nACCESS_TOKEN_SECRET={random string}\nREFRESH_TOKEN_SECRET={random string}" > .env```
4. ```npm i```
5. ```npm start```
6. ```cd ../frontend```
7. ```npm i```
8. ```npm start```


