import noisereduce as nr
from scipy.io import wavfile
import sys


def Noisereduction(file):
    # file is name of audio (no extension) in file system
    rate, audioStream = wavfile.read(f"server/temp/files/{file}.wav")
    reduced_noise = nr.reduce_noise(y=audioStream, sr=rate)
    wavfile.write(
        f"server/temp/results/{file}-noiseReduced.wav", rate, reduced_noise)
    print(f"server/temp/results/{file}-noiseReduced.wav")


Noisereduction(sys.argv[1])
