import { Component, OnInit } from '@angular/core';
import { HousingService } from 'src/app/services/housing.service';
import { IProperty } from '../Iproperty.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
})
export class PropertyListComponent implements OnInit{
  Properties: Array <IProperty> = [];
  SellRent = 1;
  constructor(private housingService : HousingService , private route : ActivatedRoute){}
  ngOnInit():void {

    if(this.route.snapshot.url.toString()){
      this.SellRent = 2;
    }

     this.housingService.getAllProperties(this.SellRent).subscribe(
        data => {
          this.Properties = data
        } ,
        error=>{
          console.log(error);
        }
     )
  }
}
