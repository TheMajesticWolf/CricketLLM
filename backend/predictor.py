import json
import pandas as pd
import numpy as np
import torch
import sys

from sentence_transformers import SentenceTransformer, util

given_question = json.loads(sys.stdin.read())["question"]

chunks_and_embeddings_df = pd.concat([
	pd.read_json("../Dataset/combined_embeddings.json"),
	pd.read_json("../Dataset/combined_embeddings_player_specific.json")
], ignore_index=True)

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
	



from transformers import pipeline, AutoTokenizer, AutoModelForQuestionAnswering


# model_name = "bert-large-uncased-whole-word-masking-finetuned-squad"

# tokenizer = AutoTokenizer.from_pretrained(model_name)
# model = AutoModelForQuestionAnswering.from_pretrained(model_name, low_cpu_mem_usage=True)

# device = "cuda" if torch.cuda.is_available() else "cpu"
# # model.to(device)

# question_answerer = pipeline("question-answering", model=model, tokenizer=tokenizer, device="cuda")

model_name = "deepset/deberta-v3-large-squad2"

tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForQuestionAnswering.from_pretrained(model_name, low_cpu_mem_usage=True).to("cuda")

question_answerer = pipeline('question-answering', model=model, tokenizer=tokenizer, device="cuda")




generated_text = question_answerer(question=given_question, context=response)
# print(generated_text)



if(response == "empty"):

	response = "Sorry, I am currently not trained on the data relavent to your question"




data_to_send = json.dumps({

	"output": generated_text["answer"],
	"question": given_question,
	"return_format": "string"

})

sys.stdout.write(data_to_send)







