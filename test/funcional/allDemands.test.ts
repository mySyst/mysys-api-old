import { Demand } from '@src/models/demand';
import { User } from '@src/models/user';
import AuthService from '@src/services/auth';
import allModelDemands from '@test/Fixtures/demands.json';
import nock from 'nock';

describe('Testing functions for all demands', () => {
  const defaultUser = {
    name: 'John Doe',
    email: 'john@mail.com',
    password: '1234',
  };

  let token: string;
  let userId: string;
  const mockedDate = "2021-04-10T23:06:06.666Z";

  beforeEach(async () => {
    await Demand.deleteMany({});
    // await User.deleteMany({});
    const user = await new User(defaultUser).save();
    userId = user.id;
    token = AuthService.generateToken(user.id);
    console.log(`user: ${user}`)
    console.log(`user id: ${user.id}`)
    console.log(`token: ${token}`)
    console.log(`user id: ${userId}`)
    const defaultDemand = {
      title: 'Demanda A',
      describe: 'A demanda',
      userId: user.id,
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
      jest
      .spyOn(global, 'Date')
      .mockImplementationOnce(() => {return mockedDate});
      nock('http://127.0.0.1:50263', {
          encodedQueryParams: true,
          reqheaders: {
            Authorization: token,
          },
      })
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get('/alldemands')
        .query({
            title: 'Demanda A',
            describe: 'A demanda',
            params: /(.*)/
        })
        .reply(200, allModelDemands);
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
          },
          {
            title: 'Demanda B',
            describe: 'B demanda',
            userId: userId,
          },
        ],
      },
    ]);
    nock.recorder.rec();
  });
});
