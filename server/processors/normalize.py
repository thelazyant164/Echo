from pydub import AudioSegment, effects
import sys
import os


def Normalize(file):
    # file is name of audio (no extension) in file system
    rawsound = AudioSegment.from_file(f"server/temp/files/{file}", "wav")
    normalizedsound = effects.normalize(rawsound)
    normalizedsound.export(
        f"server/temp/results/{file}-normalized.wav", format="wav")
    print(f"server\\temp\\results\\{file}-normalized.wav")


Normalize(sys.argv[1])
