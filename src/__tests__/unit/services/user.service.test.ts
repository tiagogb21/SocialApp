import { expect } from 'chai';
import sinon from 'sinon';
import UsersModel from '../../../database/models/User.model';
import UserService from '../../../services/User.service';
import { userMock1, userMockWithId, usersMockArray } from '../../mocks/user.mock';

describe('user Service', () => {
  const userModel = new UsersModel();
  const userService = new UserService(userModel)

	before(() => {
		sinon.stub(userModel, 'create').resolves(userMockWithId);
		sinon.stub(userModel, 'readOne')
      .onCall(0).resolves(userMockWithId)
      .onCall(1).resolves(null);
    sinon.stub(userModel, "read").resolves(usersMockArray)
    sinon.stub(userModel, "delete")
      .onCall(0).resolves(userMock1).onCall(1).resolves(null)
    sinon.stub(userModel, "update")
      .onCall(0).resolves(userMock1).onCall(1).resolves(null);
	});

	after(() => {
		sinon.restore();
	});

  describe('creating a user', () => {
		it('successfully created', async () => {
			const newUser = await userService.create(userMock1);
      console.log(newUser)
			expect(newUser).to.be.deep.equal(userMockWithId);
		});
	});

  describe('searching a user', () => {
		it('successfully found', async () => {
			const userFound = await userService.readOne('4edd40c86762e0fb12000003');
			expect(userFound).to.be.deep.equal(userMockWithId);
		});

		it('_id not found', async () => {
			try {
				await userService.readOne('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq('Object not found');
			}
		});
	});

  describe('Get all users', () => {
    it('successfully found', async () => {
      const usersFound = await userService.read();
      expect(usersFound).to.be.deep.equal(usersMockArray)
    });
  });

  describe('delete a user', () => {
		it('successfully delete', async () => {
			const userDeleted = await userService.delete('4edd40c86762e0fb12000003');
			expect(userDeleted).to.be.deep.equal(userMock1);
		});

		it('_id not found', async () => {
			try {
				await userService.delete('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq('EntityNotFound');
			}
		});
	});

  describe('update a user', () => {
		it('successfully update', async () => {
			const userUpdated = await userService.update('4edd40c86762e0fb12000003', userMock1);
			expect(userUpdated).to.be.deep.equal(userMock1);
		});

		it('_id not found', async () => {
			try {
				await userService.update('123ERRADO', userMock1);
			} catch (error: any) {
				expect(error.message).to.be.eq('Object not found');
			}
		});
	});

});
