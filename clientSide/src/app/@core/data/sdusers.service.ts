import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const hostURL = 'http://localhost:3000';

@Injectable()
export class SdUserService {

    constructor(private http: HttpClient) { }

    checkUserPass(user, token) {
        const headers = new HttpHeaders({ 'Content-type': 'application/json', 'x-access-token': token });
        return this.http.post('http://localhost:3000/api/user/checkpass', JSON.stringify(user), { headers: headers });
    }

    login(user) {
        return this.http.post(`${hostURL}/api/auth/login`, JSON.stringify(user), { headers: headers });
    }

    register(user) {
        return this.http.post(`${hostURL}/api/auth/register`, JSON.stringify(user), { headers: headers });
    }

    getUsers() {
        const token = this._get_token();
        const headers = new HttpHeaders().set('Content-type', 'application/json').set('x-access-token', token);
        return this.http.get(`${hostURL}/api/user`, { headers: headers });
    }

    // return user
    getUser(user_id) {
        const token = this._get_token();
        const headers = new HttpHeaders().set('Content-type', 'application/json').set('x-access-token', token);
        return this.http.get(`${hostURL}/api/user/profile/${user_id}`, { headers: headers });
    }

    editUser(user) {
        const token = this._get_token();
        const headers = new HttpHeaders().set('Content-type', 'application/json').set('x-access-token', token);
        return this.http.put(`${hostURL}/api/user/edit/${user._id}`, JSON.stringify(user), { headers: headers });
    }

    deleteUser(user_id) {
        const token = this._get_token();
        const headers = new HttpHeaders().set('Content-type', 'application/json').set('x-access-token', token);
        return this.http.delete(`${hostURL}/api/user/edit/${user_id}`, { headers: headers });
    }

    getProjects(user_id) {
        const token = this._get_token();
        const headers = new HttpHeaders().set('Content-type', 'application/json').set('x-access-token', token);
        return this.http.get(`${hostURL}/api/project/${user_id}`, { headers: headers });
    }

    getProject(user_id, project_id) {
        const token = this._get_token();
        const headers = new HttpHeaders().set('Content-type', 'application/json').set('x-access-token', token);
        return this.http.get(`${hostURL}/api/project/detail/${user_id}/${project_id}`, { headers: headers });
    }

    createProject(project) {
        const token = this._get_token();
        const headers = new HttpHeaders().set('Content-type', 'application/json').set('x-access-token', token);
        return this.http.post(`${hostURL}/api/project/create`, JSON.stringify(project), { headers: headers });
    }

    addUserToProject(data) {
        const token = this._get_token();
        const headers = new HttpHeaders().set('Content-type', 'application/json').set('x-access-token', token);
        return this.http.put(`${hostURL}/api/project/adduser/${data.user_id}`,
            JSON.stringify(data), { headers: headers });
    }

    deleteUserFromProject(user, project) {
        const token = this._get_token();
        const headers = new HttpHeaders().set('Content-type', 'application/json').set('x-access-token', token);
        return this.http.delete(`${hostURL}/api/project/deluser/${user._id}/${project.id}`, { headers: headers });
    }

    private _get_token() {
        return localStorage.getItem('auth_app_token');
    }

}
