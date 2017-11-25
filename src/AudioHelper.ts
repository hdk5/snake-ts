import soundmap from "./soundmap"

export default class AudioHelper {

    static playEatSound() {
        (soundmap.eat.cloneNode(true) as HTMLAudioElement).play();
    }

    static playDeathSound() {
        (soundmap.death.cloneNode(true) as HTMLAudioElement).play();
    }
}