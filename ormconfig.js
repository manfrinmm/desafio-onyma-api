const rootPath = process.env.NODE_ENV !== 'production' ? 'src' : 'dist';
const extension = process.env.NODE_ENV !== 'production' ? '.ts' : '.js';

module.exports = {
  type: 'postgres',

  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,

  entities: [`./${rootPath}/domain/**/entities/*${extension}`],
  migrations: [`./${rootPath}/infra/typeorm/migrations/*${extension}`],
  cli: {
    migrationsDir: `./${rootPath}/infra/typeorm/migrations`,
  },
};
