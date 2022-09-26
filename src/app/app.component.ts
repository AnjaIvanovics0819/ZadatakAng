import { keyframes } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Validator } from '@angular/forms';
import {EmployeeService} from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'rareCrew';
  employees:any=[];
  chart:any;

  chartOptions = {
    animationEnabled: true,
    title: {
    text: "The total time worked"
    },
    data: [{
      type: "pie",
      startAngle: -90,
      indexLabel: "{name}: {y}",
      yValueFormatString: "#,###.##'%'",
      dataPoints:[{name:"Pera",y:100, },{name:"Zika",y:60, }] //this.employees
    }]
  }	

  constructor(private employeeData:EmployeeService){
    employeeData.employees().subscribe((data)=>{
      console.warn("data", data);
      this.employees=this.parseData(data)
      this.chart.render();
    });
  }

  getHoursDiff(startDate:any, endDate:any):any {
    
    const msInHour = 1000 * 60 * 60;
  
    return Math.round(Math.abs(endDate - startDate) / msInHour);
  }

  getChartInstance(chart: object) {
		this.chart = chart;
	}

  parseData(arr:any) {
    let grouped:any = {};

    arr.forEach( (a:any) => {
        let hours = this.getHoursDiff(new Date(a.StarTimeUtc), new Date(a.EndTimeUtc));
        let name = a.EmployeeName;
        if (!name) {
          name="Unknown";
        }
        grouped[name] = grouped[name] || [];
        grouped[name].push(hours);
    });

    const finalArray = Object.keys(grouped).map( (name:any) => {
      const hoursArr = grouped[name];
      const hoursNum = hoursArr.reduce((a:any,b:any)=>a+b,0)
      return {name:name,y:hoursNum}
    });
    
    return finalArray.sort((a, b) => b.y - a.y);
  }

  

  



  
}





