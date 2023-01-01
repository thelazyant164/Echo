import speech_recognition as sr
import sys


def Transcribe(file):
    # file is name of audio (no extension) in file system
    r = sr.Recognizer()
    # f = open(f"server/temp/results/{file}-transcribed.txt", "a").close()
    with sr.AudioFile(f"server/temp/files/{file}.wav") as source:
        # listen for the data (load audio to memory)
        audio_data = r.record(source)
        # recognize (convert from speech to text)
        try:
            text = r.recognize_google(audio_data)
        except:
            text = "No eligible speech detected."
        # f = open(f"server/temp/results/{file}-transcribed.txt", "w")
        # f.write(text)
    # f.close()
    # print(f"server\\temp\\results\\{file}-transcribed.txt")
    print(text)


Transcribe(sys.argv[1])
