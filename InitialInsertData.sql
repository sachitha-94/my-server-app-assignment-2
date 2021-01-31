INSERT INTO Role_Type_Code(Role_Name) VALUES ('University Admin'); 
INSERT INTO Role_Type_Code(Role_Name) VALUES ('Department Admin');
INSERT INTO Role_Type_Code(Role_Name) VALUES ('Student');
INSERT INTO Role_Type_Code(Role_Name) VALUES ('Tutor');

INSERT INTO Course_Type_Code(Course_Name) VALUES ('Under-Graduate');
INSERT INTO Course_Type_Code(Course_Name) VALUES ('Post-Graduate');

INSERT INTO Course_Year(Course_Year_Description) VALUES ('1st Year');
INSERT INTO Course_Year(Course_Year_Description) VALUES ('2nd Year');
INSERT INTO Course_Year(Course_Year_Description) VALUES ('3rd Year');

INSERT INTO Exam_Type_Code(Exam_Type_Name) VALUES ('In-Course Component');
INSERT INTO Exam_Type_Code(Exam_Type_Name) VALUES ('Examination');

INSERT INTO Status_Type_Code(Status_Name) VALUES ('Approved');
INSERT INTO Status_Type_Code(Status_Name) VALUES ('Declined');
INSERT INTO Status_Type_Code(Status_Name) VALUES ('Pending');
INSERT INTO Status_Type_Code(Status_Name) VALUES ('In Progress');

INSERT INTO Request_Type_Code(Request_Name) VALUES ('Course Enrollment Request');

INSERT INTO User(User_Name,Role_Type_Code_Id,Password,First_Name,Last_Name) VALUES ('a1',1,'a1', 'Dean', 'Jones');
INSERT INTO User(User_Name,Role_Type_Code_Id,Password,First_Name,Last_Name) VALUES ('a2',2,'a2', 'Saimo', 'Jones');
INSERT INTO User(User_Name,Role_Type_Code_Id,Password,First_Name,Last_Name) VALUES ('a3',3,'a3', 'jhon', 'smith');
INSERT INTO User(User_Name,Role_Type_Code_Id,Password,First_Name,Last_Name) VALUES ('a4',4,'a4', 'mark', 'stev');

INSERT INTO Department(Department_Name,Department_Admin_Id) VALUES ('Science Department',1);
INSERT INTO Department(Department_Name,Department_Admin_Id) VALUES ('Art Department',1);
INSERT INTO Department(Department_Name,Department_Admin_Id) VALUES ('Commerce Department',1);
INSERT INTO Department(Department_Name,Department_Admin_Id) VALUES ('Law Department',1);

INSERT INTO Course(Course_Name,Pre_Course_Req,Course_Type_Code_Id,Department_Id) VALUES ('Computer Science','requirement-Computer Science',1,1);
INSERT INTO Course(Course_Name,Pre_Course_Req,Course_Type_Code_Id,Department_Id) VALUES ('Information System','requirement-Information System',2,1);
INSERT INTO Course(Course_Name,Pre_Course_Req,Course_Type_Code_Id,Department_Id) VALUES ('Chemistry','requirement-chemistry',2,1);

INSERT INTO Module(Module_Name,Course_Id,Teacher_Id,Course_Year_Id) VALUES ('Algorithm',1,4,1);
INSERT INTO Module(Module_Name,Course_Id,Teacher_Id,Course_Year_Id) VALUES ('databse',1,4,1);

INSERT INTO Exam(Module_Id,Exam_Type_Code_Id,Exam_Name,Date) VALUES (1,1,'algorithm test 1','2021-02-05');