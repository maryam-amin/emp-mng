const router = require('express').Router();
let Employee = require('../models/employee.model');

// 1. create a POST API that will create an employee in the database.
//localhost:3000/employees/create
router.route('/create').post(
    (req,res) => {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const dob = Date.parse(req.body.dob);
        const age = Number(req.body.age);
        const email = req.body.email;

        const newEmployee = new Employee({firstName, lastName, dob, age, email});

        newEmployee.save()
        .then(() => res.json('Employee created!'))
        .catch(err => res.status(400).json('Error: '+err));
    }
);

// 2. create a GET API that will fetch all the employees from the database.
//localhost:3000/employees/
router.route('/').get(
    (req,res) => {
        Employee.find()
        .then(employees => res.json(employees))
        .catch(err => res.status(400).json('Error: '+err));
    }
)


// 3. create a PUT API that will take employee id as parameter and update one or more fields of the employee based on the request payload.
//localhost:3000/employees/:id
router.route('/:id').put(
    (req,res) => {
        Employee.findById(req.params.id)
        .then(employee => {

            !req.body.hasOwnProperty("firstName") ? employee.firstName = employee.firstName : employee.firstName = req.body.firstName;

            !req.body.hasOwnProperty("lastName") ? employee.lastName = employee.lastName : employee.lastName = req.body.lastName;
            
            !req.body.hasOwnProperty("dob") ? employee.dob = employee.dob : employee.dob = req.body.dob;
            
            !req.body.hasOwnProperty("age") ? employee.age = employee.age : employee.age = req.body.age;
            
            !req.body.hasOwnProperty("email") ? employee.email = employee.email : employee.email = req.body.email;

            employee.save()
            .then(() => res.json('Employee updated.'))
            .catch(err => res.status(400).json('Error: '+err));
        }
        )
        .catch(err => res.status(400).json('Error: '+err));
    }
)

// 4. create a GET API that will accept employee id as parameter and return details of that employee.
//localhost:3000/employees/:id
router.route('/:id').get(
    (req,res) => {
        Employee.findById(req.params.id)
        .then(employee => res.json(employee))
        .catch(err => res.status(400).json('Error: '+err));
    }
);

// 5. create a GET API that will accept employee id as parameter and return details of that employee.
//localhost:3000/employees/:id
router.route('/:id').delete(
    (req,res) => {
        Employee.findByIdAndDelete(req.params.id)
        .then(() => res.json('204 No Content'))
        .catch(err => res.status(400).json('Error: '+err));
    }
);


module.exports = router;