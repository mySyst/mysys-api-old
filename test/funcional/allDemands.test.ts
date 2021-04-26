import { Demand } from '@src/models/demand';
import { User } from '@src/models/user';
import AuthService from '@src/services/auth';
import { Mongoose } from 'mongoose';
import nock from 'nock';

describe('Testing functions for all demands', () => {
  const defaultUser = {
    name: 'John Doe',
    email: 'john@mail.com',
    password: '1234',
  };

  let token: string;
  let userId: string;
  let createdAt: Date;
  let updatedAt: Date;

  beforeEach(async () => {
    await Demand.deleteMany({});
    await User.deleteMany({});
    const user = await new User(defaultUser).save();
    userId = user.id;
    token = AuthService.generateToken(user.id);
    const defaultDemand = {
      title: 'Demanda A',
      describe: 'A demanda',
      userId: user.id,
      createdAt: createdAt,
      updatedAt: updatedAt,
    };
    const defaultDemand1 = {
      title: 'Demanda B',
      describe: 'B demanda',
      userId: user.id,
    };
    await new Demand(defaultDemand).save();
    await new Demand(defaultDemand1).save();
    nock.recorder.rec();
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
            title: 'Demanda A',
            describe: 'A demanda',
            userId: userId,
            createdAt: createdAt,
            updatedAt: updatedAt,
          },
          {
            title: 'Demanda B',
            describe: 'B demanda',
            userId: userId,
            createdAt: createdAt,
            updatedAt: updatedAt,
          },
        ],
      },
    ]);
    nock.recorder.rec();
  });
});
