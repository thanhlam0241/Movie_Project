import pandas as pd
import os
import time
import math

# Constant
PATH_MOVIEDB = '../data/moviedb/'
PATH_DATA = '../../data/'
############ START TIME ############
start = time.time()
####################################

user_dict = dict()
movie_dict = dict()
genres_dict = dict()
actor_dict = dict()
director_dict = dict()
country_dict = dict()
companies_dict = dict()

entity_dict = dict()

list_kg = []

relation = {
    'film.genres': 0,
    'genres.film': 1,
    'film.director': 2,
    'director.film': 3,
    'film.actor': 4,
    'act.film': 5,
    'film.company': 6,
    'company.film': 7,
    'film.country': 8,
    'country.film': 9
}

# Load user
df_user = pd.read_json(PATH_DATA + 'users.json')
writer_user_hash = open(PATH_MOVIEDB + 'user_id_old2new.txt', 'w', encoding='utf-8')
for index, row in df_user.iterrows():
    id = row['id']
    user_dict[id] = index
    writer_user_hash.write('%d\t%d\n' % (id, index))
writer_user_hash.close()

# Load movie
i = 0
df_movie = pd.read_json(PATH_DATA + 'movie.json')
writer_movie_hash = open(PATH_MOVIEDB + 'movie_id2entity_id_hash.txt', 'w', encoding='utf-8')
for index, row in df_movie.iterrows():
    id = row['id']
    idMovieEntity = i
    movie_dict[id] = idMovieEntity
    i += 1
    writer_movie_hash.write('%d\t%d\n' % (id, i))
    mv_genres = row['genres']
    for genre in mv_genres:
        if genre in genres_dict.keys():
            list_kg.append({
                'h': idMovieEntity,
                'r': 0,
                't': genres_dict[genre]
            })
            list_kg.append({
                't': idMovieEntity,
                'r': 1,
                'h': genres_dict[genre]
            })
        else:
            id_entity_genre = i
            genres_dict[genre] = id_entity_genre
            i += 1
            list_kg.append({
                'h': idMovieEntity,
                'r': 0,
                't': id_entity_genre
            })
            list_kg.append({
                't': idMovieEntity,
                'r': 1,
                'h': id_entity_genre
            })
    for country in row['production_countries']:
        country_iso_code = country['iso_3166_1']
        if country_iso_code in country_dict.keys():
            list_kg.append({
                'h': idMovieEntity,
                'r': 8,
                't': country_dict[country_iso_code]
            })
            list_kg.append({
                't': idMovieEntity,
                'r': 9,
                'h': country_dict[country_iso_code]
            })
        else:
            id_entity_company = i
            country_dict[country_iso_code] = id_entity_company
            i += 1
            list_kg.append({
                'h': idMovieEntity,
                'r': 8,
                't': id_entity_company
            })
            list_kg.append({
                't': idMovieEntity,
                'r': 9,
                'h': id_entity_company
            })
writer_movie_hash.close()

# Save review
df_review = pd.read_json(PATH_DATA + 'reviews.json')
writer_review_hash = open(PATH_MOVIEDB + 'ratings_final.txt', 'w', encoding='utf-8')
for index, row in df_review.iterrows():
    string_user_id = row['user_id']
    string_movie_id = row['movie_id']
    row_rating = row['rating']
    try:
        user_new_id = user_dict[string_user_id]
        movie_new_id = movie_dict[string_movie_id]
        rating = 1 
        if (row_rating is not None) and (not math.isnan(float(row_rating))):
            rating = float(row_rating)
        if rating > 6:
            writer_review_hash.write(f'{user_new_id}\t{movie_new_id}\n')
    except:
        continue
writer_review_hash.close()

writer_review_hash = open(PATH_MOVIEDB + 'kg_finals.txt', 'w', encoding='utf-8')
for relation in list_kg:
    writer_review_hash.write(f'{relation['h']}\t{relation['r']}\t{relation['t']}\n')

############ END TIME ############
end = time.time()
print(f'Time running: {end - start}')