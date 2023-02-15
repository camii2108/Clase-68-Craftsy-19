const { readJSON, writeJSON } = require("../data");

module.exports = {
  list: (req, res) => {
    const products = readJSON('products.json');

    return res.render("admin/adminProducts", {
      products,
    });
  },
  /* Lo que estoy haciendo es buscar un  prodducto un detalle  */
  detail: (req, res) => {
    const products = readJSON('products.json');

    const product = products.find((product) => product.id === +req.params.id);

    return res.render("productDetail", {
      product,
    });
  },
  /* estoy devolciendo lo que recibo por query  */
  search: (req, res) => {
    return res.send(req.query)
  },
  /* Re nderiza el fornulario el cual le estoy mandadndo categorias. ME ESTA FALTANDO MANDARLE CATEGORIAS  */
  add: (req, res) => {

    return res.render("productAdd",{
      categories : readJSON('categories.json')/* Con esto me evito crear var y let, ya que le mando el json */
    });
  },
  /*  */
  store: (req, res) => {

      const products = readJSON('products.json');
      const { name, price, category, description, discount, brand } = req.body;      

      const newProduct = {
        id: products.length ? products[products.length - 1].id + 1 : 1,
        name: name.trim(),
        price: +price,
        discount: +discount,
        category,
        brand,
        description : description.trim(),
        image : req.file ? req.file.filename : null,
      };

      products.push(newProduct);

      writeJSON('products.json', products)

      return res.redirect("/");/* No es un render, es recibir una RUTA, sin esta no existe te salta error */
   
  },
  edit: (req, res) => {
    const products = readJSON('products.json');

    const product = products.find((product) => product.id === +req.params.id);

    return res.render("productEdit", {
      product,
    });
  },
  update: (req, res) => {
      const { name, price, category, description, discount } = req.body;      
      const products = readJSON('products.json');

      const productsModify = products.map((product) => {
        if (product.id === +req.params.id) {

          let productModify = {
            ...product,
            name: name.trim(),
            price: +price,
            category,
            brand,
            description: description.trim(),
            images : req.file ? req.file.name : product.image,
           /*  mainImage : req.files && req.files.mainImage ? req.files.mainImage[0].filename : product.mainImage, */
          };
        
          return productModify;
        }
        return product;
      });

     writeJSON('products.json', productsModify)

      return res.redirect("/products");

  },

  remove: (req, res) => {

    const productFilter = products.filter((product) => product.id !== +req.params.id);

    writeJSON('products.json', productFilter)


    return res.redirect("/products");
  },

};
