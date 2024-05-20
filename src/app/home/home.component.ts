import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit,OnDestroy{
  lights:any;
  private intervalId: any;
  private subscription: Subscription = new Subscription();
  status: any;

constructor(private service :ServiceService){}

  ngOnInit(): void {
    this.fetchTrafficLightState();
    this.intervalId = setInterval(() => {
      this.fetchTrafficLightState();
    }, 1000);
  }

  fetchTrafficLightState(): void {
    this.subscription.add(
      this.service.getSignals().subscribe(response => {
        this.lights = response;
      })
    );
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.subscription.unsubscribe();
  }


  getStatus(){
    this.service.getSignals().subscribe((res)=>{
      this.status=res.status;
    })

  }
}
