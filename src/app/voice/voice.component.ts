
import { VoiceRecognitionService } from "../services/voice-recognition.service";
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-voice',
  templateUrl: './voice.component.html',
  styleUrls: ['./voice.component.scss'],
  providers: [VoiceRecognitionService]
})
export class VoiceComponent implements OnInit {

  text: string;

  constructor(
    public service : VoiceRecognitionService
  ) { 
    this.service.init()
   }

  ngOnInit(): void {
  }

  startService(){
    this.service.start()
  }

  stopService(){
    this.service.stop()
  }

}
