SDDDDD NOW

### USER

// GET ALL USER
localhost:3000/api/user

// GET USER INFO
localhost:3000/api/user/profile/:id

// POST USER LOGIN
localhost:3000/api/auth/login
#receiving req.body 
{
	"email":"skhurelbat@mum.edu",
	"password":"123456"
}

// POST USER REGISTER
localhost:3000/api/auth/register
#receiving req.body 
{
	"name": "Kobe",
	"email":"kbryant@mum.edu",
	"password":"lalala",
	"repassword": "lalala"
}

// PUT EDIT USER
localhost:3000/api/user/edit/:id
#receiving req.body 
{
	"name": "Kobe",
	"email":"kbryant@mum.edu",
	"img": "https://randomuser.me/api/portraits/men/43.jpg"
}

// DELETE USER 
localhost:3000/api/user/delete/:id


localhost:3000/api/user
localhost:3000/api/user/profile/:id
localhost:3000/api/user/login
localhost:3000/api/user/register
localhost:3000/api/user/edit/:id
localhost:3000/api/user/delete/:id

--------------------------------------------------
### TASK

// GET ALL TASK LIST
localhost:3000/api/task

// GET TASK BY ID
localhost:3000/api/task/detail/:id

// GET ALL TASK BY PROJECT
localhost:3000/api/task/project/:id

// POST CREATE TASK
localhost:3000/api/task/create
receiving body
{
	"name": ???,
	"description": ???,
	"dueDate": ???,
	"project_id": ???,
	"user_id": ???
}

// DELETE TASK
localhost:3000/api/task/delete/:task_id

// PUT COMPLETE TASK
localhost:3000/api/task/complete/:task_id


localhost:3000/api/task
localhost:3000/api/task/detail/:id
localhost:3000/api/task/project/:id
localhost:3000/api/task/create
localhost:3000/api/task/delete/:task_id
localhost:3000/api/task/complete/:task_id

----------------------------------------------------

### PROJECT

// GET PROJECT LIST BY USER
localhost:3000/api/project/:user_id

// GET PROJECT BY ID
localhost:3000/api/project/detail/:user_id/:project_id

// POST CREATE PROJECT
localhost:3000/api/project/create
{
	name: ???
}

// PUT ADD USER TO PROJECT
localhost:3000/api/project/adduser/:user_id
receiving body
{
	"project_id": "5ade2dbe28387280dc95b240",
	"name": "MPP"
}

// PUT REMOVE USER FROM PROJECT
localhost:3000/api/project/deluser/:user_id/:project_id

---------------------------------------------------

### COMMENT

// GET COMMENT LIST BY TASK
localhost:3000/api/comment/:task_id

// PUT CREATE COMMENT
localhost:3000/api/comment/create
{
	"task_id": "5ade2f6028387280dc95b25a",
	"user_id": "5ade330b2be1cd636000c5d8",
	"comment": "Nice gehees uur yu ghew dee"
}

// PUT DELETE COMMENT
localhost:3000/api/comment/delete/:task_id/:comment_id

========================================


MLAB DB 

user: mwaproject
pass: MWA_pms_123
dbname: mwa_pms

MONGODB VERSION	3.4.14 (MMAPv1)

Client CLI command: mongo ds147659.mlab.com:47659/mwa_pms -u mwaproject -p MWA_pms_123

Application command: mongodb://pmsapp:MWApms123@ds147659.mlab.com:47659/mwa_pms

http://listjs.com/
https://l.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Fbrillout%2Fawesome-angular-components&h=ATO_HiLGoFmuogM0k6Ht2OCuwwXK6TGRJe1FgNEGvhpMfV2VZ0_e-SAlht-_lVeu2FbGJtf_-2bmRvulbS1qyKi_UCgYfYYZo1QaHflvMh4ScRUFtAu-ig