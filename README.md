### README

# E-Commerce Website

This project is a simple e-commerce website built with modern web technologies. It includes essential features such as product listing, shopping cart, and checkout functionality using Stripe for payment processing.

## Features

- **Product Listing**: View a list of available products.
- **Shopping Cart**: Add, update, and remove products in the cart.
- **Checkout**: Checkout process with Stripe integration.
- **User Authentication**: Basic user registration and login.
- **Admin View**: Includes an admin dashboard, product listing (add, update, remove products), order listing (update status of order) 

## Technologies Used

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB

### Installation

1. **Clone the repository**
2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```env
   MONGODB_URI=your_mongodb_connection_string
   STRIPE_SECRET_KEY=your_stripe_secret_key
   NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_public_key
   NEXTAUTH_URL=(e.g., http://localhost:3000)
   NEXTAUTH_SECRET=secret
   JWT_SECRET=secret
   BACKEND_API_URL=(e.g., http://localhost:3000)
   NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_public_stripe_secret_key
   NEXT_PUBLIC_URL=(e.g., http://localhost:3000)
   ```



## License

This project is licensed under the MIT License.

---
