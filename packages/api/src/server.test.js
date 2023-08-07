const request = require('supertest');
const server = require('./server');

describe('GET /', () => {
  it('should return a JSON object with a "home" property', async () => {
    const response = await request(server).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ home: "Welcome" });
  });
});

describe('POST /payouts', () => {
  it('should return the expected response for a given input', async () => {
    const expenses = [
      { "name": "Adriana", "amount": 5.75 },
      { "name": "Adriana", "amount": 5.75 },
      { "name": "Bao", "amount": 12 }
    ];

    const expectedResponse = {
      "total": 23.5,
      "equalShare": 11.75,
      "payouts": [
        {
          "owes": "Adriana",
          "owed": "Bao",
          "amount": 0.25
        }
      ]
    };

    const response = await request(server).post('/payouts').send({ expenses });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResponse);
  });

  it('should return the expected response for a given input', async () => {
    const expenses = [
      { name: "John", amount: 10 },
      { name: "Bob", amount: 20 },
      { name: "John", amount: 15 },
    ];

    const expectedResponse = {
      total: 45,
      equalShare: 22.5,
      payouts: [
        { owes: 'John', owed: 'Bob', amount: 2.5 },
      ],
    };

    const response = await request(server).post('/payouts').send({ expenses });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResponse);
  });
});
