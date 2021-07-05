module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "wikidocs",
  },
  plugins: [
    {
      resolve: "gatsby-plugin-local-search",
      options: {
        name: "pages",
        engine: "flexsearch",
        engineOptions: {
          encode: "icase",
          tokenize: "forward",
          async: false,
        },
        query: `
        {
          allMdx {
              nodes {
                excerpt
                rawBody
                fields {
                  slug
                  title
                }
              }
            }
          }      
        `,
        ref: "slug",
        index: ["title", "rawBody"],
        store: ["id", "slug", "title", "excerpt"],
        normalizer: ({ data }) =>
          data.allMdx.nodes.map((node) => ({
            id: node.id,
            slug: node.fields.slug,
            title: node.fields.title,
            rawBody: node.rawBody,
            excerpt: node.excerpt,
          })),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 704,
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: false,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-breadcrumb`,
      options: {
        useAutoGen: true,
        exclude: [
          `**/dev-404-page/**`,
          `**/404/**`,
          `**/404.html`,
          `**/offline-plugin-app-shell-fallback/**`,
        ],
        excludeOptions: {
          separator: ".",
        },
        crumbLabelUpdates: [
          {
            pathname: "/",
            crumbLabel: "Index",
          },
        ],
        trailingSlashes: true,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-theme-ui`,
  ],
};
