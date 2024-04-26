import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-screen',
  standalone: true,
  imports: [],
  templateUrl: './screen.component.html',
  styleUrl: './screen.component.css',
})
export class ScreenComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.authService.validateToken('/api/auth/validate-token').subscribe({
      next: (data) => {
        if (!data.userId || data.user.logCount === 0) {
          this.router.navigate(['/auth/login']);
        }
        this.dataService.updateUserData(data.user);
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.router.navigate(['/auth/login']);
      },
    });
  }
}
