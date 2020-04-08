import { SHOW_ALERT } from './actionTypes';

export function showAlert(open, text, type) {
  return {
    type: SHOW_ALERT,
    payload: { open, text, type },
  };
}

// export const setAlert = (msg, alertType) => (dispatch) => {
//   const id = uuid.v4();
//   dispatch(
//     {
//       type: actionTypes.SET_ALERT,
//       payload: { msg, alertType, id },
//     },
//     console.log('alert sent'),
//   );
//   setTimeout(
//     () =>
//       dispatch(
//         { type: actionTypes.REMOVE_ALERT, payload: id },
//         console.log('alert removed'),
//       ),
//     2000,
//   );
// };

// export const removeAlert = (id) => (dispatch) => {
//   dispatch(
//     { type: actionTypes.REMOVE_ALERT, payload: id },
//     console.log('manual remove'),
//   );
// };
