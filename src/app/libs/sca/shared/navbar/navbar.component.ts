import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/libs/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() mode: string = ''
  @Input() opened: boolean = true

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  @Output() logoutEvent: EventEmitter<any> = new EventEmitter();
  
  isWeb = false;
  username = '';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.observeResizing();
  }

  observeResizing() {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium
      ])
      .subscribe((state: BreakpointState) => {
        this.isWeb = !state.matches
      })
  }

  toggleSidebar() {
    this.opened = !this.opened;
    this.toggleSidebarForMe.emit();
  }

  logout() {
    this.tokenService.remove();
    this.authService.changeAuthStatus(false);
    this.router.navigateByUrl('/auth/login');
  }
}
