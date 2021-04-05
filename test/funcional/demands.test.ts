import { Demand } from '@src/models/demand';
import { User } from '@src/models/user';
import AuthService from '@src/services/auth';

describe('Demands functional test', () => {
  const defaultUser = {
    name: 'John Doe',
    email: 'john@mail.com',
    password: '1234',
  };

  let token: string;

  beforeEach(async () => {
    await Demand.deleteMany({});
    await User.deleteMany({});
    const user = await new User(defaultUser).save();
    token = AuthService.generateToken(user.toJSON());
  });

  describe('When creating a new demand', () => {
    it('should create a demand with success', async () => {
      const newDemand = {
        title: 'comprar leite',
        describe: 'Para o café da tarde',
      };

      const response = await global.testRequest
        .post('/demands')
        .set({ 'x-access-token': token })
        .send(newDemand);
      expect(response.status).toBe(201);
      expect(response.body).toEqual(expect.objectContaining(newDemand));
    });
  });
});
