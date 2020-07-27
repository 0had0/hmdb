import { UPDATE_NAME } from 'constants/user';

export const updateName = (payload) => ({
  type: UPDATE_NAME,
  payload,
});
