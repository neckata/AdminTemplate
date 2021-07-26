import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { UserFullInfo } from '../../data/schema/user';
import { UserService } from '../../data/service/user.service';
import { FormType } from '../../shared/enums/form-types.enum';
import { Role } from '../../shared/enums/role.enums';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
    profileForm = new FormGroup({
        role: new FormControl(''),
        userName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
        email: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
        firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
        adress: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]),
        city: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
        country: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
        code: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
        info: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(150)])
    });

    formTypes = FormType;
    roleTypes = Role;
    image: string;
    fileToUpload: File;

    constructor(public userService: UserService, public authService: AuthService) {
    }

    ngOnInit(): void {
        this.userService.getUser(this.authService.currentUser.user.id).subscribe(user => {
            //TODO image from backend
            this.image = "./assets/img/faces/user.png";
            this.profileForm.patchValue({
                role: this.authService.currentUser.user.roles[0],
                userName: this.authService.currentUser.user.userName,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                adress: user.adress,
                city: user.city,
                country: user.country,
                code: user.code,
                info: user.info
            });
        });
    }

    onSubmit(): void {
        var updateUser = new UserFullInfo();
        updateUser.id = this.authService.currentUser.user.id;

        Object.keys(this.profileForm.controls).forEach(key => {
            updateUser[key] = this.profileForm.controls[key].value;
        });

        //TODO better way for uploading image
        var formData = new FormData();
        formData.append('file', this.fileToUpload, this.fileToUpload.name);
        this.userService.uploadImage(formData).subscribe();

        this.userService.updateUser(updateUser).subscribe();
    }
  
    onFileChange(fileInput: any) {
        this.image = fileInput.target.files[0];

        this.fileToUpload = <File>fileInput.target.files[0];
      
        let reader = new FileReader();

        reader.onload = (e: any) => {
            this.image = e.target.result;
        }

        reader.readAsDataURL(fileInput.target.files[0]);
    }
}
