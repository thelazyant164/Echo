from pydub import AudioSegment, effects  
import sys
import os 


dir_path = os.path.dirname(os.path.realpath(__file__))

def Normalize(file):
    rawsound = AudioSegment.from_file(dir_path+"/files/"+file, "wav")
    normalizedsound = effects.normalize(rawsound)
    normalizedsound.export(dir_path+"/results/"+file+"-normalized.wav", format="wav")
    print("server\\controllers\\audio-processing\\child-process-hub\\results\\"+file+"-normalized.wav")
Normalize(sys.argv[1])

