import Airtable from 'airtable';

class BookRepository {
    constructor() {
      const airtable = new Airtable({
        apiKey: import.meta.env.VITE_AIRTABLE_API_KEY,
        // endpointUrl: process.env.AIRTABLE_ENDPOINT_URL,
      });
      this.base = airtable.base(import.meta.env.VITE_AIRTABLE_BASE_ID);
    }
  
    async getAll() {
      // get all records from the table
      const result = new Promise((resolve, reject) => {
        this.base('Book')
          .select({
            view: 'Grid view',
          })
          .all((err, records) => {
            try {
              if (err) {
                if (err instanceof Error) {
                  reject(err);
                } else {
                  reject(new Error(err));
                }
                return;
              }
              if (records) {
                const books = records.map((record) => BookRepository.recordToBook(record));
                resolve(books);
              } else {
                reject(new Error(err));
              }
            } catch (error) {
              reject(error);
            }
          });
      });
  
      return result;
    }
    async get(isbn) {
      const result = new Promise<IBook | null>((resolve, reject) => {
        this.base('Book')
          .select({
            view: 'Grid view',
            filterByFormula: `isbn = '${isbn}'`,
            maxRecords: 1,
          })
          .firstPage((err, records) => {
            try {
              if (err) {
                if (err instanceof Error) {
                  reject(err);
                } else {
                  reject(new Error(err));
                }
                return;
              }
              if (records && records.length > 0) {
                const book = BookRepository.recordToBook(records[0]);
                resolve(book);
              } else {
                resolve(null);
              }
            } catch (e) {
              reject(e);
            }
          });
      });
      // get the book with the given id
      return result;
    }
    async create({ isbn, title, author, borrowedAt = new Date(0), returnedAt = new Date(1000), borrower }) {
      const isExist = await this.get(isbn);
      if (isExist) {
        throw new Error(`Book with ISBN ${isbn} already exists. Please use the update method to update the book.`);
      }
      // create a new record in the table
      const result = new Promise<IBook>((resolve, reject) => {
        this.base('Book').create(
          {
            isbn,
            title,
            author,
            borrowedAt: borrowedAt.toISOString(),
            returnedAt: returnedAt.toISOString(),
            borrower,
          },
          (err, record) => {
            try {
              if (err) {
                if (err instanceof Error) {
                  reject(err);
                } else {
                  reject(new Error(err));
                }
                return;
              }
              if (record) {
                const book = BookRepository.recordToBook(record);
  
                resolve(book);
              } else {
                reject(new Error('No record'));
              }
            } catch (e) {
              reject(e);
            }
          },
        );
      });
  
      return result;
    }
    async update(isbn, { title, author, borrowedAt, returnedAt, borrower }){
      // get the record id
      const id = await this.getIdFromIsbn(isbn);
  
      const result = new Promise<IBook>((resolve, reject) => {
        this.base('Book').update(
          [
            {
              id,
              fields: {
                isbn,
                title,
                author,
                borrowedAt: borrowedAt?.toISOString(),
                returnedAt: returnedAt?.toISOString(),
                borrower,
              },
            },
          ],
          (err, records) => {
            if (err) {
              if (err instanceof Error) {
                reject(err);
              } else {
                reject(new Error(err));
              }
              return;
            }
            if (records) {
              const book = BookRepository.recordToBook(records[0]);
              resolve(book);
            } else {
              reject(new Error('No record'));
            }
          },
        );
      });
  
      return result;
    }
  
    async delete(isbn) {
      // get the record id
      const id = await this.getIdFromIsbn(isbn);
      const result = new Promise((resolve, reject) => {
        this.base('Book').destroy([id], (err) => {
          if (err) {
            if (err instanceof Error) {
              reject(err);
            } else {
              reject(new Error(err));
            }
            return;
          }
          resolve();
        });
      });
  
      return result;
    }
  
    async getIdFromIsbn(isbn) {
      const result = new Promise<string>((resolve, reject) => {
        this.base('Book')
          .select({
            view: 'Grid view',
            filterByFormula: `isbn = '${isbn}'`,
            maxRecords: 1,
          })
          .firstPage((err, records) => {
            if (err) {
              if (err instanceof Error) {
                reject(err);
              } else {
                reject(new Error(err));
              }
              return;
            }
            if (records) {
              const id = records[0].getId();
              resolve(id);
            } else {
              reject(new Error(err));
            }
          });
      });
      return result;
    }
  
    static recordToBook(record) {
      return {
        isbn: record.get('isbn'),
        title: record.get('title'),
        author: record.get('author'),
        createdAt: new Date(record.get('createdAt')),
        updatedAt: new Date(record.get('updatedAt')),
        borrowedAt: new Date(record.get('borrowedAt')),
        returnedAt: new Date(record.get('returnedAt')),
        borrower: record.get('borrower'),
      };
    }
  
    static isBorrowed(book) {
      const borrowedAt = book.borrowedAt;
      const returnedAt = book.returnedAt;
      return borrowedAt > returnedAt;
    }
  }