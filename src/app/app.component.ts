import { Component } from '@angular/core';
import { RouterLink , RouterOutlet } from '@angular/router';
import { MessageService } from './message.service';

@Component ({
  selector: 'app-root' ,
  standalone: true ,
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './app.component.html' ,
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = ' myFrontend_v1 ';
  message: { text: string; type: string } | null = null;
  
  constructor ( private messageService: MessageService ) {}
  
  ngOnInit () : void {
    this.messageService.currentMessage$.subscribe((msg)=>{
      this.message = msg;
      setTimeout (()=>{this.message = null; } , 5000) ;
    }) ;
  }
}