Splash = function(game) {    
};

Splash.prototype = {
    preload: function() {        
        this.load.image('loading_bar', '../assets/images/plantStem_horizontal.png');
    },
    
    create: function() {
        this.game.stage.backgroundColor = '#f0f8ff';
        var style = { font: "bold 46px Arial", fill: "#000", boundsAlignH: "center", boundsAlignV: "middle" };
        this.text = game.add.text(70, 140, "Platform Game Basics", style);
        style.fontSize = 20;
        this.text = game.add.text(160, 200, "Developed with Phaser CE 2.20.0", style);
        this.text = game.add.text(140, 220, "Game maps developed with Tiled 1.10.2", style);
        this.text = game.add.text(115, 240, "Game assets from Kenney (www.kenney.nl)", style);
        setTimeout(function() {
            game.state.start('Preload');
        }, 3000);
    }
};