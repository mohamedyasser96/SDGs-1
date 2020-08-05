import { Component, OnInit } from '@angular/core';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  admin = {
    "name":"Admin",
    "email":"admin@admin.com"
  }
  public chartOptions: any = {
    legend: {
      display: true,
      labels: {
        fontSize: 20,
        fontColor: 'black',
      }
    },
    tooltips: {
      bodyFontSize: 20,
    },
    title: {
      display: true,
      text: "SDGs",
      fontSize: 28
    }
  }
  public sdgsChartLabels: string[] = ['Education', ' Gender Equality',"Zero Hunger"];
  public sdgsChartData: number[] = [5, 4, 12];
  public sdgsChartType: string = 'doughnut';
  public sdgsChartColors: any[] = [
    {
      backgroundColor: ['#EC6B56', '#FFC154','#47B39C'],
    },
  ];

  // chart={
  //   "title":"SDGs",
  //   "data":[
  //     ["Giza",5],
  //     ["Alex",10],
  //     ["Alexandria",12]
  //   ],
  //   "type":"GeoChart",
  //   "options":{
  //     "colors": ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
  //      "is3D": true
  //  },
  //  "columnNames": ['Browser', 'Percentage']
  // }
  constructor() { }

  ngOnInit(): void {
    let tokenInfo = jwt_decode(localStorage.getItem('token'));
    this.admin = {
      email: tokenInfo.email,
      name: 'Admin'
    }
  //   // var visualization = new google.visualization.GeoChart(document.getElementById("myChart"));
  //   google.charts.load('current', {
  //     'packages': ['geochart'],
  //     // Note: you will need to get a mapsApiKey for your project.
  //     // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
  //     'mapsApiKey': key
  //   });
  }

}
