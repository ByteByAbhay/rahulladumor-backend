const { asyncHandler } = require("../middleware/errorHandler");

// @desc    Get articles from DEV Community
// @route   GET /api/articles?page=1&per_page=9&tag=javascript
// @access  Public
const getArticles = asyncHandler(async (req, res) => {
  // Extract pagination and filter parameters from query
  const page = parseInt(req.query.page) || 1;
  const perPage = Math.min(parseInt(req.query.per_page) || 9, 1000); // Max 1000 per DEV API limits
  const tag = req.query.tag || "";
  const state = req.query.state || "fresh"; // fresh, rising, or all
  const top = req.query.top || ""; // Number representing a period in days, weeks, months, or years

  const username = "rahulladumor";
  const apiKey =
    process.env.DEV_COMMUNITY_API_KEY || "hfqg2GeuqRv3gZ9qvhR8VyBw";

  if (!apiKey) {
    return res.status(500).json({
      status: "error",
      message: "DEV Community API key not configured",
      data: [],
      pagination: {
        page: page,
        per_page: perPage,
        total: 0,
        total_pages: 0,
      },
    });
  }

  // Build URL with pagination and filter parameters
    let url = `https://dev.to/api/articles?username=${username}&per_page=${perPage}&page=${page}`;
//   let url = `https://dev.to/api/articles?username=rahulladumor&per_page=10`;

//   if (tag) {
//     url += `&tag=${encodeURIComponent(tag)}`;
//   }

//   if (state && state !== "fresh") {
//     url += `&state=${encodeURIComponent(state)}`;
//   }

//   if (top) {
//     url += `&top=${encodeURIComponent(top)}`;
//   }

  try {
    const response = await fetch(url, {
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`DEV API responded with status: ${response.status}`);
    }

    const articles = await response.json();

    if (!articles || !Array.isArray(articles)) {
      throw new Error("Invalid response format from DEV Community API");
    }

    console.log("🚀 ~ articles:", articles);
    // Transform the data to match expected format
    const transformedArticles = articles.map((article) => ({
      id: article.id,
      title: article.title,
      description: article.description,
      url: article.url,
      canonical_url: article.canonical_url,
      published_at: article.published_at,
      created_at: article.created_at,
      edited_at: article.edited_at,
      crossposted_at: article.crossposted_at,
      published_timestamp: article.published_timestamp,
      tag_list: article.tag_list,
      tags: article.tags,
      slug: article.slug,
      path: article.path,
      user: {
        name: article.user?.name,
        username: article.user?.username,
        twitter_username: article.user?.twitter_username,
        github_username: article.user?.github_username,
        user_id: article.user?.user_id,
        website_url: article.user?.website_url,
        profile_image: article.user?.profile_image,
        profile_image_90: article.user?.profile_image_90,
      },
      organization: article.organization,
      flare_tag: article.flare_tag,
      cover_image: article.cover_image,
      social_image: article.social_image,
      readable_publish_date: article.readable_publish_date,
      comments_count: article.comments_count,
      public_reactions_count: article.public_reactions_count,
      collection_id: article.collection_id,
      body_markdown: article.body_markdown,
      positive_reactions_count: article.positive_reactions_count,
      page_views_count: article.page_views_count,
      published: article.published,
      reading_time_minutes: article.reading_time_minutes,
    }));

    // Calculate pagination metadata
    const totalArticles = transformedArticles.length;
    const hasNextPage = totalArticles === perPage; // If we got full page, there might be more
    const hasPrevPage = page > 1;

    res.status(200).json({
      status: "success",
      message: "Articles fetched successfully from DEV Community",
      count: totalArticles,
      data: transformedArticles,
      pagination: {
        page: page,
        per_page: perPage,
        count: totalArticles,
        has_next_page: hasNextPage,
        has_prev_page: hasPrevPage,
        next_page: hasNextPage ? page + 1 : null,
        prev_page: hasPrevPage ? page - 1 : null,
      },
      filters: {
        tag: tag || null,
        state: state,
        top: top || null,
      },
    });
  } catch (error) {
    console.error("Error fetching articles from DEV Community:", error.message);

    res.status(500).json({
      status: "error",
      message: "Failed to fetch articles from DEV Community",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
      data: [],
      pagination: {
        page: page,
        per_page: perPage,
        count: 0,
        has_next_page: false,
        has_prev_page: false,
        next_page: null,
        prev_page: null,
      },
      filters: {
        tag: tag || null,
        state: state,
        top: top || null,
      },
    });
  }
});

// @desc    Get single article from DEV Community by ID
// @route   GET /api/articles/:id
// @access  Public
const getArticleById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const apiKey =
    process.env.DEV_COMMUNITY_API_KEY || "hfqg2GeuqRv3gZ9qvhR8VyBw";

  if (!apiKey) {
    return res.status(500).json({
      status: "error",
      message: "DEV Community API key not configured",
    });
  }

  const url = `https://dev.to/api/articles/${id}`;

  try {
    const response = await fetch(url, {
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return res.status(404).json({
          status: "error",
          message: "Article not found",
        });
      }
      throw new Error(`DEV API responded with status: ${response.status}`);
    }

    const article = await response.json();

    res.status(200).json({
      status: "success",
      message: "Article fetched successfully from DEV Community",
      data: article,
    });
  } catch (error) {
    console.error("Error fetching article from DEV Community:", error.message);

    res.status(500).json({
      status: "error",
      message: "Failed to fetch article from DEV Community",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
});

module.exports = {
  getArticles,
  getArticleById,
};
