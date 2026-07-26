import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ifairs } from 'src/app/models/fair';
import { FairsService } from 'src/app/services/fairs.service';

@Component({
  selector: 'app-fair-details',
  templateUrl: './fair-details.component.html',
  styleUrls: ['./fair-details.component.scss']
})
export class FairDetailsComponent implements OnInit {
fairsObj!:Ifairs
fairId!:string
  constructor(private fairservice:FairsService, private routes:ActivatedRoute) { }

  ngOnInit(): void {
    console.log('snapshot params:', this.routes.snapshot.params);
    this.routes.paramMap.subscribe(res=>{
      this.fairId= res.get('fairsId')!
      if(this.fairId){
        this.fairservice.fetchFairsById(this.fairId).subscribe({
          next:res=>{
            this.fairsObj=res
          },
          error: err=>{
            console.log(err)
          }
        })


      }
    })
  }
}