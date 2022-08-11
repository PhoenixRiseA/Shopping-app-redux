import ProductItem from './ProductItem';
import classes from './Products.module.css';
const productsArr = [
  {id:'e1',title:'Navy Blue',quantity:1,price:'200',description:"For kids"},
  {id:'e2',title:'Black',quantity:1,price:'400',description:"For adults"},
  {id:'e3',title:'Yellow',quantity:1,price:'300',description:"For seniors"},
  {id:'e4',title:'Pink',quantity:1,price:'700',description:"For women"},];
const Products = (props) => {
  console.log(productsArr);
  const productList = productsArr.map(({id,title,quantity,price,description})=>(
    <ProductItem
    item={{ title: title, quantity: quantity, price: price,description:description, id:id,key:id }}
          
        />
  ));
  console.log(productList);
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {productList}
      </ul>
    </section>
  );
};

export default Products;
