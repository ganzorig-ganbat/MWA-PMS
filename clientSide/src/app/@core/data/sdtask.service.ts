import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const hostURL = 'http://localhost:3000';

@Injectable()
export class SdTaskService {
    token: string;

    constructor(private http: HttpClient) { }

    getTasks() {
        const token = this._get_token();
        const headers = new HttpHeaders().set('Content-type', 'application/json').set('x-access-token', token);
        return this.http.get(`${hostURL}/api/task`, { headers: headers });
    }

    getTask(task_id) {
        const token = this._get_token();
        const headers = new HttpHeaders().set('Content-type', 'application/json').set('x-access-token', token);
        return this.http.get(`${hostURL}/api/task/detail/${task_id}`, { headers: headers });
    }

    getTasksByProject(project_id) {
        const token = this._get_token();
        const headers = new HttpHeaders().set('Content-type', 'application/json').set('x-access-token', token);
        return this.http.get(`${hostURL}/api/task/project/${project_id}`, { headers: headers });
    }

    createTask(task) {
        const token = this._get_token();
        const headers = new HttpHeaders().set('Content-type', 'application/json').set('x-access-token', token);
        return this.http.post(`${hostURL}/api/task/create`, JSON.stringify(task), { headers: headers });
    }

    deleteTask(task_id) {
        const token = this._get_token();
        const headers = new HttpHeaders().set('Content-type', 'application/json').set('x-access-token', token);
        return this.http.delete(`${hostURL}/api/task/delete/${task_id}`, { headers: headers });
    }

    updateCompleteTask(task_id) {
        const token = this._get_token();
        const headers = new HttpHeaders().set('Content-type', 'application/json').set('x-access-token', token);
        return this.http.put(`${hostURL}/api/task/complete/${task_id}`, { headers: headers });
    }

    updatePendingTask(task_id) {
        const token = this._get_token();
        const headers = new HttpHeaders().set('Content-type', 'application/json').set('x-access-token', token);
        return this.http.put(`${hostURL}/api/task/pending/${task_id}`, { headers: headers });
    }

    updateTask(task) {
        const token = this._get_token();
        const headers = new HttpHeaders().set('Content-type', 'application/json').set('x-access-token', token);
        return this.http.put(`${hostURL}/api/task/`, JSON.stringify(task), { headers: headers });
    }

    getCommentsByTask(task) {
        const token = this._get_token();
        const headers = new HttpHeaders().set('Content-type', 'application/json').set('x-access-token', token);
        return this.http.get(`${hostURL}/api/comment/${task._id}`, { headers: headers });
    }

    createComments(comment) {
        const token = this._get_token();
        const headers = new HttpHeaders().set('Content-type', 'application/json').set('x-access-token', token);
        return this.http.post(`${hostURL}/api/comment/create`, JSON.stringify(comment), { headers: headers });
    }

    deleteCommentFromTask(task, comment) {
        const token = this._get_token();
        const headers = new HttpHeaders().set('Content-type', 'application/json').set('x-access-token', token);
        return this.http.delete(`${hostURL}/api/comment/delete/${task._id}/${comment.id}`, { headers: headers });
    }

    private _get_token() {
        return localStorage.getItem('auth_app_token');
    }

}
