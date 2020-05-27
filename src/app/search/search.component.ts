import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { faStar, faCodeBranch, faEye } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  public inputValue = '';
  public inputValueControl = new FormControl();
  public arrRepos = [];
  public icons = {
    star: faStar,
    branch: faCodeBranch,
    eye: faEye
  };

  private unsubscribe$ = new Subject();
  public loading = false;

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.inputValueControl.valueChanges
      .pipe(
        debounceTime(500),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(
        newValue => {
          this.arrRepos = [];
          if (newValue.length > 3) {
            this.loading = true;
            this.inputValue = newValue;
            this.apiService.getRepos(this.inputValue).subscribe(
              (res: any) => {
                this.arrRepos = res.items;
                this.loading = false;
              }
            );
          }
        });
  }

  goToLink(link: string) {
    window.open(link, '_blank');
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
