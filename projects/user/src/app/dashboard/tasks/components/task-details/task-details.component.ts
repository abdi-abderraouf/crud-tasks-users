import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
taskId:any
taskDetails:any
  constructor(private route:ActivatedRoute,private service:TasksService) {
    this.route.paramMap.subscribe((res:any)=>{
      this.taskId=res.params['id']
    })
  }

  ngOnInit(): void {
    this.getTaskDetails()
  }

  getTaskDetails(){
    this.service.taskDetails(this.taskId).subscribe((res:any)=>{
       this.taskDetails=res.tasks
    })
 }
}
