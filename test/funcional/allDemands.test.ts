import { Demand } from "@src/models/demand";
import { User } from '@src/models/user';
import AuthService from '@src/services/auth';

describe('Demands funcional test', () => {
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
    const defaultDemand = {
      title: 'Demanda A',
      describe: 'A demanda',
      user: user.id
    };
    await new Demand(defaultDemand).save();
    // LGPD e JSON Web Token
    token = AuthService.generateToken(user.id);
  });

  it('should return a list of demands from the authenticated user in the application', async () => {
    const { body, status } = await global.testRequest
      .get('/alldemands')
      .set({ 'x-access-token': token });
    expect(status).toBe(200);
    expect(body).toEqual([
      {
        demands: [
          {
            title: 'Comprar leite',
            description: 'Compras para tomar café da tarde',
          },
          {
            title: 'Comprar Café',
            description: 'Compras para tomar café da tarde',
          },
        ],
      },
    ]);
  });
});
