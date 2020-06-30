module.exports = {
  database: 'fastfeet',
  host: 'localhost',
  dialect: 'postgres',
  username: 'postgres',
  password: 'postgres',
  port: '5555',
  define: {
    timestamps: true,
    underscored: true, // Converts all camelCased columns to underscored if true
    underscoredAll: true, // Converts camelCased model names to underscored table names if true
  },
};
/*
  pessoaFisica => pessoa_fisica
*/
