import './styles/main.css';
import createGameController from './controllers/gameController';

document.addEventListener('DOMContentLoaded', () => {
  const game = createGameController({
    playerBoardEl: document.getElementById('player-board'),
    computerBoardEl: document.getElementById('computer-board'),
    statusEl: document.getElementById('game-status'),
  });

  document
    .getElementById('new-game-btn')
    .addEventListener('click', () => game.startNewGame());

  game.startNewGame();
});
