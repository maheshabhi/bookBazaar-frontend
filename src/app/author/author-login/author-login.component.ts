import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Author } from "../author";
import { AuthorService } from '../author.servcie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-author-login',
  templateUrl: './author-login.component.html',
  styleUrls: ['./author-login.component.scss']
})
export class AuthorLoginComponent implements OnInit {

    signupForm: FormGroup;
    loginForm: FormGroup;
    signup: boolean = false;
    login: boolean = true;

    constructor(private _fb: FormBuilder, 
                private _router: Router,
                private _authorService: AuthorService ) {
        this.signupForm = this._fb.group({
            unique_id: [''],
            authorName: ['', Validators.required], 
            email: ['', Validators.required], 
            password: ['',Validators.required], 
            passwordConf: ['', Validators.required],
        });

        this.loginForm = this._fb.group({
            email: ['', [Validators.required, Validators.email]], 
            password: ['',Validators.required]
        });
    }

    ngOnInit() {
    }

    onSubmit() {
        console.log("data", this.signupForm.value);
        let formData = this.signupForm.value;
        this._authorService.authorRegister(formData).subscribe( 
            data => {
                console.log("data",data);
                this.signupForm.reset();
                this._router.navigate(['book/addBook']);
            }, error => {
                console.log("Error occured while registering an author", error);
                
            }
        )
    }

    onRegister() {
        this.signup = !this.signup;
        this.login = !this.login;
    }

    onLogin() {
        this.signup = !this.signup;
        this.login = !this.login;
    }
}
