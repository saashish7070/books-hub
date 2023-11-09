const mongoose = require('mongoose');
const User = require('../models/user');
const Book = require('../models/book')

exports.user_list = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.user_detail = async (req, res) => {
  try {
    const { user } = req.body;
    // Find the user by UID or any other identifier
    const foundUser = await User.findOne({ uid: user.uid });

    if (!foundUser) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.json(foundUser);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.user_detail_update = async (req, res) => {
  try {
    const { user } = req.body;
    // Find the user by UID or any other identifier
    const foundUser = await User.findOne({ uid: user.uid });

    if (!foundUser) {
      res.status(404).json({ message: "User not found" });
    } else {
      // Update user details based on the request body
      // Modify this part based on your specific requirements
      foundUser.name = user.name || foundUser.name;
      foundUser.email = user.email || foundUser.email;
      foundUser.userAddress = user.userAddress || foundUser.userAddress;
      foundUser.contact = user.contact || foundUser.contact;

      // Save the updated user
      const updatedUser = await foundUser.save();

      res.json(updatedUser);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.wishlist_display = async (req, res) => {
  try {
    const user = JSON.parse(req.headers['user-data']);
    const foundUser = await User.findOne({ uid: user.uid });
    
    if (!foundUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const booksId = foundUser.bookId.map(item => item.toString());
    
    if (booksId.length === 0) {
      return res.status(404).json({ message: 'No books found for the user' });
    }
    
    const books = [];
    
    for (const bookId of booksId) {
      const book = await Book.findById(bookId);
      if (book) {
        books.push(book);
      }
    }
    
    // console.log(books)
    res.json(books);
  } catch (err) {
    console.error('Error fetching user cart data:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.wishlist = async (req, res) => {
  try {
    const { user, bookId } = req.body;

    // Find the user by UID or any other identifier
    const foundUser = await User.findOne({ uid: user.uid });

    if (!foundUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the book is already in the user's cart
    
    // Update the buyerId field of the book
    const foundBook = await Book.findById(bookId);
    if (!foundBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    if (foundBook.sellerId.equals(foundUser._id)) {
      return res.json({ message: 'You cannot buy your own item' });
    }
    if (foundUser.bookId.includes(bookId)) {
      return res.json({ message: 'Book already selected' });
    }

    foundUser.bookId.push(bookId);
    await foundUser.save();
    
    // foundBook.booked = true;
    // foundBook.buyerId = foundUser._id;
    // await foundBook.save();

    return res.status(200).json({ message: 'Book added to your cart successfully' });
  } catch (error) {
    console.error('Error updating user bookId and book buyerId:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


exports.item_list_display = async (req, res) => {
  try {
    const user = JSON.parse(req.headers['user-data']);
    const foundUser = await User.findOne({ uid: user.uid });
    console.log(foundUser)
    
    if (!foundUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const booksId = foundUser.bookId.map(item => item.toString());
    
    if (booksId.length === 0) {
      return res.status(404).json({ message: 'No books found for the user' });
    }
    
    const books = [];
    
    for (const bookId of booksId) {
      const book = await Book.findById(bookId);
      if (book) {
        books.push(book);
      }
    }
    
    console.log(books)
    res.json(books);
  } catch (err) {
    console.error('Error fetching user cart data:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


exports.item_list = async (req, res) => {
  try {
    const { book, sellerId} = req.body;
    const foundUser = await User.findOne({ _id: sellerId });
    
    if (!foundUser) {
      return res.status(404).json({ message: 'User not found' });
    }
      foundUser.bookList.push(book);
      await foundUser.save();
      return res.status(200).json({ message: 'Your Book has been placed' });

    
    } catch (error) {
    console.error('Error updating User Book List:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};



exports.user_create_get = (req, res) => {
  res.json({ message: "Not implemented yet" });
};

exports.user_create_post = async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// exports.refresh_user_book = async (req, res) => {
//   try {
//     const { bookId, user } = req.query;
//     // console.log(bookId)
//     const foundUser = await User.findOne({ uid: user });
//     if (!foundUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }
    
//     const foundBook = await Book.findById(bookId);
    
//     if (!foundBook) {
//       return res.status(404).json({ message: 'Book not found' });
//     }
    
//     if (!foundBook.booked || foundBook.buyerId === null) {
//       const bookIndex = foundUser.bookId.indexOf(bookId);
//       if (bookIndex > -1) {
//         foundUser.bookId.splice(bookIndex, 1);
//         await foundUser.save();
//       }
//       return res.status(200).json({ message: 'Book removed from your cart' });
//     }

//     res.status(200).json({ message: 'Books refreshed successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };
// exports.user_check_out = async (req, res) => {
//   try {
//     const { billingInfo, user } = req.body;
//     const userData = await User.findOne({ uid: user.uid });
//     const userId = userData._id;

//     const { province, city, area, address, landmark, isDefaultShipping, isDefaultBilling, mobileNumber } = billingInfo;
//     userData.billingAddress = { province, city, area, address, landmark, defaultShipping: isDefaultShipping, defaultBilling: isDefaultBilling };
//     userData.contact = mobileNumber;

//     userData.checkOutBooks = userData.bookId;
//     userData.bookId = [];

//     const updatedUserData = await userData.save();

//     const bookData = await Book.find({ buyerId: userId });

    
//     bookData.forEach(async (book) => {
//       book.checkout = true;
//       book.soldOut = true;
//       await book.save();
//     });

//     res.status(200).json({ message: 'Billing information updated successfully', user: updatedUserData });
//   } catch (err) {
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };
