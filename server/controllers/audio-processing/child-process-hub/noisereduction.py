import noisereduce as nr 
from scipy.io import wavfile
import sys
import os 

dir_path = os.path.dirname(os.path.realpath(__file__))
def Noisereduction(fileName):
    rate, audioStream = wavfile.read(dir_path+"/files/"+fileName)
    reduced_noise = nr.reduce_noise(y=audioStream,sr=rate)
    wavfile.write(f"{fileName[0:-4]}-noiseReduced.wav", rate, reduced_noise)
    print(f"{fileName[0:-4]}-noiseReduced.wav")
Noisereduction(sys.argv[1])