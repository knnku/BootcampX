const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "bootcampx",
});

pool.on("connect", () => {
  console.log("Connected");
});

//Inputs
const args = process.argv.slice(2);
let cohort = args[0];

//Parameterized queries and values
const query = `
    SELECT DISTINCT
    teachers.name as name,
    cohorts.name as cohort,
    COUNT(assistance_requests) as total_assistances
    FROM assistance_requests
    JOIN teachers ON teachers.id = teacher_id
    JOIN students on students.id = student_id
    JOIN cohorts ON cohorts.id = cohort_id
    WHERE cohorts.name LIKE $1
    GROUP BY teachers.name, cohorts.name
    ORDER BY teachers.name;
    `;
const values = [`%${cohort}%`]


//Queries
pool
  .query(query, values)

  .then((res) => {
    // console.log(res);

    res.rows.forEach((teachers) => {
      console.log(`${teachers.name}: ${teachers.cohort}`);
    });
  })
  .catch((err) => console.error("Query error:", err.stack));

pool.end();
