Menu = function(game) {    
};

Menu.prototype = {
  
    create: function() {        
        this.botao_play = game.add.button(game.world.centerX, game.world.centerY + 130, 'startButton', this.acaoBotaoPlay, this, 1, 0, 1);
        this.botao_play.anchor.setTo(0.5, 0.5);     
        var style = { font: "bold 46px Arial", fill: "#000", boundsAlignH: "center", boundsAlignV: "middle" };
        this.text = game.add.text(70, 140, "Platform Game Basics", style);
        style.fontSize = 20;
        this.text = game.add.text(160, 200, "Developed with Phaser CE 2.20.0", style);
        this.text = game.add.text(140, 220, "Game maps developed with Tiled 1.10.2", style);
        this.text = game.add.text(115, 240, "Game assets from Kenney (www.kenney.nl)", style);        
        this.text = game.add.text(145, 260, "Assets: kenney_abstract-platformer", style);
        this.text = game.add.text(game.world.centerX - 25, game.world.centerY + 120, "PLAY", style);
        this.text.addColor("#0f0", 0);
    },
    
    acaoBotaoPlay : function() {
        game.state.start('Play', true, false, 1, 3, 0, 0);
    }
    
};