import {
  CREATE_MEME_LOADING,
  CREATE_MEME_SUCCESS,
  CREATE_MEME_ERROR,
  CREATE_MEME_TRANSACTION_LOADING,
  CREATE_MEME_TRANSACTION_ERROR,
  CREATE_MEME_TRANSACTION_SUCCESS,
  RENDER_INITIAL_STATE,
  CREATE_MEME_TRANSACTION_HASH_LOADING,
  CREATE_MEME_TRANSACTION_HASH_ERROR,
  CREATE_MEME_TRANSACTION_HASH_SUCCESS,
} from '../../actions/types';

const INITIAL_STATE = { 
  meme: {
    loading: false,
    errors: {
      error: false,
      message: '',
      code: 0,
    },
    success: {
      ok: false,
      duplicate: false,
      valid: false,
      memes: [],
      transaction: {
        loading: false,
        errors: {
          error: false,
          message: '',
          code: 0,
        }, 
        success: {
          ok: false,
          txhash: {
            loading: false,
            success: {
              ok: false,
            },
            errors: {
              error: false,
              message: '',
              code: 0,
            }
          }
        }
      }
    },
  }
  // createMemeReducer: {
  //   loading: false,
  //   duplicate: false,
  //   valid: false,
  //   memes: [],
  //   errors: {
  //     error: false,
  //     message: '',
  //   }
  // },
  // createMemeTransaction: {
  //   loading: false,
  //   errors: {
  //     error: false,
  //     message: ''
  //   },
  // },
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case CREATE_MEME_LOADING:
      return { ...state, meme: { ...state.meme, loading: true } };
    case CREATE_MEME_SUCCESS:
      return {
        ...state,
        meme: { 
          ...state.meme, 
          loading: false,
          errors: { ...state.meme.errors, error: false },
          success: {
            ...state.meme.success,
            ...payload.success,
            transaction: {
              ...state.meme.success.transaction,
              loading: true,
            }
          }
        }
      };
    case CREATE_MEME_ERROR:
      return {
        ...state,
        meme: {
          ...state.meme,
          ...payload,
          loading: false,
          success: { ...state.meme.success, ok: false },
        } 
      };

    case CREATE_MEME_TRANSACTION_LOADING:
      return {
        ...state,
        meme: {
          ...state.meme,
          errors: { ...state.meme.errors, error: false },
          success: {
            ...state.meme.success,
            ok: true,
            transaction: {
              ...state.meme.success.transaction,
              loading: true,

            }
          }
        },
      }
    case CREATE_MEME_TRANSACTION_SUCCESS:
      return {
        ...state,
        meme: {
          ...state.meme,
          errors: { ...state.meme.errors, error: false },
          success: {
            ...state.meme.success,
            ok: true,
            transaction: {
              ...state.meme.success.transaction,
              errors: { ...state.meme.success.transaction.errors, error: false },
              success: {
                ...state.meme.success.transaction.success, 
                ...payload.success,
                ok: true,
              },
              loading: false,

            }
          }
        },
      };

    case CREATE_MEME_TRANSACTION_ERROR: 
    return {
      ...state,
      meme: {
        ...state.meme,
        errors: { ...state.meme.errors, error: false },
        success: {
          ...state.meme.success,
          ok: true,
          transaction: {
            ...state.meme.success.transaction,
            success: {
              ...state.meme.success.transaction.success,
              ok: false,  
            },
            errors: {
              ...state.meme.success.transaction.errors,
              ...payload.errors,
            },
            loading: false,

          }
        }
      },
    };

    case CREATE_MEME_TRANSACTION_HASH_LOADING:
      return {
        ...state,
        meme: {
          ...state.meme,
          errors: { ...state.meme.errors, error: false },
          success: {
            ...state.meme.success,
            ok: true,
            transaction: {
              ...state.meme.success.transaction,
              success: {
                ...state.meme.success.transaction.success,
                ok: true, 
                txhash: {
                  ...state.meme.success.transaction.success.txhash,
                  loading: true,
                } 
              },
              errors: {
                ...state.meme.success.transaction.errors,
                error: false,
              },
              loading: false,
  
            }
          }
        }
      };
    
    case CREATE_MEME_TRANSACTION_HASH_ERROR:
      return {
        ...state,
        meme: {
          ...state.meme,
          errors: { ...state.meme.errors, error: false },
          success: {
            ...state.meme.success,
            ok: true,
            transaction: {
              ...state.meme.success.transaction,
              success: {
                ...state.meme.success.transaction.success,
                ok: true, 
                txhash: {
                  ...state.meme.success.transaction.success.txhash,
                  loading: false,
                  success: {
                    ...state.meme.success.transaction.success.txhash.success,
                    ok: false,
                  },
                  errors: {
                    ...state.meme.success.transaction.success.txhash.errors,
                    ...payload.errors,
                  }
                } 
              },
              errors: {
                ...state.meme.success.transaction.errors,
                error: false,
              },
              loading: false,
  
            }
          }
        }
      };


      case CREATE_MEME_TRANSACTION_HASH_SUCCESS:
      return {
        ...state,
        meme: {
          ...state.meme,
          errors: { ...state.meme.errors, error: false },
          success: {
            ...state.meme.success,
            ok: true,
            transaction: {
              ...state.meme.success.transaction,
              success: {
                ...state.meme.success.transaction.success,
                ok: true, 
                txhash: {
                  ...state.meme.success.transaction.success.txhash,
                  loading: false,
                  errors: {
                    ...state.meme.success.transaction.success.txhash.errors,
                    error: false
                  },
                  success: {
                    ...state.meme.success.transaction.success.txhash.success,
                    ...payload.success,
                    ok: true,
                  },
                  
                } 
              },
              errors: {
                ...state.meme.success.transaction.errors,
                error: false,
              },
              loading: false,
  
            }
          }
        }
      };

    case RENDER_INITIAL_STATE:
      return { ...INITIAL_STATE };
    default:
      return { ...state };
  }
};

