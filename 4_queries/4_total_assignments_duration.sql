SELECT day, COUNT(id) as total_assignments, SUM(duration) as duration
FROM assignments
GROUP BY day
ORDER BY day;