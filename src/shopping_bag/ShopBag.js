import React, { Component } from 'react';

const FormForShopBag = ({submitProduct, inputPrice, inputProduct, onChangeInput}) => {
    return (
        <form onSubmit={submitProduct}>
            <label><p> Продукт </p>
                <input name="inputProduct" value={inputProduct} onChange={onChangeInput} type="text"/>
            </label>
            <label><p> Цена </p>
                <input name="inputPrice" required value={inputPrice} min="0" onChange={onChangeInput}  type="number"/>
            </label>
            <button type="submit">Добавить</button>
        </form>
    )
 
}

const ProductLine = ({product}) => {
    return(
        <tr>
            <td>{product.name}</td>
            <td>{product.price} </td>
            <td>{product.priceDisc}</td>
        </tr>
    )
}

const ListProducts = ({products}) => {
    console.log(products)
  
    return(
        <table>
            <thead>
                <tr>
                    <th>Продукт</th>
                    <th>Цена</th>
                    <th>Цена со скидкой</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => 
                    <ProductLine 
                    key={product.id}
                    product={product} />
                )}
            </tbody>
        </table>
    )
}

const FormDiscount = ({discoutSum, submitDiscoutSum, onChangeInput}) => {
    return(
        <form onSubmit={submitDiscoutSum}>
            <span className="margin-r">Применить скидку</span>
            <input className="margin-r" name="discoutSum" required min="0" value={discoutSum} onChange={onChangeInput} type="number"/>
            <span className="margin-r">рублей</span> 
            <button type="submit">Применить</button>
        </form>
    )
}

class ShopBag extends Component {
    state = {
        inputProduct: '',
        inputPrice: '',
        discoutSum: '',
        products: []
    }

    onChangeInput = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({[name]: value})
    }

    submitProduct = event => {
        event.preventDefault()
        this.setState({
            products: [
                ...this.state.products,
                {
                    id: this.state.products.length,
                    name: this.state.inputProduct,
                    price: parseInt(this.state.inputPrice),
                    priceDisc: parseInt(this.state.inputPrice)
                }
            ]
        })
        this.setState({inputProduct: ''})
        this.setState({inputPrice: ''})
        
    }

    submitDiscoutSum = event => {
           event.preventDefault();
           let sum = 0;
           this.state.products.map((product) => {
                sum += product.price
           })
           let persent = parseInt(this.state.discoutSum) / sum * 100;
           var prodcs=[];
           var max = 0;
           var maxInd;
           var sumDiscProduct = 0;
           this.state.products.map((product, ind) => {
               let withDisc = Math.round(product.price - product.price / 100 * persent);
               sumDiscProduct += product.price - withDisc;
               
               (withDisc < 0) ? withDisc = 0 : null
               let pr = [{...product, priceDisc: withDisc}]
               prodcs = [...prodcs, {...product, priceDisc: withDisc}]

               if (max < product.price) {
                   max = product.price
                   maxInd = ind
               }
            //    this.setState({
            //        products: [
            //            ...this.state.products.slice(0, ind),
            //            {...pr},
            //            ...this.state.products.slice(ind + 1)
            //        ]
            //    })
                console.log(product)
           }) 

           this.setState({products: prodcs})

           var surplus = parseInt(this.state.discoutSum) - sumDiscProduct 
           if (surplus != 0 ) {
               let discM = this.state.products[maxInd].priceDisc - surplus;
                (discM < 0) ? discM = 0 : null
               this.setState({
                   products: [
                       ...this.state.products.slice(0, maxInd),
                       {...this.state.products[maxInd], priceDisc: discM},
                       ...this.state.products.slice(maxInd + 1)
                   ]
               })
           }
    
    }

    render() {
     
        return(
            <div className="shop-bag">
                <h2>Добавить продукт</h2>
                <FormForShopBag 
                    onChangeInput={this.onChangeInput}
                    inputProduct={this.state.inputProduct}
                    inputPrice={this.state.inputPrice}
                    submitProduct={this.submitProduct}
                />
                <hr></hr>
                <h2>Корзина</h2>
                <ListProducts 
                    products={this.state.products}
                />
                <FormDiscount 
                     onChangeInput={this.onChangeInput}
                     discoutSum={this.state.discoutSum}
                     submitDiscoutSum={this.submitDiscoutSum}
                />
            </div>
        )
    }
}

export default ShopBag;