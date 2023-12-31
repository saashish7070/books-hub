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


exports.user_profile = async (req, res) => {
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

exports.user_detail = async (req, res) => {
  try {
    const id = req.params.id;
    const foundUser = await User.findById(id);

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

exports.user_profile_detail = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(id)
    const foundUser = await User.findOne({uid: id});
    // console.log(foundUser)
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
exports.user_detail_updated = async (req, res) => {
  try {
    const id = req.params.id;
    const updateFields = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { _id: id }, // Find the user by ID
      { $set: updateFields }, // Update specific fields using $set
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with the updated user details for success
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    // Respond with an error message for internal server error
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.wishlist_display = async (req, res) => {
  try {
    
    const id = req.params.id;
    // console.log(userId)

    // Find the user by UID or any other identifier
    const foundUser = await User.findOne({ uid: id });
    
    if (!foundUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if the user has any books in the wishlist
    if (!foundUser.bookId || foundUser.bookId.length === 0) {
      return res.status(200).json({ message: 'No books found in the wishlist' });
    }
    // console.log(foundUser.bookId.toString())
    // If there are books in the wishlist, fetch the details
    const wishlistItems = await Promise.all(
      foundUser.bookId.map(async (bookId) => {
        // Assuming each bookId is a valid ObjectId
        const book = await Book.findById(bookId);
        // console.log(book)
        return book; // Modify this based on your Book model structure
      })
    );
    // console.log(wishlistItems)
    res.status(200).json(wishlistItems);
  } catch (error) {
    console.error('Error fetching wishlist data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

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
    
    foundBook.wishlistUsers.push(foundUser._id);
    // foundBook.buyerId = foundUser._id;
    await foundBook.save();
    
    return res.status(200).json({ message: 'Book added to your cart successfully' });
  } catch (error) {
    console.error('Error updating user bookId and book buyerId:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
exports.wishlist_remove = async (req, res) => {
  try {
    const userId = req.params.id; // Assuming the user ID is passed as a parameter in the URL
    const { bookId } = req.body; // Assuming the book ID is sent in the request body

    // Find the user by ID
    const foundUser = await User.findById(userId);

    if (!foundUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the book is in the user's wishlist
    const bookIndex = foundUser.bookId.indexOf(bookId);
    if (bookIndex === -1) {
      return res.status(404).json({ message: 'Book not found in the wishlist' });
    }

    // Remove the book from the user's wishlist
    foundUser.bookId.splice(bookIndex, 1);
    await foundUser.save();

    // Find the book by ID
    const foundBook = await Book.findById(bookId);

    if (!foundBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Iterate over the wishlistUsers of the foundBook and remove the user ID
    foundBook.wishlistUsers = foundBook.wishlistUsers.filter(wishlistUserId => wishlistUserId.toString() !== userId);
    await foundBook.save();

    res.status(200).json({ message: 'Book removed from the wishlist successfully' });
  } catch (error) {
    console.error('Error removing book from wishlist:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



exports.item_list_display = async (req, res) => {
  try {
    
    const id = req.params.id;
    // console.log(userId)

    // Find the user by UID or any other identifier
    const foundUser = await User.findOne({ uid: id });

    if (!foundUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user has any books in the wishlist
    if (!foundUser.bookList || foundUser.bookList.length === 0) {
      return res.status(200).json({ message: 'No books found in the itemList' });
    }

    // If there are books in the wishlist, fetch the details
    const itemList = await Promise.all(
      foundUser.bookList.map(async (bookList) => {
        // Assuming each bookList is a valid ObjectId
        const book = await Book.findById(bookList);
        return book; // Modify this based on your Book model structure
      })
    );
    // console.log(itemList)
    res.status(200).json(itemList);
  } catch (error) {
    console.error('Error fetching wishlist data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.item_list_remove = async (req, res) => {
  try {
    const userId = req.params.id; // Assuming the user ID is passed as a parameter in the URL
    const { bookList } = req.body; // Assuming the book ID is sent in the request body

    // Find the user by ID
    const foundUser = await User.findById(userId);

    if (!foundUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the book is in the user's bookList
    const bookIndex = foundUser.bookList.indexOf(bookList);
    if (bookIndex === -1) {
      return res.status(404).json({ message: 'Book not found in the book list' });
    }

    // Remove the book from the user's bookList
    foundUser.bookList.splice(bookIndex, 1);
    await foundUser.save();

    // Find and delete the book by ID
    const deletedBook = await Book.findByIdAndDelete(bookList);

    // Iterate over the wishlistUsers of the deletedBook and remove the user ID
    for (const userId of deletedBook.wishlistUsers) {
      const user = await User.findById(userId);
      if (user) {
        const userBookIndex = user.bookId.indexOf(bookList);
        if (userBookIndex !== -1) {
          user.bookId.splice(userBookIndex, 1);
          await user.save();
        }
      }
    }

    res.status(200).json({ message: 'Book removed from the book list successfully', item: deletedBook });
  } catch (error) {
    console.error('Error removing book from book list:', error);
    res.status(500).json({ message: 'Internal server error' });
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
