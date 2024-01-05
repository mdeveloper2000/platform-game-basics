Preload = function(game) {    
};

Preload.prototype = {
    
    preload: function() {
        
        this.loadingBar = game.add.sprite(game.world.centerX, game.world.height - 50, 'loading_bar');
        this.loadingBar.anchor.setTo(0.5, 0);        
        game.load.setPreloadSprite(this.loadingBar);        
        game.load.spritesheet('startButton', '../assets/images/signLarge.png', 64, 55);
        game.load.image('background1', '../assets/images/set1_background.png');
        game.load.image('background2', '../assets/images/set2_background.png');
        game.load.image('background3', '../assets/images/set3_background.png');
        game.load.image('background4', '../assets/images/set4_background.png');
        game.load.image('parallax1', '../assets/images/set1_hills.png');
        game.load.image('parallax2', '../assets/images/set2_hills.png');
        game.load.image('parallax3', '../assets/images/set3_hills.png');
        game.load.image('parallax4', '../assets/images/set4_hills.png');        
        game.load.tilemap('Map', '../assets/js/Map.json', null, Phaser.Tilemap.TILED_JSON);        
        game.load.tilemap('Map2', '../assets/js/Map2.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('Map3', '../assets/js/Map3.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('Map4', '../assets/js/Map4.json', null, Phaser.Tilemap.TILED_JSON);                
        game.load.image('Tileset', '../assets/images/tilesheet_complete.png');        
        game.load.spritesheet('player', '../assets/images/player.png', 45, 54);
        game.load.spritesheet('enemyFlying', '../assets/images/enemyFlying.png', 64, 43);
        game.load.spritesheet('elevatorFlying', '../assets/images/tileBlue_02.png', 64, 50);
        game.load.spritesheet('gem', '../assets/images/blueGem.png', 22, 22);
        game.load.image('key', '../assets/images/keyGreen.png');
        game.load.image('watch', '../assets/images/discRed.png');
        game.load.image('money', '../assets/images/discGreen.png');
    },
    
    create: function() {
        game.state.start('Menu');
    }
    
};