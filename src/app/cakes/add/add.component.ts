import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EntityCollectionServiceFactory, EntityCollectionService } from '@ngrx/data';
import { Cakes } from '../store/cakes';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  /**
   *
   */
  constructor( serviceFactory:EntityCollectionServiceFactory, private router:Router ) {
      this.cakeService = serviceFactory.create<Cakes>('Cake');
  }
  cakeService:EntityCollectionService<Cakes>;

  cakeForm:Cakes={
    id:0,
    desc:'',
    name:'',
    cost:0
  }
  ngOnInit(): void {
    
  }
  save(){
    this.cakeService.add(this.cakeForm).subscribe(()=>{
      this.router.navigate(['/'])
    })
  }
}
