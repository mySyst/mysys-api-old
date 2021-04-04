describe('Demands funcional test', () => {
  it('should return a demand simple', async () => {
    const { body, status } = await global.testRequest.get('/demands');
    expect(status).toBe(200);
    expect(body).toEqual([
      {
        demands: [
          {
            id: 1,
            title: 'Comprar leite',
            description: 'Compras para tomar café da tarde',
            time: '2021-04-02T08:00+00:00',
          },
          {
            id: 2,
            title: 'Comprar Café',
            description: 'Compras para tomar café da tarde',
            time: '2021-04-02T09:00+00:00',
          },
        ],
      },
    ]);
  });
});
