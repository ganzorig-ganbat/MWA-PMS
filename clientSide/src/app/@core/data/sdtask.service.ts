import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/observable/of';

const hostURL = 'http://localhost:3000';
const headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');

@Injectable()
export class SdTaskService {

    constructor(private http: HttpClient) { }

    getTasks(token) {
        headers.append('x-access-token', token);
        return this.http.get(`${hostURL}/api/task`, { headers: headers });
    }

    getTask(task, token) {
        headers.append('x-access-token', token);
        return this.http.get(`${hostURL}/api/task/detail/${task._id}`, { headers: headers });
    }

    getTasksByProject(project, token) {
        headers.append('x-access-token', token);
        return this.http.get(`${hostURL}/api/task/project/${project.id}`, { headers: headers });
    }

    createTask(task, token) {
        headers.append('x-access-token', token);
        return this.http.post(`${hostURL}/api/task/create`, JSON.stringify(task), { headers: headers });
    }

    deleteTask(task, token) {
        headers.append('x-access-token', token);
        return this.http.delete(`${hostURL}/api/task/delete/${task._id}`, { headers: headers });
    }

    updateCompleteTask(task, token) {
        headers.append('x-access-token', token);
        return this.http.put(`${hostURL}/api/task/complete/${task._id}`, { headers: headers });
    }

    getCommentsByTask(task, token) {
        headers.append('x-access-token', token);
        return this.http.get(`${hostURL}/api/comment/${task._id}`, { headers: headers });
    }

    createComments(comment, token) {
        headers.append('x-access-token', token);
        return this.http.put(`${hostURL}/api/comment/create`, JSON.stringify(comment), { headers: headers });
    }

    deleteCommentFromTask(task, comment, token) {
        headers.append('x-access-token', token);
        return this.http.delete(`${hostURL}/api/comment/delete/${task._id}/${comment.id}`, { headers: headers });
    }

}