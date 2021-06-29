const startCase = require('lodash/startCase');
/* per costruire la gerarchia del sito tramite file json viene dapprima importato il file json 
   Esiste la necessità di creare la gerarchia durante la creazione del sito con gatsby-node perchè 
   altrimenti ogni url non risulterebbe conforme con la vera gerarchia dei file*/
const toc = require('./content/888toc.json')


/* la routine treeify prende il contenuto del file json e crea una gerarchia
   basata sui campi myId e myParent (se il campo myParent di un oggetto è presente già nella gerarchia
   come myId allora quell'oggetto sarà inserito come nodo figlio del secondo oggetto).
   Inoltre ogni url di ogni oggetto viene creato a seconda della gerarchia (eg. padre/figlio/nipote) */
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
/* la gerarchia generata da treeify() viene salvata in una variabile */
const gerarchia = treeify();

/* la routine findUrl() serve per cercare l'url corretto all'interno della gerarchia a seconda del nome */
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
    /* per ogni file mdx all'interno di content 
       cerca il nome del file all'interno della gerarchia e ritorna il path completo */
    const item = findUrl(node.fields.slug, gerarchia)

    actions.createPage({
      /* imposta il path della pagina come path cercato precedentemente
         oppure imposta a '/' se il nome del file è index */
      path: (node.fields.slug !== '/') ? item.myAAttr.myHref : '/',

      /* per ogni file mdx all'interno di content viene creata una pagina prendendo come layout  
         '/src/templates/docs' */
      component: require.resolve('./src/templates/docs'),
      context: {
        id: node.fields.id,
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


/* una volta creata la gerarchia con la routine treeify() viene inserita
   come nodo all'interno di GraphQL sotto forma di stringa */
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