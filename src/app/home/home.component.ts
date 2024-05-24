import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ServiceService } from '../service.service';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

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
  form = new UntypedFormGroup({});
  showSuccessMessage = false;
  showErrorMessage = false;

constructor(private service :ServiceService, private fb:UntypedFormBuilder){}

  ngOnInit(): void {
    this.getStatus();
    this.fetchTrafficLightState();
    this.intervalId = setInterval(() => {
      this.fetchTrafficLightState();
      this.getStatus();
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
    this.service.Status().subscribe((res)=>{
      this.status=res.status;
    })

  }

  submit() {
    this.service.Reset(true).subscribe(
      (res) => {
        this.showSuccessMessage = true;
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 3000); 
      },
      (error) => {
        this.showErrorMessage = true;
        setTimeout(() => {
          this.showErrorMessage = false;
        }, 3000);
      }
    );}


}
