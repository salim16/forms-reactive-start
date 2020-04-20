import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 
  genders = ['male', 'female'];
  signUpForm: FormGroup;

  // In reactive approach we create the form here in the typescript class
  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      'userData' : new FormGroup({
        'username': new FormControl(null, Validators.required),
        'email': new FormControl(null, [Validators.required, Validators.email])
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
  }

  onSubmit() {
    console.log(this.signUpForm);
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
}
