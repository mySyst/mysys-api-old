describe('Demands funcional test', () => {
  it('should return a demand simple', async () => {
    const { body, status } = await global.testRequest.get('/alldemands');
    expect(status).toBe(200);
    expect(body).toEqual([
      {
        demands: [
          {
            id: 1,
            title: 'Comprar leite',
            description: 'Compras para tomar café da tarde',
          },
          {
            id: 2,
            title: 'Comprar Café',
            description: 'Compras para tomar café da tarde',
          },
        ],
      },
    ]);
  });
});
