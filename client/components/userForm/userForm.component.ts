import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/switchMap';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
    selector: 'userForm',
    template: require('./userForm.component.html')
})
export class UserFormComponent {
    Http;
    Route;
    Router;
    newUser = '';
    id : number;
    FunctionName:string;
    userData = {};
    privileges = [];
    formMode = '';
    static parameters = [Http, ActivatedRoute, Router];
    constructor(private http: Http, private route: ActivatedRoute,
        private router: Router) {
        this.Http = http;
        this.Route = route;
        this.Router = router;
    }

    ngOnInit() {
        this.id = this.Route.snapshot.paramMap.get('id');
        if (this.id) {
            this.FunctionName = 'editUser';
            this.formMode = 'Edit user';
            this.Http.get('/api/users/' + this.id)
            .map(res => res.json())
            .subscribe(data => {
                this.userData = {
                    'id': data.id,  
                    'name': data.name,
                    'description': data.description,
                    'privileges' : data.Privileges.map(a => a.id)
                }
            },
        err => {this.Router.navigate(['**']);},
        () => console.log('done')
        )}
        else{
            this.FunctionName = 'addUser';
            this.formMode = 'New user';
        }

        return this.Http.get('/api/privileges')
        .map(res => res.json())
        .subscribe(privileges => {
            this.privileges = privileges;
        }); 
    }

    addUser() {
        return this.Http.post('/api/users', this.userData)
        .map(res => res.json())
        .catch(err => Observable.throw(err.json().error || 'Server error'))
        .subscribe(this.Router.navigate(['home']))
    }

    editUser() {
        return this.Http.patch('/api/users/' + this.id, this.userData)
            .map(res => res.json())
            .catch(err => Observable.throw(err.json().error || 'Server error'))
            .subscribe(this.Router.navigate(['home']));  
    }
}