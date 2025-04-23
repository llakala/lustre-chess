import { Chess } from './npm_chess.mjs';
import { Ok, Error, List } from './gleam.mjs';

export function new_game() {
  return new Chess();
}

export function moves(game) {
  return game.moves();
}

export function move(game, move) {
  // clone
  const next = new Chess();
  if (game.history().length > 0) {
    next.loadPgn(game.pgn());
  }
  // try move
  try {
    next.move(move);
    return new Ok(next);
  } catch (error) {
    return new Error(error.message);
  }
}

export function is_game_over(game) {
  return game.isGameOver();
}

export function fen(game) {
  return game.fen();
}

export function game_board_squares(game) {
  return List.fromArray(game.board().flat().map((piece) => {
    if (piece === null) {
      return "";
    } else {
      return piece.color + piece.type;
    }
  }));
}

export function most_recent_move(game) {
  const history = game.history({ verbose: true });
  if (history.length == 0) {
    return new Error(undefined);
  } else {
    return new Ok([history[history.length - 1].from, history[history.length - 1].to]);
  }
}

export function check_end_conditions(game) {
  if (!game.isGameOver()) {
    return "none";
  } else if (game.isCheckmate()) {
    return "checkmate";
  } else if (game.isStalemate()) {
    return "draw-stalemate";
  } else if (game.isDrawByFiftyMoves()) {
    return "draw-fifty-move-rule";
  } else if (game.isInsufficientMaterial()) {
    return "draw-insufficient-material";
  } else if (game.isThreefoldRepetition()) {
    return "draw-threefold-repetition";
  }
}

export function set_timeout(duration, callback) {
  setTimeout(callback, duration);
}

export function side_to_move(game) {
  return game.turn();
}
