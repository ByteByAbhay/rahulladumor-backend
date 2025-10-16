const express = require("express");
const { getArticles, getArticleById } = require("../controllers/articles.controller");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     ArticleUser:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: User's full name
 *           example: "Rahul Ladumor"
 *         username:
 *           type: string
 *           description: User's username
 *           example: "rahulladumor"
 *         twitter_username:
 *           type: string
 *           nullable: true
 *           description: User's Twitter username
 *           example: "rahulladumor"
 *         github_username:
 *           type: string
 *           nullable: true
 *           description: User's GitHub username
 *           example: "rahulladumor"
 *         user_id:
 *           type: integer
 *           description: User's unique ID
 *           example: 123456
 *         website_url:
 *           type: string
 *           nullable: true
 *           description: User's website URL
 *           example: "https://rahulladumor.com"
 *         profile_image:
 *           type: string
 *           description: User's profile image URL
 *           example: "https://res.cloudinary.com/practicaldev/image/fetch/s--example--/c_fill,f_auto,fl_progressive,h_640,q_auto,w_640/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/example.jpg"
 *         profile_image_90:
 *           type: string
 *           description: User's 90px profile image URL
 *           example: "https://res.cloudinary.com/practicaldev/image/fetch/s--example--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/example.jpg"
 *     
 *     Article:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Article unique identifier
 *           example: 1234567
 *         title:
 *           type: string
 *           description: Article title
 *           example: "Building Modern Web Applications with React and Node.js"
 *         description:
 *           type: string
 *           description: Article description/summary
 *           example: "Learn how to build scalable web applications using React and Node.js with best practices and modern tools."
 *         url:
 *           type: string
 *           description: Article URL on DEV Community
 *           example: "https://dev.to/rahulladumor/building-modern-web-applications-123"
 *         canonical_url:
 *           type: string
 *           nullable: true
 *           description: Canonical URL if crossposted
 *           example: "https://rahulladumor.com/blog/building-modern-web-applications"
 *         published_at:
 *           type: string
 *           format: date-time
 *           description: Publication date and time
 *           example: "2024-01-15T10:30:00Z"
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Creation date and time
 *           example: "2024-01-15T09:00:00Z"
 *         edited_at:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Last edit date and time
 *           example: "2024-01-15T11:00:00Z"
 *         crossposted_at:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Crosspost date and time
 *         published_timestamp:
 *           type: string
 *           format: date-time
 *           description: Published timestamp
 *           example: "2024-01-15T10:30:00Z"
 *         tag_list:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of tags
 *           example: ["react", "nodejs", "javascript", "webdev"]
 *         tags:
 *           type: string
 *           description: Comma-separated tags
 *           example: "react, nodejs, javascript, webdev"
 *         slug:
 *           type: string
 *           description: Article slug
 *           example: "building-modern-web-applications-123"
 *         path:
 *           type: string
 *           description: Article path
 *           example: "/rahulladumor/building-modern-web-applications-123"
 *         user:
 *           $ref: '#/components/schemas/ArticleUser'
 *         organization:
 *           type: object
 *           nullable: true
 *           description: Organization details if applicable
 *         flare_tag:
 *           type: object
 *           nullable: true
 *           description: Flare tag details
 *         cover_image:
 *           type: string
 *           nullable: true
 *           description: Cover image URL
 *           example: "https://res.cloudinary.com/practicaldev/image/fetch/s--example--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/example.jpg"
 *         social_image:
 *           type: string
 *           description: Social media image URL
 *           example: "https://res.cloudinary.com/practicaldev/image/fetch/s--example--/c_imagga_scale,f_auto,fl_progressive,h_500,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/example.jpg"
 *         readable_publish_date:
 *           type: string
 *           description: Human-readable publish date
 *           example: "Jan 15"
 *         comments_count:
 *           type: integer
 *           description: Number of comments
 *           example: 25
 *         public_reactions_count:
 *           type: integer
 *           description: Number of public reactions
 *           example: 150
 *         collection_id:
 *           type: integer
 *           nullable: true
 *           description: Collection ID if part of a series
 *         body_markdown:
 *           type: string
 *           description: Article content in markdown format
 *         positive_reactions_count:
 *           type: integer
 *           description: Number of positive reactions
 *           example: 142
 *         page_views_count:
 *           type: integer
 *           description: Number of page views
 *           example: 1250
 *         published:
 *           type: boolean
 *           description: Whether the article is published
 *           example: true
 *         reading_time_minutes:
 *           type: integer
 *           description: Estimated reading time in minutes
 *           example: 8
 *     
 *     PaginationInfo:
 *       type: object
 *       properties:
 *         page:
 *           type: integer
 *           description: Current page number
 *           example: 1
 *         per_page:
 *           type: integer
 *           description: Number of items per page
 *           example: 9
 *         count:
 *           type: integer
 *           description: Number of articles in current response
 *           example: 9
 *         has_next_page:
 *           type: boolean
 *           description: Whether there are more pages available
 *           example: true
 *         has_prev_page:
 *           type: boolean
 *           description: Whether there are previous pages available
 *           example: false
 *         next_page:
 *           type: integer
 *           nullable: true
 *           description: Next page number if available
 *           example: 2
 *         prev_page:
 *           type: integer
 *           nullable: true
 *           description: Previous page number if available
 *           example: null
 *     
 *     FilterInfo:
 *       type: object
 *       properties:
 *         tag:
 *           type: string
 *           nullable: true
 *           description: Tag filter applied
 *           example: "javascript"
 *         state:
 *           type: string
 *           description: State filter applied
 *           example: "fresh"
 *         top:
 *           type: string
 *           nullable: true
 *           description: Top filter applied
 *           example: "7"
 *     
 *     ArticlesResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "success"
 *         message:
 *           type: string
 *           example: "Articles fetched successfully from DEV Community"
 *         count:
 *           type: integer
 *           description: Number of articles returned in current response
 *           example: 9
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Article'
 *         pagination:
 *           $ref: '#/components/schemas/PaginationInfo'
 *         filters:
 *           $ref: '#/components/schemas/FilterInfo'
 *     
 *     SingleArticleResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "success"
 *         message:
 *           type: string
 *           example: "Article fetched successfully from DEV Community"
 *         data:
 *           $ref: '#/components/schemas/Article'
 *     
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "error"
 *         message:
 *           type: string
 *           example: "Failed to fetch articles from DEV Community"
 *         error:
 *           type: string
 *           description: Detailed error message (development only)
 *         data:
 *           type: array
 *           items: {}
 *           description: Empty array on error
 *         pagination:
 *           $ref: '#/components/schemas/PaginationInfo'
 *         filters:
 *           $ref: '#/components/schemas/FilterInfo'
 */

/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Get articles from DEV Community with pagination and filters
 *     description: Fetches articles directly from DEV Community API for user 'rahulladumor' with support for pagination, tag filtering, and sorting options.
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: Page number for pagination (default 1)
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *           example: 1
 *       - in: query
 *         name: per_page
 *         required: false
 *         description: Number of articles per page (default 9, max 1000)
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 1000
 *           default: 9
 *           example: 9
 *       - in: query
 *         name: tag
 *         required: false
 *         description: Filter articles by tag (e.g., javascript, react, nodejs)
 *         schema:
 *           type: string
 *           example: "javascript"
 *       - in: query
 *         name: state
 *         required: false
 *         description: Filter articles by state
 *         schema:
 *           type: string
 *           enum: [fresh, rising, all]
 *           default: "fresh"
 *           example: "fresh"
 *       - in: query
 *         name: top
 *         required: false
 *         description: Filter top articles by time period (number representing days, weeks, months, or years)
 *         schema:
 *           type: string
 *           example: "7"
 *     responses:
 *       200:
 *         description: Articles fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArticlesResponse'
 *             example:
 *               status: "success"
 *               message: "Articles fetched successfully from DEV Community"
 *               count: 3
 *               data:
 *                 - id: 1234567
 *                   title: "Building Modern Web Applications with React and Node.js"
 *                   description: "Learn how to build scalable web applications using React and Node.js with best practices and modern tools."
 *                   url: "https://dev.to/rahulladumor/building-modern-web-applications-123"
 *                   published_at: "2024-01-15T10:30:00Z"
 *                   tag_list: ["react", "nodejs", "javascript", "webdev"]
 *                   user:
 *                     name: "Rahul Ladumor"
 *                     username: "rahulladumor"
 *                   comments_count: 25
 *                   public_reactions_count: 150
 *                   reading_time_minutes: 8
 *               pagination:
 *                 page: 1
 *                 per_page: 9
 *                 count: 3
 *                 has_next_page: false
 *                 has_prev_page: false
 *                 next_page: null
 *                 prev_page: null
 *               filters:
 *                 tag: "javascript"
 *                 state: "fresh"
 *                 top: null
 *       500:
 *         description: Server error or DEV Community API error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: "error"
 *               message: "Failed to fetch articles from DEV Community"
 *               data: []
 *               pagination:
 *                 page: 1
 *                 per_page: 9
 *                 count: 0
 *                 has_next_page: false
 *                 has_prev_page: false
 *                 next_page: null
 *                 prev_page: null
 *               filters:
 *                 tag: null
 *                 state: "fresh"
 *                 top: null
 */
router.get("/", getArticles);

/**
 * @swagger
 * /api/articles/{id}:
 *   get:
 *     summary: Get single article by ID from DEV Community
 *     description: Fetches a specific article by its ID directly from DEV Community API
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The article ID from DEV Community
 *         schema:
 *           type: integer
 *           example: 1234567
 *     responses:
 *       200:
 *         description: Article fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SingleArticleResponse'
 *             example:
 *               status: "success"
 *               message: "Article fetched successfully from DEV Community"
 *               data:
 *                 id: 1234567
 *                 title: "Building Modern Web Applications with React and Node.js"
 *                 description: "Learn how to build scalable web applications using React and Node.js with best practices and modern tools."
 *                 url: "https://dev.to/rahulladumor/building-modern-web-applications-123"
 *                 published_at: "2024-01-15T10:30:00Z"
 *                 tag_list: ["react", "nodejs", "javascript", "webdev"]
 *                 user:
 *                   name: "Rahul Ladumor"
 *                   username: "rahulladumor"
 *                 comments_count: 25
 *                 public_reactions_count: 150
 *                 reading_time_minutes: 8
 *                 body_markdown: "# Building Modern Web Applications\n\nThis article covers..."
 *       404:
 *         description: Article not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Article not found"
 *       500:
 *         description: Server error or DEV Community API error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: "error"
 *               message: "Failed to fetch article from DEV Community"
 */
router.get("/:id", getArticleById);

module.exports = router;
