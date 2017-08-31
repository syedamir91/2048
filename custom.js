var game2048;
var Game2048 = function() {
	this.availableSlotsCounter = 0;
	this.newValue = [2, 4];
	this.board = [
		[null, null, null, null],
		[null, null, null, null],
		[null, null, null, null],
		[null, null, null, null]
	];
	this.score = 0;
	this.winningScore = 2048;
	this.gameOver = false;
	this.init();
};

Game2048.prototype.init = function() {
	this.drawValue();
	this.drawValue();
	this.drawBoard();
};

Game2048.prototype.drawValue = function() {
	slot = this.getNewBoardPosition();
	if( slot ) {
		row = slot[0];
		col = slot[1];
		if( this.board[row][col] == null ) {
			this.board[row][col] = this.getNewValue();
		} else {
			this.drawValue();
		}
	} else {
		game2048.showMessage('You loose...! :(');
		return;
	}
};
	
Game2048.prototype.drawBoard = function() {
	that = this;
	$( this.board ).each( function( rowKey, rowVal ) {
		$( rowVal ).each( function( colKey, colVal ) {
			$( '.row' ).eq( rowKey ).children( '.col' ).eq( colKey ).html( colVal );
			that.fixFont( rowKey, colKey, colVal );
		});
	});
	if( this.score == this.winningScore ) {
		this.showMessage('You Win! :)');
	}
	$('.score').html( this.score );
};

Game2048.prototype.fixFont = function( rowKey, colKey, colVal ) {
	$( '.row' ).eq( rowKey ).children( '.col' ).eq( colKey ).css( 'font-size', 60 + 'px' );
	if( colVal > 99 ) {
		$( '.row' ).eq( rowKey ).children( '.col' ).eq( colKey ).css( 'font-size', 46 + 'px' );
	} else if( colVal > 999 ) {
		$( '.row' ).eq( rowKey ).children( '.col' ).eq( colKey ).css( 'font-size', 36 + 'px' );
	} else if( colVal > 9999 ) {
		$( '.row' ).eq( rowKey ).children( '.col' ).eq( colKey ).css( 'font-size', 28 + 'px' );
	} else if( colVal > 99999 ) {
		$( '.row' ).eq( rowKey ).children( '.col' ).eq( colKey ).css( 'font-size', 24 + 'px' );
	}
};

Game2048.prototype.getNewValue = function() {
	return this.newValue[Math.floor(Math.random() * 2)];
};

Game2048.prototype.getNewBoardPosition = function() {
	if( this.availableSlotsCounter < 16 ) {
		var row = Math.floor(Math.random() * 4);
		var col = Math.floor(Math.random() * 4);
		if( this.board[row][col] == null ) {
			this.availableSlotsCounter++;
			return [row, col];
		} else {
			return this.getNewBoardPosition();
		}
	} else {
		return false;
	}
};

Game2048.prototype.showMessage = function( msg ) {
	$('.message').html( msg );
	$('.message').show();
	this.gameOver = true;
}

Game2048.prototype.addToTop = function() {
	for( i = 0; i < 4; i++ ) {
		for( j = 0; j < 3; j++ ) {
			if( game2048.board[j][i] != null && game2048.board[j][i] == game2048.board[j+1][i] ) {
				game2048.board[j][i] = game2048.board[j][i] + game2048.board[j+1][i];
				game2048.score = game2048.score + game2048.board[j][i];
				game2048.board[j+1][i] = null;
				game2048.availableSlotsCounter--;
			}
		}
	}
}

Game2048.prototype.addToBottom = function() {
	for( i = 3; i > -1; i-- ) {
		for( j = 3; j > 0; j-- ) {
			if( game2048.board[j][i] != null && game2048.board[j][i] == game2048.board[j-1][i] ) {
				game2048.board[j][i] = game2048.board[j][i] + game2048.board[j-1][i];
				game2048.score = game2048.score + game2048.board[j][i];
				game2048.board[j-1][i] = null;
				game2048.availableSlotsCounter--;
			}
		}
	}
}

Game2048.prototype.addToLeft = function() {
	for( i = 0; i < 4; i++ ) {
		for( j = 0; j < 4; j++ ) {
			if( game2048.board[i][j] != null && game2048.board[i][j] == game2048.board[i][j+1] ) {
				game2048.board[i][j] = game2048.board[i][j] + game2048.board[i][j+1];
				game2048.score = game2048.score + game2048.board[i][j];
				game2048.board[i][j+1] = null;
				game2048.availableSlotsCounter--;
			}
		}
	}
}

Game2048.prototype.addToRight = function() {
	for( i = 3; i > -1; i-- ) {
		for( j = 3; j > -1; j-- ) {
			if( game2048.board[i][j] != null && game2048.board[i][j] == game2048.board[i][j-1] ) {
				game2048.board[i][j] = game2048.board[i][j] + game2048.board[i][j-1];
				game2048.score = game2048.score + game2048.board[i][j];
				game2048.board[i][j-1] = null;
				game2048.availableSlotsCounter--;
			}
		}
	}
}

Game2048.prototype.shiftLeft = function( msg ) {
	$( game2048.board ).each( function( rowKey, rowVal ) {
		pos = 0;
		$( game2048.board[rowKey] ).each( function( colKey, colVal ) {
			if( game2048.board[rowKey][colKey] != null && colKey != 0 ) {
				if( game2048.board[rowKey][pos] == null ) {
					game2048.board[rowKey][pos++] = game2048.board[rowKey][colKey];
					game2048.board[rowKey][colKey] = null;
				} else if( ++pos != colKey ) {
					game2048.board[rowKey][pos] = game2048.board[rowKey][colKey];
					game2048.board[rowKey][colKey] = null;
				}
			}
		});
	});
};

Game2048.prototype.shiftTop = function( msg ) {
	$( game2048.board ).each( function( rowKey, rowVal ) {
		pos = 0;
		$( game2048.board[rowKey] ).each( function( colKey, colVal ) {
			if( game2048.board[colKey][rowKey] != null && colKey != 0 ) {
				if( game2048.board[pos][rowKey] == null ) {
					game2048.board[pos++][rowKey] = game2048.board[colKey][rowKey];
					game2048.board[colKey][rowKey] = null;
				} else if( ++pos != colKey ) {
					game2048.board[pos][rowKey] = game2048.board[colKey][rowKey];
					game2048.board[colKey][rowKey] = null;
				}
			}
		});
	});
};

Game2048.prototype.shiftRight = function( msg ) {
	$( game2048.board ).each( function( rowKey, rowVal ) {
		pos = 3;
		rowKey = Math.abs( rowKey - 3 );
		$( game2048.board[rowKey] ).each( function( colKey, colVal ) {
			colKey = Math.abs( colKey - 3 );
			if( game2048.board[rowKey][colKey] != null && colKey != 3 ) {
				if( game2048.board[rowKey][pos] == null ) {
					game2048.board[rowKey][pos--] = game2048.board[rowKey][colKey];
					game2048.board[rowKey][colKey] = null;
				} else if( --pos != colKey ) {
					game2048.board[rowKey][pos] = game2048.board[rowKey][colKey];
					game2048.board[rowKey][colKey] = null;
				}
			}
		});
	});
};

Game2048.prototype.shiftBottom = function( msg ) {
	$( game2048.board ).each( function( rowKey, rowVal ) {
		pos = 3;
		rowKey = Math.abs( rowKey - 3 );
		$( game2048.board[rowKey] ).each( function( colKey, colVal ) {
			colKey = Math.abs( colKey - 3 );
			if( game2048.board[colKey][rowKey] != null && colKey != 3 ) {
				if( game2048.board[pos][rowKey] == null ) {
					game2048.board[pos--][rowKey] = game2048.board[colKey][rowKey];
					game2048.board[colKey][rowKey] = null;
				} else if( --pos != colKey ) {
					game2048.board[pos][rowKey] = game2048.board[colKey][rowKey];
					game2048.board[colKey][rowKey] = null;
				}
			}
		});
	});
};

$(document).ready(function() {
	game2048 = new Game2048();
	$('.new-game').click(function() {
		game2048.availableSlotsCounter = 0;
		game2048.board = [
			[null, null, null, null],
			[null, null, null, null],
			[null, null, null, null],
			[null, null, null, null]
		];
		game2048.score = 0;
		game2048.gameOver = false;
		game2048.init();
		$('.message').hide();
	});
});

$(document).bind('keyup', function(e) {
	var pos = 0;
	if( game2048.gameOver ) {
		return;
	}
	switch( e.keyCode ) {
		// left
		case 37:
			// shift
			game2048.shiftLeft();
			// addition
			game2048.addToLeft();
			// shift
			game2048.shiftLeft();
			// draw Board
			game2048.drawValue();
		break;
		// top
		case 38:
			// shift
			game2048.shiftTop();
			// addition
			game2048.addToTop();
			// shift
			game2048.shiftTop();
			// draw Board
			game2048.drawValue();
		break;
		// right
		case 39:
			// shift
			game2048.shiftRight();
			// addition
			game2048.addToRight();
			// shift
			game2048.shiftRight();
			// draw Board
			game2048.drawValue();
		break;
		// bottom
		case 40:
			// shift
			game2048.shiftBottom();
			// addition
			game2048.addToBottom();
			// shift
			game2048.shiftBottom();
			// draw Board
			game2048.drawValue();
		break;
	}
	game2048.drawBoard();
});