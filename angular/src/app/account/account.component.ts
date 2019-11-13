import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../services/dataservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  accountData: object;

  constructor(private dataService: DataserviceService, private router: Router) { }

  ngOnInit() {
    this.dataService.account().subscribe(
      data => {
        this.accountData = data;
      }
    )
  }

  logout(){
    this.dataService.logout().subscribe(
      data => {
        if (data.status === 'ok'){
          this.router.navigateByUrl('');
        }
      }
    );
  }

}
