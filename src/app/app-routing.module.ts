import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VoiceComponent } from './voice/voice.component';


const routes: Routes = [
  {path:"voice", component:VoiceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
