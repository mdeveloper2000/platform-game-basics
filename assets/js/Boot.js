Boot = function(game) {   
};

Boot.prototype = {
  
    init: function() {
        this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.forceOrientation(true, false);
        this.scale.updateLayout(true);
        this.scale.refresh();
        this.input.maxPointers = 1;
        this.input.addPointer();
    },
    
    create: function() {
        game.state.add('Splash', Splash);
        game.state.add('Preload', Preload);
        game.state.add('Menu', Menu);
        game.state.add('Play', Play);
        game.state.add('Score', Score);
        game.state.add('GameOver', GameOver);
        game.state.start('Splash');
    }

};