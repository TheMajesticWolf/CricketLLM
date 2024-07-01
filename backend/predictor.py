import json
import pandas as pd
import numpy as np
import torch
import sys

from sentence_transformers import SentenceTransformer, util


chunks_and_embeddings_df = pd.read_json("/home/aditya/Desktop/Aditya/cricket-llm/venv/combined_embeddings.json")

embeddings = np.array(chunks_and_embeddings_df["embedding"].to_list())

embeddings = torch.tensor(embeddings,  dtype=torch.float32)

embeddings.shape



embedding_model = SentenceTransformer("all-MiniLM-L6-v2")
# embedding_model = SentenceTransformer("all-mpnet-base-v2")

query = given_question

query_embedding = torch.tensor(embedding_model.encode(query))

dot_scores = util.dot_score(a=query_embedding, b=embeddings)



query_embedding.dtype
embeddings.dtype

top_results = torch.topk(dot_scores, k=5)

top_results

relavant = chunks_and_embeddings_df.iloc[top_results.indices.tolist()[0]]["chunk"].tolist()


response = ""

for answer in relavant:
	answer = answer.replace("Answer:", "").strip()
	response += answer + "\n\n"
	



if(response == "empty"):

	response = "Sorry, I am currently not trained on the data relavent to your question"




data_to_send = json.dumps({

	"output": response,
	"question": given_question,
	"return_format": "string"

})

sys.stdout.write(data_to_send)







