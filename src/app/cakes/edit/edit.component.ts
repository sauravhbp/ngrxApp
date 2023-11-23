import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityCollectionServiceFactory,EntityCollectionService } from '@ngrx/data';

import { Cakes } from '../store/cakes';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  cakeService:EntityCollectionService<Cakes>;
  /**
   *
   */
  constructor(serviceFactory: EntityCollectionServiceFactory,private router:Router,private route:ActivatedRoute) {
      this.cakeService = serviceFactory.create<Cakes>('Cake');    
  }
  cakeForm:Cakes={
    id:0,
    desc:"",
    name:"",
    cost:0
  }
  ngOnInit(){
     let fetchFormData$= combineLatest([
      this.route.paramMap,this.cakeService.entities$
    ]).subscribe(([params,cakes])=>{
      var id = Number(params.get('id'));
      var filterCake = cakes.filter((_)=>_.id==id);
      if(filterCake)
        this.cakeForm={...filterCake[0]};
    })
    console.log(this.cakeForm);
  }
  update(){
    console.log(this.cakeForm);
    this.cakeService.update(this.cakeForm).subscribe(()=>{
      this.router.navigate(['/']);
    })
  }
}
