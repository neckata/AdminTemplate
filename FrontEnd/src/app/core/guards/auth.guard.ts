import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {
    }
    canActivate(): boolean {
        var isUserIn = this.authService.isUserIn();
        if (!isUserIn) {
            this.router.navigate(['/landing']);  //If we are not using landing default must be auth
        }
        return isUserIn;
    }
}