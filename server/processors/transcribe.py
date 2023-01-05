import speech_recognition as sr
import sys
import os


def Transcribe(file):
    # file is name of audio (no extension) in file system
    r = sr.Recognizer()
    f = open(f"server/temp/results/{file}-transcribed.txt", "a").close()
    with sr.AudioFile(f"server/temp/files/{file}.wav") as source:
        # listen for the data (load audio to memory)
        audio_data = r.record(source)
        # recognize (convert from speech to text)
        try:
            sys.stdout = open(os.devnull, "w")
            text = r.recognize_google(audio_data)
        except:
            text = "No eligible speech detected."
    sys.stdout = sys.__stdout__
    f = open(f"server/temp/results/{file}-transcribed.txt", "w")
    f.write(text)
    f.close()
    print(f"server\\temp\\results\\{file}-transcribed.txt")


Transcribe(sys.argv[1])
