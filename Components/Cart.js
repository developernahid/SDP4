'use client';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Cart = ({ cart, closeCart, increaseQuantity, decreaseQuantity, removeFromCart }) => {
    const [selectedItems, setSelectedItems] = useState([]);
    console.log(selectedItems)

    const handleCheckOut = () => {
        if (selectedItems.length === 0) {
            alert("Please select at least one item to checkout.");
            return;
        }
        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to checkout ${selectedItems.length} item(s). Price: ${selectedItems.reduce((total, item) => total + item.totalPrice, 0).toFixed(2)} BDT`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, checkout!'
        }).then((result) => {
            if (result.isConfirmed) {
                const transactionId = 'TXN-' + Date.now() + '-' + Math.floor(Math.random() * 1000000);
                console.log('Transaction ID:', transactionId);
                // Save selected items to localStorage
                localStorage.setItem('selectedCartItems', JSON.stringify(selectedItems));
                // In a real app, you would navigate to the payment page
                Swal.fire('Checked Out!', 'Your selected items have been checked out. Transaction ID: ' + transactionId, 'success');
                removeFromCart();
                closeCart();
            }
        });
    }

    return (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white border border-gray-300 p-5 shadow-lg w-11/12 md:w-4/5 max-w-2xl rounded-lg">
                <h2 className="text-xl text-green-700 mb-4">Your Cart</h2>

                <div id="cart-items" className="max-h-96 overflow-y-auto">
                    {cart.length === 0 ? (
                        <p>No items in the cart.</p>
                    ) : (
                        cart.map((item, index) => (
                            <div key={index} className="flex justify-between items-center mb-3 pb-3 border-b gap-4">
                                <div>
                                    <input
                                        type="checkbox"
                                        className='w-4 h-4'
                                        id={`item-${index}`}
                                        checked={selectedItems.includes(item)}
                                        onChange={() => {
                                            if (selectedItems.includes(item)) {
                                                setSelectedItems(selectedItems.filter(i => i !== item));
                                            } else {
                                                setSelectedItems([...selectedItems, item]);
                                            }
                                        }}
                                    />
                                </div>
                                <div>
                                    <p><strong>{item.productName}</strong></p>
                                    <p>{item.quantity} x {item.price} BDT - Total: {item.totalPrice.toFixed(2)} BDT</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => decreaseQuantity(index)}
                                        className="px-3 py-1 bg-green-700 text-white border-none rounded cursor-pointer hover:bg-green-900"
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        onClick={() => increaseQuantity(index)}
                                        className="px-3 py-1 bg-green-700 text-white border-none rounded cursor-pointer hover:bg-green-900"
                                    >
                                        +
                                    </button>
                                    <button
                                        onClick={() => removeFromCart(index)}
                                        className="px-3 py-1 bg-red-600 text-white border-none rounded cursor-pointer hover:bg-red-800 ml-4"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="flex justify-end mt-4">
                    <button
                        onClick={handleCheckOut}
                        className="px-5 py-2 bg-green-700 text-white border-none rounded cursor-pointer text-base mr-2 hover:bg-green-900"
                    >
                        Checkout
                    </button>
                    <button
                        onClick={closeCart}
                        className="px-5 py-2 bg-gray-600 text-white border-none rounded cursor-pointer text-base hover:bg-gray-800"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
