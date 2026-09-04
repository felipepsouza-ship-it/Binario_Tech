const path = require('path');

module.exports = {
	  development: {
		      client: 'better-sqlite3',
		      connection: {
			            filename: path.resolve(__dirname, 'database.sqlite')
			          },
		      useNullAsDefault: true,
		      pool: {
			            afterCreate: (db, cb) => {
					            db.pragma('foreign_keys = ON');
					            cb(null, db);
					          }
			          },
		      migrations: {
			            directory: path.resolve(__dirname, 'src', 'database', 'migrations')
			          },
		      seeds: {
			            directory: path.resolve(__dirname, 'src', 'database', 'seeds')
			          }
		    }
};
