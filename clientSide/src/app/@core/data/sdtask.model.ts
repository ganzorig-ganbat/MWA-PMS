export class SdTaskModel {
    constructor(
        public name: string,
        public project_id: string,
        public _id?: string,
        public description?: string,
        public dueDate?: string,
        public comments?: any[],
        public user_id?: string,
        public status?: string,
    ) { }
}
