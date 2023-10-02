const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "bootcampx",
});

const args = process.argv.slice(2);
let cohort = args[0];
let limit = args[1];
// console.log(cohort, limit);

pool
  .query(
    `
    SELECT students.id, students.name as student, cohorts.name as cohort_name
    FROM students
    JOIN cohorts ON cohort_id = cohorts.id
    WHERE cohorts.name LIKE '%${cohort}%'
    LIMIT ${limit || 5};
    `
  )
  .then((res) => {
    // console.log(res);

    res.rows.forEach((user) => {
      console.log(
        `${user.student} has an id of ${user.id} and was in the ${user.cohort_name} cohort`
      );
    });
  })
  .catch((err) => console.error("query error", err.stack));
