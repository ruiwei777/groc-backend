# How to Run
It takes port 5000. This server serves data for front end and must run first.
Make sure port 5000 and 5001 are clean.

`npm install && npm start`

# Test
`npm test` or `npm test -- --watch`.

It uses Jest.

Unit Testing lives within each `__tests__` folder within each module.
Integration Testing lives within the `tests` folder under root.
Intertgration Testing requires server running.

# Notes
It uses in-memory DB. Restarting the server will refresh data.