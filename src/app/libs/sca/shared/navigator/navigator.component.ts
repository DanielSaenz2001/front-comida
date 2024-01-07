import { Component, Input, OnInit } from '@angular/core';
import { IPermisoChildren } from 'src/app/libs/auth/models/permiso-children.model';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent implements OnInit {
  @Input() menus: IPermisoChildren[] = [];
  @Input() base = "";
  
  constructor() { }

  ngOnInit(): void {
  }

}
