import speech_recognition as sr
import soundfile
import sys
import os 


dir_path = os.path.dirname(os.path.realpath(__file__))

def Transcribe(file):
    # file is location of audio in file system
    r = sr.Recognizer()
    f = open(dir_path+"/results/"+file+"-transcribed.txt", "a")
    with sr.AudioFile(dir_path+"/files/"+file) as source:
        # listen for the data (load audio to memory)
        audio_data = r.record(source)
        # recognize (convert from speech to text)
        try:
            text = r.recognize_google(audio_data)
        except:
            text = "No eligible speech detected."
        f.write(text)
    f.close()
    print("server\\controllers\\audio-processing\\child-process-hub\\results\\"+file+"-transcribed.txt")
Transcribe(sys.argv[1])