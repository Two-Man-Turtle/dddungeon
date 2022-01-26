import Phaser from 'phaser'
import Preloader from './scenes/Preloader'
import TitleScreen from "./scenes/TitleScreen.js"
import Game from "./scenes/Game.js"

const config = {
type: Phaser.AUTO,
width: window.innerWidth,
height: window.innerHeight,
backgroundColor: 0xdda0dd,
physics: {
default: "arcade",
arcade: {
    gravity: {y: 0},
    debug: false
}
},
scene: [Preloader, Game],
// scale: {
//     zoom: 2
// }
};

const game = new Phaser.Game(config);





