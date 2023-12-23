const Store = require('../models/store')
const User = require('../models/user')

exports.store_list = async (req, res) => {
  try {
    const stores = await Store.find({});
    res.json(stores);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.store_detail = async (req, res) => {
  try {

    const id = req.params.id; // Extract the id from the params
    // console.log(id)
    const user = await User.findById(id)
    // console.log(user)
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};



exports.store_create_get = (req, res) => {
  res.json({ message: "Not implemented yet" });
};

exports.store_create_post = async (req, res) => {
  try {
    const store = new Store(req.body);
    const savedstore = await store.save();
    res.json(savedstore);
    // console.log(savedstore)
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.store_books_get = async(req,res)=>{
  try {
    const id = req.params.id; // Extract the id from the params
    const store = await Store.findById(id)
    const booksId = store.booksId;
    if(booksId.length>0){
      const books = await Book.find({_id:{$in:booksId}})
      // console.log(books);
      res.json(books);
    }else{
      console.log("No Book")
      res.json({message: "No Book in the store"})
    }

  }
  catch(err){
    console.log(err)
    res.status(500).json({message:"Internal server error"}) 
  }
}
exports.store_books_post = async (req, res) => {
  try {
    const { bookIds } = req.body;
    const store = await Store.findById(req.params.id);

    bookIds.forEach((bookId) => {
      if (!store.booksId.includes(bookId)) {
        store.booksId.push(bookId);
      }
    });

    const updatedStore = await store.save();
    res.json(updatedStore);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// exports.store_update_get = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const store = await Store.findById(id);
//     if (!store) {
//       res.status(404).json({ message: "store not found" });
//     } else {
//       res.json(store);
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// exports.store_update_post = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const store = await Store.findById(id);
//     if (!store) {
//       res.status(404).json({ message: "store not found" });
//     } else {
//       store.title = req.body.title;
//       store.author = req.body.author;
//       store.description = req.body.description;
//       store.price = req.body.price;
//       store.image = req.body.image;

//       const savedstore = await store.save();
//       res.json(savedstore);
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// exports.store_delete_get = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const store = await Store.findById(id);
//     if (!store) {
//       res.status(404).json({ message: "store not found" });
//     } else {
//       res.json(store);
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// exports.store_delete = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const deletedstore = await Store.findByIdAndDelete(id);
//     if (!deletedstore) {
//       res.status(404).json({ message: "store not found" });
//     } else {
//       res.json(deletedstore);
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
