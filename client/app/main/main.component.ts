import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';

@Component({
    selector: 'main',
    template: require('./main.html'),
    styles: [require('./main.scss')],
})
export class MainComponent implements OnInit {
    Http;
    Router;

    users = [];
    user = '';
    newUser = '';

    static parameters = [Http,Router ];
    constructor(private http: Http, private router:Router) {
        this.Http = http;
        this.Router = router;

    }

    ngOnInit() {
        
    }

    showUsers(){
        return this.Http.get('/api/users')
        .map(res => res.json())
        // .catch(err => Observable.throw(err.json().error || 'Server error'))
        .subscribe(users => {
            this.users = users;
        });
    }

    goToPage(page, params){
        this.router.navigate([page, params]);
        
    }

    
    editUser(user){
        this.goToPage('userForm', {'id':user.id})
    }

    deleteUser(user) {
        console.log(user);
        return this.Http.delete(`/api/users/${user.id}`)
            .map(res => res.json())
            .catch(err => Observable.throw(err.json().error || 'Server error'))
            .subscribe(() => {
                this.showUsers();
            });
    }
}
