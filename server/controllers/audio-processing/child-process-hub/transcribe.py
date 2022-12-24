import speech_recognition as sr
import soundfile
import sys
import os


def Transcribe(file):
    # file is location of audio in file system
    r = sr.Recognizer()
    f = open("server/temp/results/" +
             file[0:-4] + "-transcribed.txt", "a").close()
    with sr.AudioFile("server/temp/files/" + file) as source:
        # listen for the data (load audio to memory)
        audio_data = r.record(source)
        # recognize (convert from speech to text)
        try:
            text = r.recognize_google(audio_data)
        except:
            text = "No eligible speech detected."
        f = open("server/temp/results/" + file[0:-4] + "-transcribed.txt", "w")
        f.write(text)
    f.close()
    print("server\\temp\\results\\" +
          file[0:-4] + "-transcribed.txt")


Transcribe(sys.argv[1])
