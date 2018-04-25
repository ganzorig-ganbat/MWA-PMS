import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const hostURL = 'http://localhost:3000';

@Injectable()
export class SdUserService {
    constructor(private http: HttpClient) {}

    getUsers(token) {
        const headers = new HttpHeaders().set( 'Content-type', 'application/json').set('x-access-token', token );
        return this.http.get(`${hostURL}/api/user`, { headers: headers });
    }

    getUser(user, token) {
        const headers = new HttpHeaders().set( 'Content-type', 'application/json').set('x-access-token', token );
        return this.http.get(`${hostURL}/api/user/profile/${user._id}`, { headers: headers });
    }

    login(user) {
        const headers = new HttpHeaders({ 'Content-type': 'application/json' });
        return this.http.post(`${hostURL}/api/auth/login`, JSON.stringify(user), { headers: headers });
    }

    register(user) {
        const headers = new HttpHeaders({ 'Content-type': 'application/json' });
        return this.http.post(`${hostURL}/api/auth/register`, JSON.stringify(user), { headers: headers });
    }

    editUser(user, token) {
        const headers = new HttpHeaders().set( 'Content-type', 'application/json').set('x-access-token', token );
        return this.http.put(`${hostURL}/api/user/edit/${user._id}`, JSON.stringify(user), { headers: headers });
    }

    deleteUser(user, token) {
        const headers = new HttpHeaders().set( 'Content-type', 'application/json').set('x-access-token', token );
        return this.http.delete(`${hostURL}/api/user/edit/${user._id}`, { headers: headers });
    }

    getProjects(user, token) {
        const headers = new HttpHeaders().set( 'Content-type', 'application/json').set('x-access-token', token );
        return this.http.get(`${hostURL}/api/project/${user._id}`, { headers: headers });
    }

    getProject(user, project, token) {
        const headers = new HttpHeaders().set( 'Content-type', 'application/json').set('x-access-token', token );
        return this.http.get(`${hostURL}/api/project/detail/${user._id}/${project._id}`, { headers: headers });
    }

    createProject(project, token) {
        const headers = new HttpHeaders().set( 'Content-type', 'application/json').set('x-access-token', token );
        return this.http.post(`${hostURL}/api/project/create`, JSON.stringify(project), { headers: headers });
    }

    addUserToProject(data, token) {
        const headers = new HttpHeaders().set( 'Content-type', 'application/json').set('x-access-token', token );
        return this.http.put(`${hostURL}/api/project/adduser/${data.user_id}`,
        JSON.stringify(data), { headers: headers });
    }

    deleteUserFromProject(user, project, token) {
        const headers = new HttpHeaders().set( 'Content-type', 'application/json').set('x-access-token', token );
        return this.http.delete(`${hostURL}/api/project/deluser/${user._id}/${project.id}`, { headers: headers });
    }

}
