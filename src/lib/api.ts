const API_KEY = "7b8e895fc19e42eb81433287a8566bc5";
const BASE_URL = "https://newsapi.org/v2";

export const newsApi = {
  fetchNews: async (query?: string, category?: string, page: number = 1) => {
    const pageSize = 9;
    let url;

    if (query) {
      url = `${BASE_URL}/everything?q=${encodeURIComponent(query)}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
    } else {
      url = `${BASE_URL}/top-headlines?country=us&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
      if (category) url += `&category=${category}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    if (data.status === "ok") {
      const articles = data.articles || [];
      const totalResults = data.totalResults || 0;
      return {
        articles: articles,
        totalResults: totalResults
      };
    } else {
      throw new Error(data.message || "Failed to fetch news");
    }
  }
};