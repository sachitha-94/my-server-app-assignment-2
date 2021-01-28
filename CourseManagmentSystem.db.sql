CREATE TABLE IF NOT EXISTS "Role_Type_Code" (
	"Role_Type_Code_Id"	INTEGER NOT NULL,
	"Role_Name"	TEXT NOT NULL,
	PRIMARY KEY("Role_Type_Code_Id"),
	UNIQUE("Role_Name")
);
CREATE TABLE IF NOT EXISTS "Course_Type_Code" (
	"Courser_Type_Code_Id"	INTEGER NOT NULL,
	"Course_Name"	TEXT,
	PRIMARY KEY("Courser_Type_Code_Id" AUTOINCREMENT),
	UNIQUE("Course_Name")
);
CREATE TABLE IF NOT EXISTS "Exam_Type_Code" (
	"Exam_Type_Code_ID"	INTEGER NOT NULL,
	"Exam_Type_Name"	TEXT NOT NULL,
	PRIMARY KEY("Exam_Type_Code_ID" AUTOINCREMENT),
	UNIQUE("Exam_Type_Name")
);

CREATE TABLE IF NOT EXISTS "Status_Type_Code" (
	"Status_Type_Code_Id"	INTEGER NOT NULL,
	"Status_Name" TEXT NOT NULL,
	PRIMARY KEY("Status_Type_Code_Id" AUTOINCREMENT),
	UNIQUE("Status_Name")
);

CREATE TABLE IF NOT EXISTS "Course_Year" (
	"Course_Year_id"	INTEGER NOT NULL,
	"Course_Year_Description"	INTEGER NOT NULL,
	PRIMARY KEY("Course_Year_id" AUTOINCREMENT),
	UNIQUE("Course_Year_Description")
);
CREATE TABLE IF NOT EXISTS "Course" (
	"Course_Id"	INTEGER NOT NULL,
	"Course_Name"	TEXT NOT NULL,
	"Pre_Course_Req"	TEXT,
	"Course_Type_Code_Id"	INTEGER NOT NULL,
	"Department_Id"	INTEGER ,
	FOREIGN KEY("Course_Type_Code_Id") REFERENCES "Course_Type_Code"("courser_type_code_id") ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY("Department_Id") REFERENCES "Department"("Department_Id") ON DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY("Course_Id" AUTOINCREMENT),
	UNIQUE("Course_Name")
);
CREATE TABLE IF NOT EXISTS "Module_Type_Code" (
	"Module_Type_Code_Id"	INTEGER NOT NULL,
	"Module_Name"	TEXT NOT NULL,
	PRIMARY KEY("Module_Type_Code_Id" AUTOINCREMENT),
	UNIQUE("Module_Name")
);
CREATE TABLE IF NOT EXISTS "Module" (
	"Module_Id"	INTEGER NOT NULL,
	"Module_Name"	TEXT NOT NULL,
	"Course_Id"	INTEGER ,
	"Teacher_Id"	INTEGER ,
	"Course_Year_Id"	INTEGER NOT NULL,
	FOREIGN KEY("Teacher_Id") REFERENCES "User"("User_Id") ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY("Course_Id") REFERENCES "Course"("Course_Id") ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY("Course_Year_Id") REFERENCES "Course_Year"("Course_Year_id"),
	PRIMARY KEY("Module_Id" AUTOINCREMENT),
	UNIQUE("Module_Name")
);
CREATE TABLE IF NOT EXISTS "Exam" (
	"Exam_Id"	INTEGER NOT NULL,
	"Module_Id"	INTEGER ,
	"Exam_Type_Code_Id"	INTEGER NOT NULL,
	"Exam_Name"	TEXT NOT NULL,
	FOREIGN KEY("Exam_Type_Code_Id") REFERENCES "Exam_Type_Code"("Exam_Type_Code_ID"),
	FOREIGN KEY("Module_Id") REFERENCES "Module"("Module_Id") ON DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY("Exam_Id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "User" (
	"User_Id"	INTEGER NOT NULL,
	"User_Name"	INTEGER NOT NULL,
	"Role_Type_Code_Id"	INTEGER NOT NULL,
	"Password"	TEXT NOT NULL,
	"First_Name"	TEXT NOT NULL,
	"Last_Name"	TEXT NOT NULL,
	FOREIGN KEY("Role_Type_Code_Id") REFERENCES "Role_Type_Code"("Role_Type_Code_Id"),
	PRIMARY KEY("User_Id" AUTOINCREMENT),
	UNIQUE("User_Name")
);
CREATE TABLE IF NOT EXISTS "Department" (
	"Department_Id"	INTEGER NOT NULL,
	"Department_Name"	INTEGER NOT NULL,
	"Department_Admin_Id"	INTEGER ,
	FOREIGN KEY("Department_Admin_Id") REFERENCES "User"("User_Id") ON DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY("Department_Id" AUTOINCREMENT),
	UNIQUE("Department_Name")
);

CREATE TABLE IF NOT EXISTS "Student_Course_Status" (
	"Student_Id"	INTEGER NOT NULL,
	"Course_Id"	INTEGER ,
	"Status_Type_Code_Id" INTEGER NOT NULL,
	"Enrollment_Status" INTEGER NOT NULL,
	FOREIGN KEY("Status_Type_Code_Id") REFERENCES "Status_Type_Code"("Status_Type_Code_Id"),
	FOREIGN KEY("Enrollment_Status") REFERENCES "Status_Type_Code"("Status_Type_Code_Id"),
	FOREIGN KEY("Student_Id") REFERENCES "User"("User_Id") ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY("Course_Id") REFERENCES "Course"("Course_Id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "Student_CourseYear_Status" (
	"Student_Id"	INTEGER NOT NULL,
	"Course_Year_Id"	INTEGER NOT NULL,
	"Status_Type_Code_Id"	INTEGER NOT NULL,
	FOREIGN KEY("Student_Id") REFERENCES "User"("User_Id"),
	FOREIGN KEY("Course_Year_Id") REFERENCES "Course_Year"("Course_Year_id"),
	FOREIGN KEY("Status_Type_Code_Id") REFERENCES "Status_Type_Code"("Status_Type_Code_Id")

);
CREATE TABLE IF NOT EXISTS "Student_Exam" (
	"Student_Id"	INTEGER NOT NULL,
	"Exam_Id"	INTEGER NOT NULL,
	"Total_Marks"	NUMERIC NOT NULL,
	"Obtained_Marks"	NUMERIC NOT NULL,
	FOREIGN KEY("Student_Id") REFERENCES "User"("User_Id") ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY("Exam_Id") REFERENCES "Exam"("Exam_Id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "Request_Type_Code" (
	"Request_Type_Code_Id"	INTEGER NOT NULL,
	"Request_Name"	TEXT NOT NULL,
	PRIMARY KEY("Request_Type_Code_Id" AUTOINCREMENT),
	UNIQUE("Request_Name")
);

CREATE TABLE IF NOT EXISTS "User_Request" (
	"User_Request_Id"	INTEGER NOT NULL,
	"Request_Type_Id"	INTEGER NOT NULL,
	"Status_Type_Code_Id"	INTEGER NOT NULL,
	"User_Id"	INTEGER NOT NULL,
	"Course_Id" INTEGER NULL,
	"Comments"	TEXT,
	FOREIGN KEY("Request_Type_Id") REFERENCES "Request_Type_Code"("Request_Type_Code_Id"),
	FOREIGN KEY("Course_Id") REFERENCES "Course"("Course_Id") ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY("Status_Type_Code_Id") REFERENCES "Status_Type_Code"("Status_Type_Code_Id"),
	FOREIGN KEY("User_Id") REFERENCES "User"("User_Id") ON DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY("User_Request_Id" AUTOINCREMENT)
)
