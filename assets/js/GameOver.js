GameOver = function(pontos) {        
};

GameOver.prototype = {
    init : function(gems, pontos) {        
        this.gems = gems;
        this.pontos = (pontos != null) ? pontos : 0;
    },
    
    create : function() {
        var estilo = { font: 'bold 70px Arial', fill: '#f00', boundsAlignH: "center", boundsAlignV: "middle" };
        var texto = game.add.text(120, 130, 'GAME OVER', estilo);
        estilo = { font: 'bold 46px Arial', fill: '#000', boundsAlignH: "center", boundsAlignV: "middle" };
        texto = game.add.text(200, 230, 'Score: ' + this.pontos, estilo);               
        this.botao_continuar = game.add.button(320, 350, 'startButton', this.acaoBotaoContinuar, this, 1, 0, 1);
        this.botao_continuar.anchor.setTo(0.5, 0.5);
        estilo.fontSize = 20;
        texto = game.add.text(295, 340, "PLAY", estilo);         
        texto.addColor("#0f0", 0);
    },
    
    acaoBotaoContinuar : function() {
        game.state.start('Play', true, false, 1, 3, 0, 0);
    }
    
};