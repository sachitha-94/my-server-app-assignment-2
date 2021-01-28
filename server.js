var express = require("express");
const fs = require('fs');
var cors = require('cors');
var bodyParser = require("body-parser");
var db = require("./database.js")

var app = express()

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Server port
var HTTP_PORT = 4000

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", 4000))
});


// Root endpoint
app.get("/getInitialData", (req, res, next) => {
    res.json({ "sql": "", "sql2": "" })
});


app.get("/", (req, res, next) => {
    res.json({ "sql": "", "sql2": "" })
});


// list all books
app.get("/books", (req, res, next) => {
    let sql = `SELECT Name name FROM book ORDER BY name`;
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data1": "",
            "data2": ""
        })
    });
});


app.get("/users/get-all/:user_role_id", (req, res, next) => {
    var errors = [];
    var params = [];
    var sql = "Select * from User";
    if (req.params.user_role_id && req.params.user_role_id > 0) {
        params = [req.params.user_role_id];
        sql = "Select * from User where Role_Type_Code_Id = ?";

    }

    db.all(sql, params, function(err, result) {
        if (err) {
            res.status(200).json({ message: "error", "error": err.message });
            return;
        }

        res.json({
            "message": "success",
            "data": result ? result : [],
        });
        return res;

    });
});

app.post("/register/", (req, res, next) => {
    var errors = []

    var data = {
        First_Name: req.body.firstName,
        Last_Name: req.body.lastName,
        User_Name: req.body.username,
        Password: req.body.password,
        Role_Type_Code_Id: req.body.user_role_id,

    }

    var sql = "INSERT INTO User(First_Name,Last_Name,User_Name,Role_Type_Code_Id,Password) VALUES (?,?,?,?,?);";

    var params = [data.First_Name, data.Last_Name, data.User_Name, data.Role_Type_Code_Id, data.Password];
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(200).json({ "error": err.message })
            return;
        }

        res.json({
            "message": "success",
            "data": result ? result : [],
        });
        return res;

    });
});

app.post("/login/", (req, res, next) => {
    var errors = []
    if (!req.body.username) {
        errors.push("user name not specified");
    }
    if (!req.body.password) {
        errors.push("password not specified");
    }
    if (!req.body.user_role_id) {
        errors.push("User role not specified");
    }
    if (errors.length) {
        res.status(200).json({ message: "error", "error": errors.join(',') });
        return;
    }

    var data = {
        User_Name: req.body.username,
        Password: req.body.password,
        Role_Type_Code_Id: req.body.user_role_id

    }

    var sql = "select * from user where User_Name = ? and Password = ? and Role_Type_Code_Id = ?";

    var params = [data.User_Name, data.Password, data.Role_Type_Code_Id];
    db.all(sql, params, function(err, result) {
        if (err) {
            res.status(200).json({ message: "error", "error": err.message });
            return;
        }
        if (!result || result.length == 0) {

            res.json({
                "message": "error",
                "data": "username or password incorrect",
            });
            return res;
        } else {
            res.json({
                "message": "success",
                "data": result,
            });

            return res;

        }
    });
});

// university routes
app.post("/university/add-department", (req, res, next) => {
    var errors = []
    var sql = "INSERT INTO Department(Department_Name,Department_Admin_Id) VALUES (?,?);";

    var params = [req.body.Department_Name, req.body.Department_Admin_Id];
    db.all(sql, params, function(err, result) {
        if (err) {
            res.status(200).json({ message: "error", "error": err.message });
            return;
        }

        res.json({
            "message": "success",
            "data": result ? result[0] : {},
        });
        return res;

    });
});


app.post("/university/edit-department", (req, res, next) => {
    var errors = []
    var sql = "Update Department set Department_Name = ?,Department_Admin_Id = ? where Department_Id = ?;";

    var params = [req.body.Department_Name, req.body.Department_Admin_Id, req.body.Department_Id];
    db.all(sql, params, function(err, result) {
        if (err) {
            res.status(200).json({ message: "error", "error": err.message });
            return;
        }

        res.json({
            "message": "success",
            "data": result ? result[0] : {},
        });
        return res;

    });
});

app.post("/university/delete-department", (req, res, next) => {
    var sql = "DELETE FROM Department WHERE Department_Id = ?;";

    var params = [req.body.Department_Id];
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(200).json({ message: "error", "error": err.message });
            return;
        }

        res.json({
            "message": "success",
            "data": result ? result[0] : {},
        });
        return res;

    });
});

app.get("/university/departments", (req, res, next) => {
    var errors = []
    var sql = "Select " +
        "Department_Id, " +
        "Department_Name, " +
        "Department_Admin_Id, " +
        "First_Name, " +
        "Last_Name " +
        "from Department " +
        "join User on Department.Department_Admin_Id = User.User_Id;";

    db.all(sql, [], function(err, result) {
        if (err) {
            res.status(200).json({ message: "error", "error": err.message });
            return;
        }

        res.json({
            "message": "success",
            "data": result ? result : [],
        });
        return res;

    });
});


app.get("/university/get-departments-admins/", (req, res, next) => {
    var errors = []
    var sql = "Select * from User where Role_Type_Code_Id = ?";
    var user_role_id = 2;

    //var params =[req.body.Department_Name,req.body.Department_Admin_Id,req.body.Department_Id];
    db.all(sql, [user_role_id], function(err, result) {
        if (err) {
            res.status(200).json({ message: "error", "error": err.message });
            return;
        }

        res.json({
            "message": "success",
            "data": result ? result : [],
        });
        return res;

    });
});

// university routes end


// department routes start

//course/modules

app.post("/department/add-course", (req, res, next) => {
    var errors = []
    var sql = "INSERT INTO Course(Course_Name,Pre_Course_Req,Course_Type_Code_Id) VALUES (?,?,?);";

    var params = [req.body.Course_Name, req.body.Pre_Course_Req, req.body.Course_Type_Code_Id];
    db.all(sql, params, function(err, result) {
        if (err) {
            res.status(200).json({ message: "error", "error": err.message });
            return;
        }

        res.json({
            "message": "success",
            "data": result ? result[0] : {},
        });
        return res;

    });
});

app.post("/department/add-module", (req, res, next) => {
    var errors = []

    var sql = "INSERT INTO Module(Module_Name,Teacher_Id,Course_Id,Course_Year_Id) VALUES (?,?,?,?);";

    var params = [req.body.Module_Name, req.body.Teacher_Id, req.body.Course_Id, req.body.Course_Year_Id];
    db.all(sql, params, function(err, result) {
        if (err) {
            res.status(200).json({ message: "error", "error": err.message });
            return;
        }

        res.json({
            "message": "success",
            "data": result ? result[0] : {},
        });
        return res;

    });
});


app.post("/department/edit-course", (req, res, next) => {
    var errors = []
    var sql = "Update Course set Course_Name = ?,Pre_Course_Req = ? , Course_Type_Code_Id = ? where Department_Id = ?;";

    var params = [req.body.Course_Name, req.body.Pre_Course_Req, req.body.Course_Type_Code_Id];
    db.all(sql, params, function(err, result) {
        if (err) {
            res.status(200).json({ message: "error", "error": err.message });
            return;
        }

        res.json({
            "message": "success",
            "data": result ? result[0] : {},
        });
        return res;

    });
});
app.post("/department/delete-course", (req, res, next) => {
    var sql = "DELETE FROM Course WHERE Course_Id = ?;";

    var params = [req.body.Course_Id];
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(200).json({ message: "error", "error": err.message });
            return;
        }

        res.json({
            "message": "success",
            "data": result ? result[0] : {},
        });
        return res;

    });
});

app.get("/department/courses", (req, res, next) => {
    var errors = []
    var sql = "Select Course_Id,Course.Course_Name, Course.Pre_Course_Req,Course_Type_Code.Course_Name As Course_Type,Course.Course_Type_Code_Id from Course join Course_Type_Code on Course.Course_Type_Code_Id = Course_Type_Code.Courser_Type_Code_Id;";



    db.all(sql, [], function(err, result) {
        if (err) {
            res.status(200).json({ message: "error", "error": err.message });
            return;
        }

        res.json({
            "message": "success",
            "data": result ? result : [],
        });
        return res;

    });
});

app.get("/department/modules", (req, res, next) => {
    var errors = []
    var sql = "Select Module.Module_Name,Module.Module_Id,Course.Course_Name,Course.Course_Id from Module join Course on Course.Course_Id = Module.Course_Id;";



    db.all(sql, [], function(err, result) {
        if (err) {
            res.status(200).json({ message: "error", "error": err.message });
            return;
        }

        res.json({
            "message": "success",
            "data": result ? result : [],
        });
        return res;

    });
});

// department routes end



// student routes start
app.post("/student/enroll", (req, res, next) => {
    var errors = []
    var sql = "INSERT INTO User_Request(Request_Type_Id,Status_Type_Code_Id,User_Id,Course_Id) VALUES (?,?,?,?);";

    var params = [req.body.Request_Type_Id, req.body.Status_Type_Code_Id, req.body.User_Id, req.body.Course_Id];
    db.all(sql, params, function(err, result) {
        if (err) {
            res.status(200).json({ message: "error", "error": err.message });
            return;
        }

        res.json({
            "message": "success",
            "data": result ? result[0] : {},
        });
        return res;

    });
});


app.get("/student/enrollment-status/:studentId", (req, res, next) => {
    var errors = [];
    console.log(req.params.studentId);
    var sql = "Select User_Request.User_Id ,Status_Type_Code.Status_Type_Code_Id, Status_Type_Code.Status_Name, Course.Course_Id , Course.Course_Name from User_Request join Status_Type_Code on User_Request.Status_Type_Code_Id = Status_Type_Code.Status_Type_Code_Id join Course on Course.Course_Id = User_Request.Course_Id where User_Request.User_Id = (?);";


    db.all(sql, [req.params.studentId], function(err, result) {
        if (err) {
            res.status(200).json({ message: "error", "error": err.message });
            return;
        }
        console.log(result);
        res.json({
            "message": "success",
            "data": result ? result : [],
        });
        return res;

    });
});


app.get("/student/course-status/:studentId", (req, res, next) => {
    var errors = []
    var sql = "Select Course.Course_Id , Course.Course_Name,Student_Course_Status.Status_Type_Code_Id as Course_Status_Id,Status_Type_Code.Status_Name as Course_Status,en.Status_Name as Course_Enrollment_Status,en.Status_Type_Code_Id as Course_Enrollment_Status_Id,cr.Status_Name as Course_Year_Status,cr.Status_Type_Code_Id as Course_Year_Status_Id, Course_Year.Course_Year_id , Course_Year.Course_Year_Description as Course_Year FROM Student_Course_Status join Status_Type_Code on Status_Type_Code.Status_Type_Code_Id = Student_Course_Status.Status_Type_Code_Id join Status_Type_Code en on en.Status_Type_Code_Id = Student_Course_Status.Enrollment_Status join Course on Course.Course_Id = Student_Course_Status.Course_Id join Student_CourseYear_Status on Student_CourseYear_Status.Student_Id = Student_Course_Status.Student_Id join Status_Type_Code cr on cr.Status_Type_Code_Id = Student_CourseYear_Status.Status_Type_Code_Id join Course_Year on Course_Year.Course_Year_id = Student_CourseYear_Status.Course_Year_Id  where Student_Course_Status.Enrollment_Status = 1 and Student_Course_Status.Student_Id = ?";


    db.all(sql, [req.params.studentId], function(err, result) {
        if (err) {
            res.status(200).json({ message: "error", "error": err.message });
            return;
        }

        res.json({
            "message": "success",
            "data": result ? result : [],
        });
        return res;

    });
});

// student routes end


// Default response for any other request
app.use(function(req, res) {
    res.status(404);
});