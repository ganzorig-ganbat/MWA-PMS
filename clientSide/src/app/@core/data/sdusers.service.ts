import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const hostURL = 'http://localhost:3000';
const headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');

@Injectable()
export class SdUserService {

    constructor(private http: HttpClient) { }

    getUsers(token) {
        headers.append('x-access-token', token);
        return this.http.get(`${hostURL}/api/user`, { headers: headers });
    }

    getUser(user, token) {
        headers.append('x-access-token', token);
        return this.http.get(`${hostURL}/api/user/profile/${user._id}`, { headers: headers });
    }

    login(user) {
        return this.http.post(`${hostURL}/api/auth/login`, JSON.stringify(user), { headers: headers });
    }

    register(user) {
        return this.http.post(`${hostURL}/api/auth/register`, JSON.stringify(user), { headers: headers });
    }

    editUser(user, token) {
        headers.append('x-access-token', token);
        return this.http.put(`${hostURL}/api/user/edit/${user._id}`, JSON.stringify(user), { headers: headers });
    }

    deleteUser(user, token) {
        headers.append('x-access-token', token);
        return this.http.delete(`${hostURL}/api/user/edit/${user._id}`, { headers: headers });
    }

    getProjects(user, token) {
        headers.append('x-access-token', token);
        return this.http.get(`${hostURL}/api/project/${user._id}`, { headers: headers });
    }

    getProject(user, project, token) {
        headers.append('x-access-token', token);
        return this.http.get(`${hostURL}/api/project/detail/${user._id}/${project._id}`, { headers: headers });
    }

    createProject(project, token) {
        headers.append('x-access-token', token);
        return this.http.post(`${hostURL}/api/project/create`, JSON.stringify(project), { headers: headers });
    }

    addUserToProject(data, token) {
        headers.append('x-access-token', token);
        return this.http.put(`${hostURL}/api/project/adduser/${data.user_id}`,
        JSON.stringify(data), { headers: headers });
    }

    deleteUserFromProject(user, project, token) {
        headers.append('x-access-token', token);
        return this.http.delete(`${hostURL}/api/project/deluser/${user._id}/${project.id}`, { headers: headers });
    }

}
