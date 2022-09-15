import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html'
})

export class LoginPageComponent implements OnInit {

    constructor(private toastr: ToastrService, private router: Router) { }

    signin: FormGroup = new FormGroup({
        Username: new FormControl('', [Validators.required]),
        Password: new FormControl('', [Validators.required, Validators.min(3)])
    });
    hide = true;
    get UsernameInput() { return this.signin.get('Username'); }
    get PasswordInput() { return this.signin.get('Password'); }

    ngOnInit(): void { }

    Login() {
        if (!this.signin.valid) return;
        const usernameValue = this.UsernameInput.value;
        const passwordValue = this.PasswordInput.value;

        const usernameValid = "UserName";
        const passwordValid = "P@ssw0rd123";
        console.log(this.signin);
        console.log(usernameValue);
        console.log(passwordValue);

        const ErrLoginMsg = "Login Failed!";
        if (usernameValue != usernameValid) {
            this.toastr.warning(ErrLoginMsg);
            return;
        }
        if (passwordValue != passwordValid) {
            this.toastr.warning(ErrLoginMsg);
            return;
        }

        this.router.navigate(["dashboard"]);
    }
}