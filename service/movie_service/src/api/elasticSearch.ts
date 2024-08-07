import client from "@/config/els";

const searchQuery = async (str: string, page: number, size: number) => {
  console.log("Start query by elasticsearch");
  try {
    const queryBody = !str
      ? { match_all: {} }
      : {
          bool: {
            should: [
              { match: { title: { query: str } } },
              {
                match: {
                  title: {
                    query: str,
                    fuzziness: 2,
                  },
                },
              },
            ],
          },
        };
    const result = await client.search({
      index: "movie_search",
      query: queryBody,
      _source: {
        includes: ["id", "title"],
      },
      sort: [{ popularity: "desc" }],
      from: (page - 1) * size,
      size: size,
      filter_path: ["hits.hits._source"],
    });
    return result?.hits?.hits?.map((item) => item._source) || [];
  } catch (ex) {
    console.log(ex);
    return [];
  }
};

export default searchQuery;
