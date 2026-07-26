import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ifairs } from 'src/app/models/fair';
import { FairsService } from 'src/app/services/fairs.service';

@Component({
  selector: 'app-fairs',
  templateUrl: './fairs.component.html',
  styleUrls: ['./fairs.component.scss']
})
export class FairsComponent implements OnInit {
  fairsArr: Ifairs[] = []
  constructor(private fairservice: FairsService, private routes: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getFairs()
  }
  getFairs() {
    this.fairservice.fetchfairs().subscribe({
      next: res => {
        this.fairsArr = res;
        if (this.fairsArr.length > 0 && !this.routes.firstChild) {
          this.router.navigate(
            [this.fairsArr[0].fairId],
            {
              relativeTo: this.routes
            }
          );
        }
      },
      error: err => {
        console.log(err)
      }
    })

  }

}

