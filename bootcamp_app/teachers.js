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

const args = process.argv.slice(2);
let cohort = args[0];

pool
  .query(
    `
    SELECT DISTINCT
    teachers.name as name,
    cohorts.name as cohort,
    COUNT(assistance_requests) as total_assistances
    FROM assistance_requests
    JOIN teachers ON teachers.id = teacher_id
    JOIN students on students.id = student_id
    JOIN cohorts ON cohorts.id = cohort_id
    WHERE cohorts.name LIKE '%${cohort}%'
    GROUP BY teachers.name, cohorts.name
    ORDER BY teachers.name;
    `
  )

  .then((res) => {
    // console.log(res);

    res.rows.forEach((teachers) => {
      console.log(`${teachers.name}: ${teachers.cohort}`);
    });
  })
  .catch((err) => console.error("Query error:", err.stack));

pool.end();
