import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, JsonPipe } from '@angular/common';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { Trip } from '../../models/trip';
import { TripDataService } from '../../services/trip-data.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  providers: [TripDataService],
  selector: 'app-trip-listing',
  standalone: true,
  imports: [JsonPipe, CurrencyPipe, CommonModule, TripCardComponent],
  templateUrl: './trip-listing.component.html',
  styleUrl: './trip-listing.component.css'
})
export class TripListingComponent implements OnInit {
  trips!: Trip[];
  message: string = ""
  constructor(
    private tripDataService: TripDataService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { console.log('trip-listing constructor'); }

  public isLoggedIn() {
    return this.authenticationService.isLoggedIn();
  }
  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }
  private getTrips(): void {
    this.tripDataService.getTrips().subscribe({
      next: (value: Array<Trip>) => {
        this.trips = value
        if (value.length > 0) {
          this.message = 'There are ' + value.length + ' trips in our database!';
        }
        else {
          this.message = 'There were no trips retireved from the database';
        }
        console.log(this.message);
      },
      error: (error: any) => {
        console.log('Error: ' + error);
      }
    })
  }
  ngOnInit(): void {
    console.log("ngOnInit");
    this.getTrips();
  }
}
