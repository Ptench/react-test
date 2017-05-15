import React, { Component } from 'react';

const FormForShopBag = ({submitProduct, inputPrice, inputProduct, onChangeInput}) => {
    return (
        <form onSubmit={submitProduct}>
            <label>Продукт
                <input name="inputProduct" value={inputProduct} onChange={onChangeInput} type="text"/>
            </label>
            <label>Цена
                <input name="inputPrice" value={inputPrice} onChange={onChangeInput}  type="text"/>
            </label>
            <button type="submit">Добавить</button>
        </form>
    )
 
}

const ListProducts = () => {
    
}

class ShopBag extends Component {
    state = {
        inputProduct: '',
        inputPrice: '',
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
                    price: this.state.inputPrice
                }
            ]
        })
        this.setState({inputProduct: ''})
        this.setState({inputPrice: ''})
           console.log(this.state)
    }

    render() {
     
        return(
            <FormForShopBag 
                onChangeInput={this.onChangeInput}
                inputProduct={this.state.inputProduct}
                submitProduct={this.submitProduct}
            />
        )
    }
}

export default ShopBag;