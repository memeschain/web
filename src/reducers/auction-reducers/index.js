import {
  AUCTION_LOADING,
  AUCTION_ERROR,
  AUCTION_SUCCESS,
  GET_PRICE_LOADING,
  GET_PRICE_ERROR,
  GET_PRICE_SUCCESS,
  CREATE_MEME_AUCTION_LOADING,
  CREATE_MEME_AUCTION_SUCCESS,
  CREATE_MEME_AUCTION_ERROR,
  CANCEL_MEME_AUCTION_LOADING,
  CANCEL_MEME_AUCTION_SUCCESS,
  CANCEL_MEME_AUCTION_ERROR,
  AUCTION_DETAILS_INITIAL_STATE,
  BUY_MEME_FROM_AUCTION_LOADING,
  BUY_MEME_FROM_AUCTION_SUCCESS,
  BUY_MEME_FROM_AUCTION_ERROR,
} from '../../actions/types';
  
const INITIAL_STATE = {
  auctions: {
    loading: false,
    success: {
      ok: false,
      data: [],
      total: 0,
    },
    errors: {
      error: false,
      message: '',
    },
  },
  auctionPrice: {
    loading: false,
    success: {
      ok: false,
      data: 0,
    },
    errors: {
      error: false,
      message: '',
    },
  },
  createMemeAuction: {
    loading: false,
    success: {
      ok: false,
      data: null,
    },
    errors: {
      error: false,
      message: '',
    },
  },
  cancelMemeAuction: {
    loading: false,
    success: {
      ok: false,
      data: null,
    },
    errors: {
      error: false,
      message: '',
    },
  },
  buyMemeFromAuction: {
    loading: false,
    success: {
      ok: false,
      data: null,
    },
    errors: {
      error: false,
      message: '',
    },
  },
};
  
export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case AUCTION_LOADING:
      return {
        ...state,
        auctions: {
          ...state.auctions,
          loading: true,
        },
        success: {
          ...state.auctions.success,
          ...INITIAL_STATE.auctions.success,
        },
        errors: {
          ...state.auctions.errors,
          ...INITIAL_STATE.auctions.errors,
        },
      };
    case AUCTION_ERROR:
      return {
        ...state,
        auctions: {
          ...state.auctions,
          loading: false,
          success: {
            ...state.auctions.success,
            ok: false,
          },
          errors: {
            ...state.auctions.errors,
            error: true,
            message: payload.message,
          },
        },
      };
    case AUCTION_SUCCESS:
      return {
        ...state,
        auctions: {
          ...state.auctions,
          loading: false,
          errors: {
            ...state.auctions.errors,
            error: false,
          },
          success: {
            ...state.auctions.success,
            ok: true,
            data: payload.result,
            total: payload.total,
          },
        },
      };
    case GET_PRICE_LOADING:
      return {
        ...state,
        auctionPrice: {
          ...state.auctionPrice,
          loading: true,
        },
      };
    case GET_PRICE_ERROR:
      return {
        ...state,
        auctionPrice: {
          ...state.auctionPrice,
          loading: false,
          success: {
            ...state.auctionPrice.success,
            ok: false,
          },
          errors: {
            ...state.auctionPrice.errors,
            error: true,
            message: payload.message,
          },
        },
      };
    case GET_PRICE_SUCCESS:
      return {
        ...state,
        auctionPrice: {
          ...state.auctionPrice,
          loading: false,
          success: {
            ...state.auctionPrice.success,
            ok: true,
            data: payload,
          },
        },
      };
    
    case CREATE_MEME_AUCTION_LOADING:
      return {
        ...state,
        createMemeAuction: {
          ...state.createMemeAuction,
          loading: true,
          success: {
            ...state.createMemeAuction.success,
            ok: false,
          },
          errors: {
            ...state.createMemeAuction.errors,
            error: false,
          },
        },
      };

    case CREATE_MEME_AUCTION_ERROR:
      return {
        ...state,
        createMemeAuction: {
          ...state.createMemeAuction,
          loading: false,
          success: {
            ...state.createMemeAuction.success,
            ok: false,
          },
          errors: {
            ...state.createMemeAuction.errors,
            error: true,
            message: payload.message,
          },
        },
      };
    
    case CREATE_MEME_AUCTION_SUCCESS:
      return {
        ...state,
        createMemeAuction: {
          ...state.createMemeAuction,
          loading: false,
          success: {
            ...state.createMemeAuction.success,
            ok: true,
            data: true,
          },
          errors: {
            ...state.createMemeAuction.errors,
            error: false,
          },
        },
      };


    case CANCEL_MEME_AUCTION_LOADING:
      return {
        ...state,
        cancelMemeAuction: {
          ...state.cancelMemeAuction,
          loading: true,
          success: {
            ...state.cancelMemeAuction.success,
            ok: false,
          },
          errors: {
            ...state.cancelMemeAuction.errors,
            error: false,
          },
        },
      };

    case CANCEL_MEME_AUCTION_ERROR:
      return {
        ...state,
        cancelMemeAuction: {
          ...state.cancelMemeAuction,
          loading: false,
          success: {
            ...state.cancelMemeAuction.success,
            ok: false,
          },
          errors: {
            ...state.cancelMemeAuction.errors,
            error: true,
            message: payload.message,
          },
        },
      };
    
    case CANCEL_MEME_AUCTION_SUCCESS:
      return {
        ...state,
        cancelMemeAuction: {
          ...state.cancelMemeAuction,
          loading: false,
          success: {
            ...state.cancelMemeAuction.success,
            ok: true,
            data: true,
          },
          errors: {
            ...state.cancelMemeAuction.errors,
            error: false,
          },
        },
      };

    
    case BUY_MEME_FROM_AUCTION_LOADING:
      return {
        ...state,
        buyMemeFromAuction: {
          ...state.buyMemeFromAuction,
          loading: true,
          success: {
            ...state.buyMemeFromAuction.success,
            ok: false,
          },
          errors: {
            ...state.buyMemeFromAuction.errors,
            error: false,
          },
        },
      };
    
    case BUY_MEME_FROM_AUCTION_ERROR:
      return {
        ...state,
        buyMemeFromAuction: {
          ...state.buyMemeFromAuction,
          loading: false,
          success: {
            ...state.buyMemeFromAuction.success,
            ok: false,
          },
          errors: {
            ...state.buyMemeFromAuction.errors,
            error: true,
            message: payload.message,
          },
        },
      };
    
    case BUY_MEME_FROM_AUCTION_SUCCESS:
      return {
        ...state,
        buyMemeFromAuction: {
          ...state.buyMemeFromAuction,
          loading: false,
          success: {
            ...state.buyMemeFromAuction.success,
            ok: true,
            data: true,
          },
          errors: {
            ...state.buyMemeFromAuction.errors,
            error: false,
          },
        },
      };


    case AUCTION_DETAILS_INITIAL_STATE:
      return {
        ...state,
        createMemeAuction: {
          ...state.createMemeAuction,
          ...INITIAL_STATE.createMemeAuction,
        },
        cancelMemeAuction: {
          ...state.cancelMemeAuction,
          ...INITIAL_STATE.cancelMemeAuction,
        },
        buyMemeFromAuction: {
          ...state.buyMemeFromAuction,
          ...INITIAL_STATE.buyMemeFromAuction,
        },
        auctionPrice: {
          ...state.auctionPrice,
          ...INITIAL_STATE.auctionPrice,
        },
      };
    default:
      return { ...state };
  }
};
