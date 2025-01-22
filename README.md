# DishDash Kitchen App

## Overview
The kitchen app for DishDash Helper allows restaurant kitchen staff to manage incoming orders, track the progress of food preparation, and update order status.

## Features
- **Incoming Orders**: View and manage new orders.
- **Order Progress**: Update order statuses from "Preparing" to "Ready for Delivery."
- **Real-Time Updates**: Notify the delivery partner and user when the order is ready.
- **Order History**: Track past orders and preparation times.
- **Push Notifications**: Receive alerts for new orders and order updates.

## Tech Stack
- **Frontend**: React Native, Redux, TailwindCSS
- **Backend**: Communicates with `dishdash-backend`
- **Real-Time Communication**: Socket.IO
- **Deployment**: Google Play / Apple App Store

## Setup
1. Clone the repository:  
    `git clone https://github.com/yourusername/dishdash-kitchen-app.git`
2. Install dependencies:  
    `npm install`
3. Set up API endpoint in `.env` to connect with the backend.
4. Run the app:  
    `npm start` (for development) or deploy to Google Play/Apple App Store.

## Contributing
1. Fork the repo.
2. Create a feature branch.
3. Commit changes.
4. Submit a pull request.

## License
MIT License.
