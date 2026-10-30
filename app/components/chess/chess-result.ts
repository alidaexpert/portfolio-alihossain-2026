import {Chess} from 'chess.js';
/** Keep rules and result text in one place for both board renderers. */
export function getResult(game:Chess):string|null{if(game.isCheckmate())return game.turn()==='w'?'Ali’s engine wins by checkmate.':'You win by checkmate!';if(game.isStalemate())return 'Draw by stalemate.';if(game.isThreefoldRepetition())return 'Draw by threefold repetition.';if(game.isInsufficientMaterial())return 'Draw — insufficient material.';if(game.isDrawByFiftyMoves())return 'Draw by the fifty-move rule.';if(game.isDraw())return 'Draw.';return null}
export const pieceNames:Record<string,string>={p:'pawn',n:'knight',b:'bishop',r:'rook',q:'queen',k:'king'};
export const symbols:Record<string,string>={wk:'♔',wq:'♕',wr:'♖',wb:'♗',wn:'♘',wp:'♙',bk:'♚',bq:'♛',br:'♜',bb:'♝',bn:'♞',bp:'♟'};
