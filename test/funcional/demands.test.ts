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
    // LGPD e JSON Web Token
    token = AuthService.generateToken(user.id);
  });

  describe('When creating a new demand', () => {
    it('should create a demand with success', async () => {
      const newDemand = {
        title: 'Demanda A',
        describe: 'A demanda',
      };

      const response = await global.testRequest
        .post('/demands')
        .set({ 'x-access-token': token })
        .send(newDemand);
      expect(response.status).toBe(201);
      //Object containing matches the keys and values, even if includes other keys such as id.
      expect(response.body).toEqual(expect.objectContaining(newDemand));
    });
  });

  it('should return 500 when there is any error other than validation error', async () => {
    jest
      .spyOn(Demand.prototype, 'save')
      .mockImplementationOnce(() => Promise.reject('fail to create Demands'));
    const newDemands = {
      title: 'Demanda A',
      describe: 'A demanda',
    };

    const response = await global.testRequest
      .post('/demands')
      .send(newDemands)
      .set({ 'x-access-token': token });
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      code: 500,
      error: 'Something went wrong!',
    });
  });
});
