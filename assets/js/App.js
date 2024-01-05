(function() {    
    game = new Phaser.Game(640, 480, Phaser.CANVAS, 'game'); 
    game.state.add('Boot', Boot);  
    game.state.start('Boot', game);
})();