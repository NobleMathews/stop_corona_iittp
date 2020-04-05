import flask
from flask import request, Flask, Response, render_template
from predictor_api import make_prediction
from flask import jsonify
import spacy
import requests 
import re

URL="https://openpagerank.com/api/v1.0/getPageRank"
nlp = spacy.load("static/models/en_core_web_sm-2.2.5")

app = flask.Flask(__name__)

def send_domains_to_OPR(domains_to_check):
    headers = {'API-OPR': "wsssc80osc0kgoww0g0gs444oscwg804woscssk4"}
    api_results = []
    sum_i=0
    for items in domains_to_check:
        url = 'https://openpagerank.com/api/v1.0/getPageRank?domains%5B0%5D=' + items
        request = requests.get(url, headers=headers)
        api_results.append(request.json())
    for items in api_results:
        sum_i=items['response'][0]['page_rank_integer']
        # sum_i=sum_i+items.page_rank_integer
    # avg_a=sum_i/len(api_results)
    return sum_i

def hasNumbers(inputString):
    return any(char.isdigit() for char in inputString)

@app.route("/", methods=["POST"])
def print_piped():
    if request.form['mes']:
        msg = request.form['mes']
        x_input, predictions = make_prediction(str(msg))
        score=0
        flask.render_template('predictor.html',
                                chat_in=x_input,
                                score=score,
                                prediction=predictions)
    return jsonify(predictions)

@app.route("/", methods=["GET"])
def predict():

    if(request.args):
        x_input, predictions = make_prediction(request.args['chat_in'])
        doc = nlp(request.args['chat_in']) 
        sub_tok = [tok.text for tok in doc if (tok.dep_=="nsubj" or tok.dep_ == "compound" or tok.dep_ == "dobj" or tok.dep_=="pobj") ]
        sub_tokk = [x for x in sub_tok if isinstance(x, str)] # no integers from this point on
        sub_toks= [x for x in sub_tok if not hasNumbers(x)]
        sub_toks=list( dict.fromkeys(sub_toks) )
        links=[]
        try:
            result=(re.search("(?P<url>https?://[^\s]+)", request.args['chat_in']).group("url"))
            links.append(re.sub(r'(.*://)?([^/?]+).*', '\g<1>\g<2>', result))
            print(links)
        except:
            links=[]
        if len(links)>0:
            score=send_domains_to_OPR(links)
        else:
            score=0
        queri=""
        querf=""
        if len(sub_toks)!=0:
            gurl="https://toolbox.google.com/factcheck/explorer/search/"+str("%20".join(sub_toks))+";hl=en"
            queri="{@keyword@:@"+str(sub_toks[0])+"@,@geo@:@IN@,@time@:@today 12-m@}"
            querf=",".join(sub_toks)
            
            if len(sub_toks)>1:
                for toki in sub_toks[1:]:
                    querii="{@keyword@:@"+toki+"@,@geo@:@IN@,@time@:@today 12-m@}"
                    queri=queri+","+querii

        return flask.render_template('predictor.html',
                                     chat_in=x_input,
                                     results=querf,
                                     url=str(queri),
                                     gurl=gurl,
                                     score=score,
                                     prediction=predictions)
    else: 

        x_input, predictions = make_prediction('')
        score=0
        return flask.render_template('predictor.html',
                                     chat_in=x_input,
                                     score=score,
                                     prediction=predictions)


if __name__=="__main__":
    # For local development:
    app.run(debug=True)
    # For public web serving:
    #app.run(host='0.0.0.0')
    app.run()
