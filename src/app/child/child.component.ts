import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { BroadcastService } from '../broadcast.service';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
})
export class ChildComponent implements OnInit, AfterViewInit {
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;

  public userData: Subscription;
  public selectedColor: string = 'theColor';
  public theColor: string = '#2889e9';
  dtOptions: DataTables.Settings = {}; //for DataTables configuration

  // Student list can be huge.
  // for this, we use trigger to make sure the data is pulled before rendering.
  dtTrigger: Subject<any> = new Subject();

  constructor(private broacastservice: BroadcastService) {
    this.userData = this.broacastservice
      .parentEventListner()
      .subscribe((info) => {
        console.log(info[0]); // here you get the message from Parent component
        console.log(info[1]); // here you get the message from Parent component
      });
  }

  onEventLog(event: string, data: any) : void {
    console.log("DATA", data)
    console.log("EVENT", event)
  }

  ngOnInit() {
    this.dtOptions = {
      paging: false,
      info: false,
      dom:'lrt',
      columnDefs: [
        // Center align the header content of column 1
       { className: "dt-head-center", targets: [ 0,1,2 ] }]
       
    };
  }

  ngOnDestroy() {
    //Close the Observable stream
    this.userData.unsubscribe();
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.columns().every(function () {
        const that = this;
        $('input', this.footer()).on('keyup change', function () {
          let thisInput = this as HTMLInputElement;
          if (that.search() !== thisInput.value) {
            that.search(thisInput.value).draw();
          }
        });
      });
    });
  }
}
