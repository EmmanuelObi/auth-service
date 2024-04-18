import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-check-email',
  templateUrl: './check-email.component.html',
  styleUrl: './check-email.component.css',
})
export class CheckEmailComponent {
  constructor(private route: ActivatedRoute) {}

  userEmail: string | null | undefined;

  ngOnInit() {
    this.userEmail = this.route.snapshot.paramMap.get('mail');
  }
}
