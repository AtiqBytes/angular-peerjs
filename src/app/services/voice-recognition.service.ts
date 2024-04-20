import { Injectable } from '@angular/core';


declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class VoiceRecognitionService {

 recognition =  new webkitSpeechRecognition();
  isStoppedSpeechRecog = false;
  public text = '';
  tempWords;

  constructor() { }

  init() {

    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.addEventListener('result', (e) => {
      const transcript = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');
      this.tempWords = transcript;
      // console.log(transcript);
    });
  }

  start() {
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    console.log("Speech recognition started")

    let silenceTimer;
    this.recognition.addEventListener('soundend', () => {
      clearTimeout(silenceTimer);
      silenceTimer = setTimeout(() => {
        this.stop();
      }, 5000);
    });

    this.recognition.addEventListener('end', (condition) => {
      if (this.isStoppedSpeechRecog) {
        if (this.text.split(' ').length >= 10) {
          this.sendTextToBackend();
          this.recognition.stop();
          console.log("1. End speech recognition.");
        };
      } else {
        this.wordConcat()
      }
    });
  }
  stop() {
    if (this.text.split(' ').length >= 10) {
    this.isStoppedSpeechRecog = true;
    this.wordConcat()
    this.recognition.stop();
    console.log("2. End speech recognition.")
      this.sendTextToBackend();
    }
  }

  wordConcat() {
    this.text = this.text + ' ' + this.tempWords + '.';
    console.log(this.tempWords);
    this.tempWords = '';
  }

  sendTextToBackend() {
    // Implement your logic to send the 'text' variable to the backend API here
    console.log("Sending text to backend API:", this.text);
    this.text = ''; // Reset the 'text' variable after sending to the API
    this.start();

  }
}
