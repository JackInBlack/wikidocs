module.exports = {
  siteMetadata: {
    title: `Wiki`,
    name: `Wiki`,
    siteUrl: `https://codebushi.com`,
    description: `This is my description that will be used in the meta tags and important for search results`,
    
    sidebarConfig: {
      forcedNavOrder: ['/'],
      ignoreIndex: false
    }
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        name: 'pages',
        engine: 'flexsearch',
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
        ref: 'slug',
        index: ["title", "rawBody"],
        store: ['id', 'slug', 'title', 'excerpt'],
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
      resolve: `gatsby-plugin-breadcrumb`,
      options: {
        useAutoGen: true,
        exclude: [
          `**/dev-404-page/**`,
          `**/404/**`,
          `**/404.html`,
          `**/offline-plugin-app-shell-fallback/**`
        ],
        excludeOptions: {
          separator: '.'
        },
        crumbLabelUpdates: [
          {
            pathname: '/',
            crumbLabel: 'Index'
          }
        ],
        trailingSlashes: true,
     },
  }, 
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content`,
        name: `content`
      }
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 704
            }
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: false
            }
          },
          `gatsby-remark-embed-video`
        ]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Document`,
        short_name: `Document`,
        start_url: `/`,
        background_color: `#182952`,
        theme_color: `#a2466c`,
        display: `standalone`,
        icon: 'static/site-icon.png'
      }
    },
    `gatsby-plugin-sharp`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-theme-ui`,
    `gatsby-plugin-react-helmet`
  ]
};
