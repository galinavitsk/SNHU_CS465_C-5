import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TripListingComponent } from './components/trip-listing/trip-listing.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterOutlet, TripListingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Travlr Getaways Admin';
}
