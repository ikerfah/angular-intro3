import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { MovieService } from 'src/app/services/movie/movie.service';
import { error } from 'protractor';
import { Movie } from 'src/app/model/movie';
import { finalize, delay } from 'rxjs/operators';




@Component({
  selector: 'app-exercice1',
  templateUrl: './exercice1.component.html',
  styleUrls: ['./exercice1.component.scss']
})
export class Exercice1Component implements OnInit {


  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  

  constructor(private $ser: MovieService) { }


  movies: Array<Movie> = [];
  isLoading = false;
  isError = false;
  page = 1;
  click() {

    this.loadData();
  }

  loadData() {
    const observable = this.$ser.GetData(this.page).pipe(
      finalize(() => this.isLoading = false)
    );

    observable.subscribe(
      apiResponse => {
        console.log("======");
        console.log(apiResponse.results);
        console.log("======");
        this.movies = this.movies.concat(apiResponse.results);
        console.log(this.movies);

      }
      ,

      err => {
        this.isError = true;
        alert('error');
        console.log(err);
      }
    );
  }
  ngOnInit() {

  }
}


