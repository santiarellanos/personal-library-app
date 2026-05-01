const {
  getUserLibrary,
  getUserStats,
  updateBookShelf,
  removeBookFromLibrary
} = require("../src/controllers/libraryController");
const User = require("../src/models/User");

jest.mock("../src/models/User");
jest.mock("../src/models/Book", () => ({
  findOne: jest.fn(),
  create: jest.fn()
}));

const createMockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("libraryController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should successfully fetch a user's populated library", async () => {
    const req = { user: { userId: "123" } };
    const res = createMockRes();
    const savedBooks = [{ shelf: "To Read", format: "Paperback", book: { title: "Book A" } }];
    const populate = jest.fn().mockResolvedValue({ savedBooks });
    User.findById.mockReturnValue({ populate });

    await getUserLibrary(req, res);

    expect(User.findById).toHaveBeenCalledWith("123");
    expect(populate).toHaveBeenCalledWith("savedBooks.book");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(savedBooks);
  });

  test("should calculate reading stats correctly", async () => {
    const req = { user: { userId: "123" } };
    const res = createMockRes();
    const savedBooks = [
      { shelf: "Read", book: { pageCount: 300 } },
      { shelf: "Read", book: { pageCount: null } },
      { shelf: "Currently Reading", book: { pageCount: 150 } },
      { shelf: "To Read", book: {} }
    ];
    const populate = jest.fn().mockResolvedValue({ savedBooks });
    User.findById.mockReturnValue({ populate });

    await getUserStats(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      totalBooks: 4,
      booksRead: 2,
      booksCurrentlyReading: 1,
      totalPagesRead: 300
    });
  });

  test("should update a shelf for a saved book", async () => {
    const req = {
      user: { userId: "123" },
      params: { bookId: "book123" },
      body: { shelf: "Read" }
    };
    const res = createMockRes();
    User.findOneAndUpdate.mockResolvedValue({ _id: "123" });

    await updateBookShelf(req, res);

    expect(User.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: "123", "savedBooks.book": "book123" },
      { $set: { "savedBooks.$.shelf": "Read" } },
      { new: true }
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Shelf updated successfully.",
      shelf: "Read"
    });
  });

  test("should remove a book from the user's library", async () => {
    const req = { user: { userId: "123" }, params: { bookId: "book123" } };
    const res = createMockRes();
    User.findById.mockResolvedValue({ _id: "123" });
    User.updateOne.mockResolvedValue({ acknowledged: true, modifiedCount: 1 });

    await removeBookFromLibrary(req, res);

    expect(User.updateOne).toHaveBeenCalledWith(
      { _id: "123" },
      { $pull: { savedBooks: { book: "book123" } } }
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Book removed successfully." });
  });
});
