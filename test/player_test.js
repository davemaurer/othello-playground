const Board = require('../lib/board');
const Player = require('../lib/player');
const assert = require('assert');

describe('Player', function() {
  it('should have a name, color, score, and status', function() {
  var player = new Player('Jamie', 'white');

  assert.equal(player.name, 'Jamie');
  assert.equal(player.color, 'white');
  assert.equal(player.score, 0);
  assert.equal(player.status, null);
  });
});
