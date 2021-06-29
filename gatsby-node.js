const startCase = require('lodash/startCase');
const toc = require('./content/888toc.json')

const treeify = () => {
  var idAttr = 'myId';
  var parentAttr = 'myParent';
  var childrenAttr = 'items';

  var treeList = [];
  var lookup = {};
  toc.forEach(obj => {
      lookup[obj[idAttr]] = obj;
      obj[childrenAttr] = [];
      obj.myAAttr.myHref = "/" + obj.myAAttr.myHref.replace(/\.[^/.]+$/, "");
  });
  toc.forEach(obj => {
      if(lookup[obj[parentAttr]])
      { 
        obj.myAAttr.myHref =  lookup[obj[parentAttr]].myAAttr.myHref + obj.myAAttr.myHref
        lookup[obj[parentAttr]][childrenAttr].push(obj)
      }
      else
      {
        treeList.push(obj)
      } 
  });
  return treeList;
}
const gerarchia = treeify();
const findUrl = (slug, arr) => {
  return arr.reduce((a, item) => {
    if (a) return a;
    if (item.myAAttr.myHref.includes(slug)) return item;
    if (item.items) return findUrl(slug, item.items);
  }, null);
}
exports.createPages = async ({ actions, graphql, reporter }) => {
  const result = await graphql(
    `
      {
        allMdx {
          edges {
            node {
              fields {
                id
                slug
              }
              tableOfContents
            }
          }
        }
      }
    `
  );
  if (result.errors) {
    reporter.panic('error loading content', result.errors);
    return;
  }
  result.data.allMdx.edges.forEach(({ node }) => {
    const item = findUrl(node.fields.slug, gerarchia)
    actions.createPage({
      path: (node.fields.slug !== '/') ? item.myAAttr.myHref : '/',
      component: require.resolve('./src/templates/docs'),
      context: {
        id: node.fields.id,
        crumbLabel: item.myText
      }
    });
  });
};

exports.onCreateNode = ({ node, getNode, actions, reporter }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent);
    const title = node.frontmatter.title || startCase(parent.name)

    let value =  node.frontmatter.slug;
    if(!value && parent.relativePath){
      value = parent.relativePath.replace(parent.ext, '');
    }
    
    if (!value) {
      reporter.panic(`Can not create node with title: ${title} there is no relative path or frontmatter to set the "slug" field`);
      return;
    }

    if (value === 'index') {
      value = '';
    }

    createNodeField({
      name: `slug`,
      node,
      value: `/${value}`
    });

    createNodeField({
      name: 'id',
      node,
      value: node.id
    });

    createNodeField({
      name: 'title',
      node,
      value: title
    });
  }
};

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  const node = {
    /*
    id: createNodeId(`toc-${t.myId}`),*/
    content: JSON.stringify(gerarchia),
    id: createNodeId(`toc`),
    internal: {
      type: "tree",
      contentDigest: createContentDigest(gerarchia),
    },
  }
    actions.createNode(node)
}