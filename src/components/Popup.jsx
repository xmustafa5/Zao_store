import React from 'react'

const Popup = () => {
  return (
    <div className="popup">
          <form onSubmit={handleSubmit}>
            <h3>{selectedProduct.title}</h3>
            <img
              src={selectedProduct.imgUrl}
              alt={selectedProduct.title}
              width={110}
            />
            <p>Price: ${price}</p>
            {/* Display the price */}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
            />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              required
            />
            <input
              type="tel"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="Number"
              required
            />
            <input
              type="text"
              value={discountCode}
              onChange={handleDiscountCodeChange}
              placeholder="Discount Code"
              required
            />
            <button type="button" onClick={applyDiscountCode}>
              Apply Code
            </button>
            <button type="submit">Buy Now</button>
          </form>
        </div>
  )
}

export default Popup