import { Component, OnInit, ViewChild,ElementRef, Output, EventEmitter} from '@angular/core';
import { ChartDataset,  ChartType,  Color, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { RfidLocation } from 'src/app/model/rfidLocation';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { Period } from 'src/app/model/period';
import { ChartData } from 'src/app/model/chart-data';
import { Tag } from 'src/app/model/tag';
import { fromEvent,Subscription } from 'rxjs';

@Component({
  selector: 'app-rtreport',
  templateUrl: './rtreport.component.html',
  styleUrls: ['./rtreport.component.css']
})
export class RtreportComponent implements OnInit {

  @Output() backClick = new EventEmitter();
  status: string;
  @ViewChild('canvas') canvas: ElementRef;
  public ctx: CanvasRenderingContext2D;
  drawingSubscription: Subscription;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  startDate: Date = new Date();
  endDate: Date = new Date();
  label: string = "Current Data";
  label2: string = "Previous Period";
  periods: Period[] = [{name: 'Today', period:0},{name:'Yesterday', period:1},{name:'Last 7 days', period:7},
                       {name:'Last 28 days', period:28}, {name:'Last 90 days', period:90},{name:'Custom...', period:-1}];
  public locations: RfidLocation[] = [];
  allLocation : RfidLocation = {name:'All locations',id: '', parentId: null, groupId: null};
  location: RfidLocation;
  activeNumber: number = 2;
  period: Period = this.periods[2];
  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getLocations().subscribe(
      responseData => {
        this.locations =  <any> responseData.body;
        this.locations.unshift(this.allLocation);
        this.location = this.locations[0];
        this.getChartData();
      },
      error => {
        this.status = error.message;
      })
  }

  public lineChartLabels: string[] = [];
  public lineChartData: ChartDataset[] = [];


  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: {
        display: true,
        position: 'right',
        ticks: {
          precision: 0
        }
      }}

  };

  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  getChartData()
  {
    this.dashboardService.getChartData(this.period.period).subscribe(
      responseData => {
        let chartData: ChartData =  <any> responseData.body;
        this.fillData(chartData);
      })
  }
  fillData(chartData: ChartData)
  {
    this.lineChartData = [
      {data: chartData.periodData,backgroundColor: ["gray", "gray", "blue"],
      borderColor: '#aaa',
      label: this.label},
      {data: chartData.previousData,backgroundColor: ["gray", "blue", "blue"],
      borderColor: '#ccc',
      borderDash: [10,5],
      label: this.label2}]
      ;
    this.lineChartLabels = chartData.labels;
    this.drawTags(chartData.periodTags, chartData.previousTags, this.location.image);

  }
  showReport()
  {
    this.getChartData();
  }
  showLocationReport()
  {
    this.dashboardService.getLocationChartData(this.period.period,this.location.id).subscribe(
      responseData => {
        let chartData: ChartData =  <any> responseData.body;
        this.fillData(chartData);
      })
  }
  refresh()
  {
    if (this.location.id.length > 1)
      this.showLocationReport()
    else
      this.showReport();
  }
  drawTags(periodTags: Tag[], previousTags: Tag[], base64?: string)
  {
      // get the context
      if (base64 != null)
      {
        const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
        this.ctx = this.canvas.nativeElement.getContext('2d');

        let image : any = new Image();
        image.src = base64;
        image.onload = () => {
          canvasEl.width = image.width;
          canvasEl.height = image.height;
          this.ctx.drawImage(image, 0, 0);
          if (periodTags != null)
            this.drawDeployedTags(periodTags,'blue');
          if (previousTags != null)
            this.drawDeployedTags(previousTags,'red');
      }
    }
  }
  drawDeployedTags(tags: Tag[], color: string)
    {
        const circle = new Path2D();
        for (var i = 0; i < tags.length; i++)
        {
           if(tags[i].x && tags[i].y)
           {
              let x = tags[i].x!;
              let y = tags[i].y!;
              this.ctx.beginPath();
              this.ctx.arc(x, y, 5, 0, 2 * Math.PI);
              this.ctx.fillStyle = color;
              this.ctx.fill();
            }
        }
    }
    backHome(): void {
      this.backClick.emit();
    }
}
