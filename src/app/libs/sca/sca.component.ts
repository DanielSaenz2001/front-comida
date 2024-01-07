import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { IPermisoChildren } from '../auth/models/permiso-children.model';
import { IPermiso } from '../auth/models/permiso.model';

@Component({
  selector: 'app-sca',
  template: `
  <mat-drawer-container autosize="true">
    <mat-drawer #drawer
      (openedStart)="openSideBar()" 
      (closedStart)="closeSideBar()" 
      [mode]="sideNavMode" 
      [opened]="sideBarOpen">
      <app-navigator [base]="base" [menus]="menus"></app-navigator>
    </mat-drawer>

    <mat-drawer-content>
      <div class="header">
        <app-navbar 
          (toggleSidebarForMe)="sideBarToggler()"
          [mode]="sideNavMode" 
          [opened]="sideBarOpen">
        </app-navbar>
      </div>
      <div class="content">
        <div class="margin-content">
          <router-outlet></router-outlet>
        </div>
      </div>
      <div class="footer">
        <app-footer></app-footer>
      </div>
    </mat-drawer-content>
  </mat-drawer-container>
`,
  styleUrls: ['./sca.component.scss']
})
export class ScaComponent implements OnInit {
  title = 'Comida Regional';
  sideBarOpen = true;
  sideBarActionForMe = true;
  sideNavMode: MatDrawerMode = 'side';
  subscriptions = new Array<Subscription>();

  portal = "";
  base = "/modulo";
  menus = new Array<IPermisoChildren>();
  
  constructor(
    public breakpointObserver: BreakpointObserver,
    private router: Router,
    private tokenService: TokenService,
  ){}

  ngOnInit(): void {
    this.observeResizing();
    this.getModules();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  observeResizing() {
    let subscriptionBreakpoint = this.breakpointObserver.observe(
      [Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium]
    )
      .subscribe((state: BreakpointState) => {
        this.sideNavMode = state.matches ? 'over' : 'side';
        this.sideBarOpen = !state.matches && this.sideBarActionForMe;
      });
    this.subscriptions.push(subscriptionBreakpoint);
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
    this.sideBarActionForMe = this.sideBarOpen;
  }

  openSideBar() {
    this.sideBarOpen = true;
  }

  closeSideBar() {
    this.sideBarOpen = false;
  }

  private getModules() {
    
    var modules: any = this.tokenService.getModulos()

    var modulos = JSON.parse(modules);

    let href = this.router.url;
    
    modulos.forEach((element: IPermiso) => {
      if(element.link == "/seguridad" &&  href.includes(element.link)){
        this.portal = "Seguridad";
        this.menus = element.children;
      }
      if(element.link == "/logistica" &&  href.includes(element.link)){
        this.portal = "Logistica";
        this.menus = element.children;
      }
    });
  }
}
