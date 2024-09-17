const { getAllBooks, addBook, getBookById, updateBook, deleteBook } = require('./src/controllers/bookController');
const db = require('./src/config/db');
const { mockRequest } = require('mock-req-res');

jest.mock('./src/config/db'); 

describe('Book Controller', () => {
  test('get all books', async () => {
    const req = mockRequest();
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    const books = [{ id: 1, title: 'Book 1', author: 'Author 1', isbn: '1234567890123', price: 19.99 }];

    db.query.mockResolvedValue([books]);
    await getAllBooks(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'All book records',
      data: books
    });
  });

  test('add a new book', async () => {
    const req = mockRequest({
      body: {
        title: 'New Book',
        author: 'New Author',
        isbn: '9876543210987',
        price: 29.99
      }
    });
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

    db.query.mockResolvedValue({ affectedRows: 1 });

    await addBook(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Book added successfully',
    });
  });

  test('get a book by ID', async () => {
    const req = mockRequest({ params: { id: 1 } });
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    const book = [{ id: 1, title: 'Book 1', author: 'Author 1', isbn: '1234567890123', price: 19.99 }];

    db.query.mockResolvedValue([book]);

    await getBookById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Book details',
      data: book[0],
    });
  });

  test('update a book', async () => {
    db.query.mockResolvedValue([{ affectedRows: 1 }]);

    const req = mockRequest({
      params: { id: 1 },
      body: {
        title: 'Updated Book',
        author: 'Updated Author',
        isbn: '1234567890123',
        price: 25.99
      }
    });
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

    await updateBook(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Book updated successfully',
    });
  });

  test('delete a book', async () => {
    db.query.mockResolvedValue([{ affectedRows: 1 }]);

    const req = mockRequest({ params: { id: 1 } });
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };

    await deleteBook(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Book Deleted Successfully',
    });
  });
});
