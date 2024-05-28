db = db.getSiblingDB("admin");
db.auth(
  process.env.MONGO_INITDB_ROOT_USERNAME,
  process.env.MONGO_INITDB_ROOT_PASSWORD
);

db = db.getSiblingDB("account-db");
db.createCollection("users");
db.createCollection("admins");

db = db.getSiblingDB("movie-db");
db.createCollection("movies");
db.createCollection("casts");
db.createCollection("crews");
db.createCollection("people");
db.createCollection("credits");
db.createCollection("favorites");
db.createCollection("genres");
db.createCollection("reviews");
db.createCollection("companies");
db.createCollection("histories");
db.movies.createIndex({ id: 1 }, { unique: true });
db.casts.createIndex({ movie_id: 1, person_id: 2 }, { unique: true });
db.crews.createIndex({ movie_id: 1, person_id: 2 }, { unique: true });
db.people.createIndex({ id: 1 }, { unique: true });
db.credits.createIndex({ id: 1 }, { unique: true });
db.favorites.createIndex({ user_id: 1 }, { unique: true });
db.genres.createIndex({ id: 1 }, { unique: true });
db.reviews.createIndex({ movie_id: 1 }, { unique: true });
db.companies.createIndex({ id: 1 }, { unique: true });
db.histories.createIndex({ user_id: 1 }, { unique: true });

db = db.getSiblingDB("movie-action-db");
db.createCollection("actions");
db.actions.createIndex({ user_id: 1, movie_id: 1 });

db = db.getSiblingDB("communation-db");
db.createCollection("comments");
db.createCollection("votings");
db.createCollection("messages");
db.comments.createIndex({ user_id: 1, movie_id: 1 });
db.votings.createIndex({ user_id: 1, movie_id: 1 });

db.createUser({
  user: process.env.MONGO_USER_MOVIE,
  pwd: process.env.MONGO_PASSWORD_MOVIE,
  roles: [
    {
      role: "readWrite",
      db: process.env.MONGO_DATABASE_MOVIE,
    },
    {
      role: "readWrite",
      db: process.env.MONGO_DATABASE_MOVIE_ACTION,
    },
    {
      role: "readWrite",
      db: process.env.MONGO_DATABASE_MOVIE_COMMUNICATION,
    },
    {
      role: "readWrite",
      db: process.env.MONGO_DATABASE_MOVIE_ACCOUNT,
    },
  ],
});
