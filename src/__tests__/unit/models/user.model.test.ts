import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';

import UsersModel from '../../../database/models/User.model';
import { userMock1, userMockWithId, usersMockArray } from '../../mocks/user.mock';

describe('user Model', () => {
  const userModel = new UsersModel();

	before(() => {
		sinon.stub(Model, 'create').resolves(userMockWithId);
		sinon.stub(Model, 'findOne')
      .onCall(0).resolves(userMockWithId)
      .onCall(1).resolves(null);
    sinon.stub(Model, "find").resolves(usersMockArray)
    sinon.stub(Model, "findByIdAndDelete")
			.onCall(0).resolves(userMock1).onCall(1).resolves(null);
    sinon.stub(Model, "findByIdAndUpdate")
			.onCall(0).resolves(userMock1).onCall(1).resolves(null);
	});

	after(() => {
		sinon.restore();
	});

  describe('creating a user', () => {
		it('successfully created', async () => {
			const newUser = await userModel.create(userMock1);
			expect(newUser).to.be.deep.equal(userMockWithId);
		});
	});

  describe('searching a user', () => {
		it('successfully found', async () => {
			const userFound = await userModel.readOne('4edd40c86762e0fb12000003');
			expect(userFound).to.be.deep.equal(userMockWithId);
		});

		it('_id not found', async () => {
			try {
				await userModel.readOne('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
	});

  describe('Get all users', () => {
    it('successfully found', async () => {
      const usersFound = await userModel.read();
      expect(usersFound).to.be.deep.equal(usersMockArray)
    });
  });

  describe('delete a user', () => {
		it('successfully delete', async () => {
			const userDeleted = await userModel.delete('4edd40c86762e0fb12000003');
			expect(userDeleted).to.be.deep.equal(userMock1);
		});

		it('_id not found', async () => {
			try {
				await userModel.delete('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
	});

  describe('update a user', () => {
		it('successfully update', async () => {
			const userUpdated = await userModel.update('4edd40c86762e0fb12000003', userMock1);
			expect(userUpdated).to.be.deep.equal(userMock1);
		});

		it('_id not found', async () => {
			try {
				await userModel.update('123ERRADO', userMock1);
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
	});

});
