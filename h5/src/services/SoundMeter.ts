export class SoundMeter {
    context: AudioContext;
    instant: number;
    script: ScriptProcessorNode;
    mic: MediaStreamAudioSourceNode;

    constructor() {
      this.context = new AudioContext();

      this.instant = 0.0;
      //this.slow = 0.0;
      //this.clip = 0.0;
      this.script = this.context.createScriptProcessor(2048, 1, 1);
      this.script.onaudioprocess = (event) => {
        const input = event.inputBuffer.getChannelData(0);
        let i;
        let sum = 0.0;
        let clipcount = 0;
        for (i = 0; i < input.length; ++i) {
          sum += input[i] * input[i];
          if (Math.abs(input[i]) > 0.99) {
            clipcount += 1;
          }
        }
        this.instant = Math.sqrt(sum / input.length);
        //that.slow = 0.95 * that.slow + 0.05 * that.instant;
        //that.clip = clipcount / input.length;
      };
    }
    
    connectToSource(stream: MediaStream) {
      try {
        this.mic = this.context.createMediaStreamSource(stream);
        this.mic.connect(this.script);
        // necessary to make sample run, but should not be.
        this.script.connect(this.context.destination);
      } catch (err) {}
    }
    
    stop() {
      this.mic?.disconnect();
      this.script.disconnect();
    }
}