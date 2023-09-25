 import CartContext from '../../store/cart-context';
 import React,{Fragment, useState} from 'react';
 import { useContext } from 'react';
 import classes from './Cart.module.css';
 import Modal from '../UI/Modal';
 import CartItem from './CartItem'; 
 import Checkout from './Checkout';
 const Cart = props=>{
    const [isSubmitting,setIsSubmitting]=useState(false);
    const [didSubmit,setDidSubmit]=useState(false);
    const [isCheckout,setIsCheckout]=useState(false);
    const cartCtx=useContext(CartContext);
    const totalAmount=`$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems=cartCtx.items.length>0;
    const cartItemRemoveHandler=id=>{
        cartCtx.removeItem(id)
    };
    const cartItemAddHandler=item=>{
        cartCtx.addItem({...item,amount:1});
    };
    const submitOrderHandler=async (userdata)=>{
        console.log("asogf")
        setIsSubmitting(true);
        await fetch('https://react-meals-9a506-default-rtdb.firebaseio.com/orders.json',{
            method:'Post',
            body:JSON.stringify(
                {
                    user:userdata,
                    orderedItems:cartCtx.items
                }
            )
        })
        setIsSubmitting(false);
        setDidSubmit(true);
    }
    const cartItems=(
        <ul className={classes['cart-items']}>
            {cartCtx.items.map(item=>(
                <CartItem 
                key={item.id} 
                name={item.name} 
                amount={item.amount} 
                price={item.price}
                onRemove={cartItemRemoveHandler.bind(null,item.id)}
                onAdd={cartItemAddHandler.bind(null,item)} />
            ))}
        </ul>
    )
    const orderHandler=()=>{
        setIsCheckout(true);
   
    }
  
    const Cart=(
    <React.Fragment>
        {cartItems}
    <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
    </div>
    {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}/>}
    {!isCheckout && <div className={classes.actions}>
        <button className={classes['button--alt'] } onClick={props.onClose}>Close</button>
        {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>
}</React.Fragment>)
    return <Modal onClose={props.onClose}>
        {!isSubmitting && !didSubmit && Cart}
        {isSubmitting && !didSubmit && <p>please wait...</p>}
        {!isSubmitting && didSubmit && <p>Succesfully ordered.</p>}  
    </Modal >

}
export default Cart;