import { Component, OnInit } from '@angular/core';
import { EntityService } from 'src/app/services/entity.service';
import * as jwt_decode from "jwt-decode";


@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.css']
})
export class EntitiesComponent implements OnInit {

  entities: any;
  admin: any;

  constructor(
    private entityService: EntityService
  ) { }

  async ngOnInit() {
    this.entities = await this.entityService.getEntities();
    let tokenInfo = jwt_decode(localStorage.getItem('token'));
    this.admin = {
      email: tokenInfo.email,
      name: 'Admin'
    }
  }
}
