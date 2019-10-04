import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/person.model';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, FormsModule, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { MatSnackBar } from '@angular/material';


export interface Building {
  name: string;
}

export interface Data {
  firstName: string;
  lastName: string;
  gender: string;
}

@Component({
  selector: 'app-first-task',
  templateUrl: './first-task.component.html',
  styleUrls: ['./first-task.component.css']
})

export class FirstTaskComponent implements OnInit {
  autoTicks = false;
  disabled = false;
  invert = false;
  max = 100;
  min = 0;
  showTicks = true;
  step = 1;
  thumbLabel = true;
  value = 0;
  vertical = false;


  profile: FormGroup;
  showData: boolean = false;;


  myControl = new FormControl();
  options: Building[] = [
    { name: 'Ruosh' },
    { name: 'Pasta' },
    { name: 'Main Building' },
    { name: 'SVC' }
  ];

  userData: Data = { firstName: '', lastName: '', gender: '' };

  filteredOptions: Observable<Building[]>;

  constructor(private snack: MatSnackBar, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );


    this.profile = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      slider: ['', Validators.required]

    });
  }

  displayFn(user?: Building): string | undefined {
    return user ? user.name : undefined;
  }

  private _filter(name: string): Building[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
  }
  set tickInterval(value) {
    this._tickInterval = coerceNumberProperty(value);
  }
  private _tickInterval = 1;

  submitData(form) {
    this.snack.open('Submitted', 'X', {
      duration: 4000,
      verticalPosition: 'top',
      panelClass: ['warning'],
    });

    this.showData = true;

    

    console.log(this.userData);


  }

}
