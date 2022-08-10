import { Component } from '@angular/core';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'app-process-spinner',
  templateUrl: './process-spinner.component.html',
  styleUrls: ['./process-spinner.component.scss']
})
export class ProcessSpinnerComponent {
  constructor(public loadingService: LoadingService) {
  }
}
