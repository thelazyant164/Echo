from pydub import AudioSegment, effects
import sys
import os


def Normalize(file):
    rawsound = AudioSegment.from_file("server/temp/files/"+file, "wav")
    normalizedsound = effects.normalize(rawsound)
    normalizedsound.export("server/temp/results/"+file +
                           "-normalized.wav", format="wav")
    print("server\\temp\\results\\" +
          file+"-normalized.wav")


Normalize(sys.argv[1])
