import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../services/dataservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string;
  password: string;
  email: string;


  constructor( private dataService: DataserviceService, private router: Router) { }

  ngOnInit() {
  }

  register(){
    this.dataService.register(this.email, this.password, this.username).subscribe(
      data => {
        if (data.status === 'ok')
          this.dataService.login(this.email, this.password).subscribe(
            data => {
              if (data.status === 'ok'){
                this.router.navigateByUrl('/profile');
              }
            }
          )
      }
    )
  }

}
