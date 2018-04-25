import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const hostURL = 'http://localhost:3000';

@Injectable()
export class SdUserService {

    constructor(
        private http: HttpClient) { }

    getUsers(token) {
        const headers = new HttpHeaders({ 'Content-type': 'application/json', 'x-access-token': token });
        return this.http.get(`${hostURL}/api/user`, { headers: headers });
    }

    getUser(user, token) {
        const headers = new HttpHeaders({ 'Content-type': 'application/json', 'x-access-token': token });
        return this.http.get(`${hostURL}/api/user/profile/${user.id}`, { headers: headers });
    }

    checkUserPass(user, token) {
        const headers = new HttpHeaders({ 'Content-type': 'application/json', 'x-access-token': token });
        return this.http.post('http://localhost:3000/api/user/checkpass', JSON.stringify(user), { headers: headers });
    }

    // login(user) {
    //     return this.http.post(`${hostURL}/api/auth/login`, JSON.stringify(user), { headers: headers });
    // }

    // register(user) {
    //     return this.http.post(`${hostURL}/api/auth/register`, JSON.stringify(user), { headers: headers });
    // }

    editUser(user, token) {
        const headers = new HttpHeaders({ 'Content-type': 'application/json', 'x-access-token': token });
        return this.http.put(`${hostURL}/api/user/edit/${user.id}`, JSON.stringify(user), { headers: headers });
    }

    editUserPass(user, token) {
        const headers = new HttpHeaders({ 'Content-type': 'application/json', 'x-access-token': token });
        return this.http.put(`${hostURL}/api/user/editPass/${user.id}`, JSON.stringify(user), { headers: headers });
    }

    deleteUser(user, token) {
        const headers = new HttpHeaders({ 'Content-type': 'application/json', 'x-access-token': token });
        return this.http.delete(`${hostURL}/api/user/edit/${user.id}`, { headers: headers });
    }

    getProjects(user, token) {
        const headers = new HttpHeaders({ 'Content-type': 'application/json', 'x-access-token': token });
        return this.http.get(`${hostURL}/api/project/${user.id}`, { headers: headers });
    }

    getProject(user, project, token) {
        const headers = new HttpHeaders({ 'Content-type': 'application/json', 'x-access-token': token });
        return this.http.get(`${hostURL}/api/project/detail/${user.id}/${project._id}`, { headers: headers });
    }

    createProject(project, token) {
        const headers = new HttpHeaders({ 'Content-type': 'application/json', 'x-access-token': token });
        return this.http.post(`${hostURL}/api/project/create`, JSON.stringify(project), { headers: headers });
    }

    addUserToProject(data, token) {
        const headers = new HttpHeaders({ 'Content-type': 'application/json', 'x-access-token': token });
        return this.http.put(`${hostURL}/api/project/adduser/${data.user_id}`,
            JSON.stringify(data), { headers: headers });
    }

    deleteUserFromProject(user, project, token) {
        const headers = new HttpHeaders({ 'Content-type': 'application/json', 'x-access-token': token });
        return this.http.delete(`${hostURL}/api/project/deluser/${user.id}/${project.id}`, { headers: headers });
    }

}
