import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  constructor(private messageService: MessageService) {}

  notifySuccess(message: string) {
    this.messageService.clear();
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }

  notifyError(message: string) {
    this.messageService.clear();

    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }
}
