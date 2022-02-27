import Parse from 'parse';
import {
  CREATE_MEME_LOADING,
  CREATE_MEME_SUCCESS,
  CREATE_MEME_ERROR,
  RENDER_INITIAL_STATE,
  CREATE_MEME_TRANSACTION_LOADING,
  CREATE_MEME_TRANSACTION_ERROR,
  CREATE_MEME_TRANSACTION_SUCCESS,
  CREATE_MEME_TRANSACTION_HASH_LOADING,
  CREATE_MEME_TRANSACTION_HASH_SUCCESS,
  CREATE_MEME_TRANSACTION_HASH_ERROR,
} from '../types';
import { message as antdMessage } from 'antd';
import toBase64 from '../../utils/to-base-64';
import { handleParseError } from '../../utils/error-handling/index';
import MemesChainCore from '../../eth-build/meme';
import web3 from '../../utils/web3/index';
// import { providerCurrentAccount } from '../web3-actions';
import { getCurrentUser } from '../parse-actions';
import { providerNetwork, providerInstalled } from '../web3-actions';

export const createMeme = ({ meme }) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_MEME_LOADING, payload: {} });
    const blob = await toBase64(meme);
    const { data } = await Parse.Cloud.run('post_meme', { meme: blob });
    if (data) {
      dispatch({
        type: CREATE_MEME_SUCCESS,
        payload: {
          success: {
            ok: true,
            ...data,
          },
        },
      });
    } else {
      dispatch({
        type: CREATE_MEME_SUCCESS,
        payload: {
          success: {
            ...data,
            ok: false,
          },
        },
      });
    }
  } catch (e) {
    const { code, message } = handleParseError(e);
    dispatch({
      type: CREATE_MEME_ERROR,
      payload: {
        errors: {
          error: true,
          code,
          message,
        },
      },
    });
  }
};

export const signTransaction = ({ hash, dId, loader = false, value = 0 }) => async (dispatch) =>  {
  // let hashFromOn;
  // let tryingForTxCount = 10;

  if (hash && dId) {
    // const getRecieptAndSubmit = () => {
    //   const handle = setInterval(() => {
    //     web3.eth.getTransactionReceipt(hashFromOn).then((resp) => {
    //       if (resp != null && resp.blockNumber > 0) {
    //         clearInterval(handle);
    //         const { transactionHash: txHash, ...extras } = resp;
    //         const { memeId } = web3.eth.abi.decodeLog(
    //           [
    //             { type: 'uint256', name: 'memeId' },
    //             { type: 'bytes', name: 'hash' },
    //           ],
    //           resp.logs[0].data, // 0th log
    //           resp.logs[0].topics, // All the topics array
    //         );

    //         dispatch({
    //           type: CREATE_MEME_TRANSACTION_SUCCESS,
    //           payload: {
    //             success: {
    //               ok: true,
    //               txHash,
    //               memeId,
    //               ...extras,
    //             },
    //           },
    //         });
    //       } else {
    //         // No resp ... still waiting.. please hold on
    //         tryingForTxCount--;
    //         antdMessage.warning(`Please wait. ${tryingForTxCount} tries remaining. Waiting for your transaction completion.`);
    //         if (tryingForTxCount === 1) {
    //           clearInterval(handle);
    //           (async () => {
    //             try {
    //               antdMessage.info('Please wait... Trying to save your transaction');
    //               await Parse.Cloud.run('put_meme', { txHash: hashFromOn, dId });
    //               antdMessage.warning('We got your transaction ID, but could not confirm transaction mined status.');
    //               dispatch({
    //                 type: CREATE_MEME_TRANSACTION_ERROR,
    //                 payload: {
    //                   errors: {
    //                     error: true,
    //                     message: 'Your meme will be available in the My Memes section after it is mined. Keep checking',
    //                     txHash: hashFromOn,
    //                     dId,
    //                   },
    //                 },
    //               });
    //               return false;
    //             } catch (e) {
    //               dispatch({
    //                 type: CREATE_MEME_TRANSACTION_ERROR,
    //                 payload: {
    //                   errors: {
    //                     error: true,
    //                     message: 'Oops! We could not save your Tx id. Please report this to avoid further delay.',
    //                     txHash: hashFromOn,
    //                     dId,
    //                   },
    //                 },
    //               });
    //               return false;
    //             }
    //           })();
    //         }
    //       }
    //     }).catch(({ message = ' ' }) => {
    //       dispatch({
    //         type: CREATE_MEME_TRANSACTION_ERROR,
    //         payload: {
    //           errors: {
    //             error: true,
    //             message: message.split('\n')[0],
    //           },
    //         },
    //       });
    //     });
    //   }, 3000);
    // };

    try {
      if (loader) {
        dispatch({
          type: CREATE_MEME_TRANSACTION_LOADING,
          payload: {},
        });
      }
      const { payload: hasProvider } = providerInstalled();
      if (!hasProvider) {
        throw new Error('Please install Metamask and try again.');
      }

      const [account] = await web3.eth.getAccounts();
      if (!account) {
        throw new Error('Your wallet seems to be locked. Please unlock the wallet and try again');
      }

      const { payload: { username, memer } } = getCurrentUser();
      
      if (username.toLowerCase() !== account.toLowerCase()) {
        // Never split this string error to multiple lines
        throw new Error(
          `Account address for user: ${memer}, is ${username}. Logout from this account or please change your current selected account, from ${account} to ${username}`,
        );
      }

      // const { payload: network } = await providerNetwork()(() => {});
      // if (!network) {
      //   // Dont split to new lines here
      //   throw new Error('You are not on the Main Ethereum network. Please switch to the Main network inside Metamask plugin and try again.');
      // }
      const {
        transactionHash: txHash,
        ...rest
      } = await MemesChainCore.methods
        .createMeme(hash, dId)
        .send({
          from: account,
          value: web3.utils.toWei(value.toString(), 'ether'),
          gasPrice: await web3.eth.getGasPrice(),
        })
        .once('transactionHash', hashfromOnce => antdMessage.info('Transaction obtained. Waiting for confirmation. This might take upto 15 seconds...'));
      dispatch({
        type: CREATE_MEME_TRANSACTION_SUCCESS,
        payload: {
          success: {
            ok: true,
            txHash,
            memeId: rest.events.MemeCreated.returnValues.memeId,
            ...rest,
          },
        },
      });
    } catch (asdf) {
			console.error("asfdasdf asdf asdf ", asdf)
      // if (message.includes('not mined within')) {
      //   getRecieptAndSubmit();
      // } else {
      //   dispatch({
      //     type: CREATE_MEME_TRANSACTION_ERROR,
      //     payload: {
      //       errors: {
      //         error: true,
      //         message: message.split('\n')[0],
      //       },
      //     },
      //   });
      // }

      dispatch({
        type: CREATE_MEME_TRANSACTION_ERROR,
        payload: {
          errors: {
            error: true,
            message: ''//message.split('\n')[0],
          },
        },
      });
    }
  }
};

// export const saveTransactionHash = ({ txHash, dId, memeId }) => async (dispatch) => {
//   try {
//     dispatch({ type: CREATE_MEME_TRANSACTION_HASH_LOADING, paylaod: {} });
//     const { data } = await Parse.Cloud.run('put_meme', { txHash, dId, memeId });
//     if (data) {
//       dispatch({
//         type: CREATE_MEME_TRANSACTION_HASH_SUCCESS,
//         payload: {
//           success: {
//             ok: true,
//             ...data,
//           },
//         },
//       });
//     }
//   } catch (e) {
//     const { code, message } = handleParseError(e);
//     dispatch({
//       type: CREATE_MEME_TRANSACTION_HASH_ERROR,
//       payload: {
//         errors: {
//           error: true,
//           code,
//           message,
//         },
//       },
//     });
//   }
// };

export const renderInitialState = () => ({ type: RENDER_INITIAL_STATE, payload: {} });
