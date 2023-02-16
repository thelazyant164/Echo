FROM nikolaik/python-nodejs:python3.10-nodejs16

WORKDIR /server

COPY . .

#stage 1 - node modules
RUN npm install

#stage 2 - python libraries
RUN pip install scipy noisereduce pydub SpeechRecognition

EXPOSE 3001

CMD ["npm", "run", "server"]