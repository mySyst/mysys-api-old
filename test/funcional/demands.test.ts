describe('Demands functional test', () => {
  describe('When creating a demand', () => {
    it('should create a demand with success', async () => {
      const newDemand = {
        title: 'comprar leite',
        describe: 'Para o café da tarde',
      };

      const response = await global.testRequest
        .post('/demands')
        .send(newDemand);
      expect(response.status).toBe(201);
      expect(response.body).toEqual(expect.objectContaining(newDemand));
    });
  });
});
