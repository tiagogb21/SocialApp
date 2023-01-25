import { expect } from 'chai';
import * as sinon from 'sinon';
import { Request, Response } from 'express';
import httpStatusCode from 'http-status-codes';

// MOCKS
import { userMock1, userMockWithId, usersMockArray } from '../../mocks/user.mock';
import {userModelController, userModelService} from '../../../factories/user.factory';


describe('User Controller', () => {
  let req = {} as Request;
  let res = {} as Response;

  before(() => {
    sinon.stub(userModelService, 'create').resolves(userMockWithId);
		sinon.stub(userModelService, 'readOne')
      .onCall(0).resolves(userMockWithId)
      .onCall(1).resolves(null);
    sinon.stub(userModelService, "read").resolves(usersMockArray)
    sinon.stub(userModelService, "delete")
      .onCall(0).resolves(userMock1).onCall(1).resolves(null)
    sinon.stub(userModelService, "update")
      .onCall(0).resolves(userMock1).onCall(1).resolves(null);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore()
  })

  describe('Create User', () => {
    it('Success', async () => {
      req.body = userMock1;
      await userModelController.create(req, res);
      expect((res.status as sinon.SinonStub).calledWith(httpStatusCode.CREATED));
      expect((res.json as sinon.SinonStub).calledWith(userMock1));
    });
  });

  describe('ReadOne User', () => {
    it('Success', async () => {
      req.params = { id: userMockWithId._id };
      await userModelController.readOne(req, res);
      expect((res.status as sinon.SinonStub).calledWith(httpStatusCode.CREATED));
      expect((res.json as sinon.SinonStub).calledWith(userMock1));
    });
  });

  describe('Read all Users', () => {
		it('Success', async () => {
			await userModelController.read(req, res);
      expect((res.status as sinon.SinonStub).calledWith(httpStatusCode.CREATED));
      expect((res.json as sinon.SinonStub).calledWith(usersMockArray));
		});
	});
});
