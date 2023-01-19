import Airtable from 'airtable';

class SessionRepository {
    constructor() {
      const airtable = new Airtable({
        apiKey: import.meta.env.VITE_AIRTABLE_API_KEY,
        // endpointUrl: process.env.AIRTABLE_ENDPOINT_URL,
      });
      this.base = airtable.base(import.meta.env.VITE_AIRTABLE_BASE_ID);
    }
  
    async getAll(setState) {
      // get all records from the table
      const result = new Promise((resolve, reject) => {
        this.base('Sessions')
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
                const games = records.map((record) => SessionRepository.recordToSession(record));
                resolve(games);
                setState(games);
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
    async create({ name }) {
      const result = new Promise((resolve, reject) => {
        this.base('Sessions').create(
          {
            name,
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
                const book = SessionRepository.recordToSession(record);
  
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
  
      const result = new Promise((resolve, reject) => {
        this.base('Sessions').update(
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
              const book = SessionRepository.recordToSession(records[0]);
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
        this.base('Sessions').destroy([id], (err) => {
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
  
    static recordToSession(record) {
      return {
        name: record.get('name'),
      };
    }
  }

  export default SessionRepository;