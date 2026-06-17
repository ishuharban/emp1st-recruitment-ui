import { Component, OnInit, Inject, OnDestroy, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, RouterOutlet } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { auditTime, filter, Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Recruitment';
  isLoggedIn = false;
  private routerSub!: Subscription;

  constructor(private router: Router) {
    this.checkLoginStatus(this.router.url);
  }

  ngOnInit() {
    this.routerSub = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.checkLoginStatus(event.urlAfterRedirects || event.url);
    });
  }

  checkLoginStatus(url: string) {
    if (url === '/login' || url === '/') {
      this.isLoggedIn = false;
    } else {
      this.isLoggedIn = true;
    }
  }

  ngOnDestroy() {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }
}
