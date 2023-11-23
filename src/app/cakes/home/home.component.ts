import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { EntityCollectionService,EntityCollectionServiceFactory } from '@ngrx/data';
import { Cakes } from '../store/cakes';
import { Observable } from 'rxjs';

declare var window:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  /**
   *
   */
  constructor(serviceFactory:EntityCollectionServiceFactory) {
    this.cakeService = serviceFactory.create<Cakes>('Cake');
    this.allCakes$=this.cakeService.entities$;
  }
  allCakes$:Observable<Cakes[]>;
  cakeService:EntityCollectionService<Cakes>;
  deleteModal:any;
  idToBeDeleted:number=0;

  ngOnInit(){
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('deleteModal')
    )
    this.cakeService.getAll();
  }

  openDeleteModal(id:number){
    this.idToBeDeleted=id;
    this.deleteModal.show();
  }
  confirmDelete(){
    this.cakeService.delete(this.idToBeDeleted).subscribe((data)=>{
      this.deleteModal.hide();
    },(error)=>{console.log("error while deleting")})
  }
}
