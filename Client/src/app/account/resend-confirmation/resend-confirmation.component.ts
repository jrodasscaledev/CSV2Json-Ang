import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-resend-confirmation',
  templateUrl: './resend-confirmation.component.html',
  styleUrls: ['./resend-confirmation.component.scss']
})
export class ResendConfirmationComponent implements OnInit {

  form: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email])
  });
  
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async resendEmail() {
    if (this.form.valid) {
      try {
        await this.authService.sendConfirmationEmail(this.form.value.email);
      }
      catch (error: any){
        //ignore errors
      }
      finally {
        this.router.navigateByUrl("/account/verify");
      }
    }
    else {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control?.markAllAsTouched();
        control?.updateValueAndValidity();
      });
    }
  }

  fieldHasError(field: string, error: string) {
    return ((this.form.get(field)?.touched || this.form.get(field)?.dirty) && this.form.get(field)?.errors?.[error]);
  }

}
