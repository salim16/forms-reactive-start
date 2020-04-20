import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 
  genders = ['male', 'female'];
  signUpForm: FormGroup;
  forbiddenUserNames = ['Chris', 'Anna'];

  constructor(){
  }

  // In reactive approach we create the form here in the typescript class
  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      'userData' : new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email, 
                 this.forbiddenEmails])
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });

    // StatusChanges and ValueChanges are two nice Observables you can subscribe to
    this.signUpForm.valueChanges.subscribe(
      (value) => {
        console.log(value);
      }
    )
    this.signUpForm.statusChanges.subscribe(
      (status) => {
        console.log('Status Changes: ' + status);
      }
    )

    // set value sets entire form at once
    this.signUpForm.setValue({
      'userData': {
        'username': 'Salim',
        'email': 'salim@test.com'
      },
      'gender': 'male',
      'hobbies': []
    });
    
    // patch value sets parts of form at once
    this.signUpForm.patchValue({
      'userData': {
        'username': 'Anna'
      },
    });
  }

  onSubmit() {
    console.log(this.signUpForm);
    this.signUpForm.reset();
  }

  onAddHobby() {
    const hobbyControl = new FormControl(null, Validators.required);
    (<FormArray>this.signUpForm.get('hobbies')).push(hobbyControl);
  }

  get controls() {
    return (this.signUpForm.get('hobbies') as FormArray).controls;
  }

  getControls() {
    return (<FormArray>this.signUpForm.get('hobbies')).controls;
  }

  // Custom validator , {[s: string]: boolean} is the output type where [s: string] means any
  // key which can transform into string
  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if(this.forbiddenUserNames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    // It is important to return null, thats the way validators work
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
