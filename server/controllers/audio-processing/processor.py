from scipy.io import wavfile
import soundfile
import noisereduce as nr 
import speech_recognition as sr
from pydub import AudioSegment, effects  
from pydub.silence import split_on_silence

def Noisereduction(file):
    data,rate=soundfile.read(file)
    reduced_noise=nr.reduce_noise(y=data,sr=rate)
    wavfile.write("resultfile/output.wav", rate, reduced_noise)

def Textconvert(file):
    r = sr.Recognizer()
    with sr.AudioFile(file) as source:
        # listen for the data (load audio to memory)
        audio_data = r.record(source)
        # recognize (convert from speech to text)
        text = r.recognize_google(audio_data)
        return text

def Normalize(file):
    rawsound = AudioSegment.from_file("./input.m4a", "m4a")  
    normalizedsound = effects.normalize(rawsound)  
    normalizedsound.export("./output.wav", format="wav")

def Silence(file):
    file_path = "./audio/alices-adventures-in-wonderland-001-chapter-i-down-the-rabbit-hole.1.mp3"
    file_name = file_path.split('/')[-1]
    audio_format = "mp3"

    # Reading and splitting the audio file into chunks
    sound = AudioSegment.from_file(file_path, format = audio_format) 
    audio_chunks = split_on_silence(sound, min_silence_len = 100, silence_thresh = -45, keep_silence = 50)
    # Putting the file back together
    combined = AudioSegment.empty()
    for chunk in audio_chunks:
        combined += chunk
    combined.export(f'./output/{file_name}', format = audio_format)