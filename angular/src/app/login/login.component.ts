import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../services/dataservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private dataService: DataserviceService, private router: Router) { }

  login(){
    this.dataService.login(this.email, this.password).subscribe(
      data => {
        if (data.status === 'ok'){
          console.log('login successful');
          this.router.navigateByUrl('/profile');
        }
      }
    )
  }

  register(){
    this.router.navigateByUrl('/register');
  }

  ngOnInit() {
  }

}
