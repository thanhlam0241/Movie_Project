import Movie, { IMovie } from "../models/movie.model";
import getRecommendation from "@/api/recomendationApi";
import searchQuery from "@/api/elasticSearch";
import clientRedis from "@/config/redisConnector";

export interface ResultPaginate {
  total: Number;
  size: Number;
  page: Number;
  limit: Number;
  data: IMovie[];
}

export interface UpdateModel {
  title?: string;
  overview?: string;
}

export interface CreateModel {
  title: string;
  overview: string;
}

async function getRecommendMovie(userId: Number) {
  const keyRedis = `recommend_usr_id_${userId}`;
  try {
    const cacheData = await clientRedis?.get(keyRedis);
    if (cacheData && typeof cacheData === "string") {
      return JSON.parse(cacheData);
    }
  } catch (ex: any) {
    console.log(ex?.message ?? ex);
  }
  const listRecommend = await getRecommendation(userId);
  console.log(listRecommend);
  if (
    !listRecommend ||
    !listRecommend.data ||
    !Array.isArray(listRecommend.data) ||
    listRecommend.data.length === 0
  ) {
    const res = await getTopPopularMovie();
    return res;
  }
  const result = await Movie.find({
    id: {
      $in: listRecommend.data,
    },
  })
    .sort({ vote_average: -1, popularity: -1 })
    .select("id title vote_average release_date poster_path genres -_id")
    .lean();

  await clientRedis?.set(keyRedis, JSON.stringify(result), {
    EX: 60 * 60,
  });

  return result;
}

async function getTopRated() {
  const result = await Movie.find({})
    .sort({ vote_average: -1, popularity: -1 })
    .select("id title vote_average release_date poster_path genres -_id")
    .skip(0)
    .limit(20);
  return result;
}

async function getTopPopularMovie() {
  const result = await Movie.find({})
    .sort({ popularity: -1 })
    .select("id title vote_average release_date poster_path genres -_id")
    .skip(0)
    .limit(20);
  return result;
}

async function getLastestReleasedMovie() {
  console.log("Get latest movie");
  const result = await Movie.find({
    release_date: { $lt: new Date() },
  })
    .sort({ release_date: -1 })
    .select("id title vote_average release_date poster_path genres -_id")
    .skip(0)
    .limit(20);
  return result;
}

async function increaseView(id: number) {
  try {
    await Movie.updateOne({ id: id }, { $inc: { ["view"]: 1 } });
  } catch (ex) {
    console.log(ex);
  }
}

async function search(page: number, offset: number, search: string = "") {
  const filter = search
    ? {
        $text: {
          $search: `\"${search}\"`,
        },
      }
    : {};
  const totalDocument = await Movie.countDocuments(filter).exec();
  const data = await Movie.find(filter)
    .select(
      "id title vote_average release_date status poster_path genres revenue budget -_id"
    )
    .sort({ popylarity: -1, vote_average: -1 })
    .skip(offset * (page - 1))
    .limit(offset);
  return {
    page,
    size: offset,
    results: data,
    total_results: totalDocument,
    total_pages: Math.ceil(totalDocument / offset),
  };
}

async function searchByElastic(
  page: number,
  offset: number,
  search: string = ""
) {
  const results = await searchQuery(search, page, offset);
  if (!results || !results.length) {
    const filter = search
      ? {
          $text: {
            $search: `\"${search}\"`,
          },
        }
      : {};
    return await Movie.find(filter)
      .select(
        "id title vote_average release_date status poster_path genres revenue budget -_id"
      )
      .sort({ popularity: -1, vote_average: -1 })
      .skip(offset * (page - 1))
      .limit(offset);
  }
  return results;
}

async function getPaging(
  page: number,
  size: number,
  sort: string,
  sort_order: 1 | -1 = -1,
  genres: number[] = []
): Promise<any> {
  const count = await Movie.countDocuments().exec();
  const filter = genres.length > 0 ? { genres: { $all: genres } } : {};
  const totalDocument = await Movie.countDocuments(filter).exec();
  const data = await Movie.find(filter)
    .select("id title vote_average poster_path release_date genres -_id")
    .sort({ [sort]: sort_order })
    .skip(size * (page - 1))
    .limit(size)
    .exec();

  return {
    total_results: count,
    total_pages: totalDocument,
    page: page,
    size: size,
    results: data,
  };
}

async function create(data: CreateModel): Promise<void> {
  const maxId = await Movie.find().sort({ id: -1 }).limit(1).exec();
  const newId = maxId[0].id + 1;
  const newMovie = new Movie({ id: newId, ...data });
  await newMovie.save();
}

async function getById(id: Number): Promise<any> {
  console.log(id);
  const result = await Movie.findOne({ id: id });
  if (!result) {
    throw new Error("Movie not found");
  }
  return result;
}

async function updateById(id: number, data: UpdateModel): Promise<void> {
  const isExist = await Movie.exists({ id: id });
  if (!isExist) {
    throw new Error("Movie not found");
  }
  await Movie.updateOne({ id: id }, data);
}

async function deleteById(id: number): Promise<void> {
  const isExist = await Movie.exists({ id: id });
  if (!isExist) {
    throw new Error("Movie not found");
  }
  await Movie.deleteOne({ id: id });
}

async function getByListId(ids: Number[]): Promise<any[]> {
  const result = await Movie.find({ id: { $in: ids } });
  return result;
}

export {
  getPaging,
  getById,
  getByListId,
  updateById,
  create,
  deleteById,
  search,
  getRecommendMovie,
  searchByElastic,
  getLastestReleasedMovie,
  getTopPopularMovie,
  getTopRated,
  increaseView,
};
