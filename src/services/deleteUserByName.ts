import { httpRequest } from '@/services';

const deleteUserByName = (userName: string) => {
  return httpRequest.delete('/User/deleteUser', {
    params: {
      userName
    }
  }) 
};

export {
  deleteUserByName
};