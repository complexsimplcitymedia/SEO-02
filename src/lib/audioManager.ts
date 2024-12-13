import { EventEmitter } from 'events';

class AudioManager extends EventEmitter {
  private audioContext: AudioContext | null = null;
  private mediaStream: MediaStream | null = null;
  private audioInput: MediaStreamAudioSourceNode | null = null;
  private audioOutput: AudioDestinationNode | null = null;
  private gainNode: GainNode | null = null;
  private isInitialized = false;
  private audioWorklet: AudioWorkletNode | null = null;

  constructor() {
    super();
    this.setupAudioContext = this.setupAudioContext.bind(this);
    this.startAudioInput = this.startAudioInput.bind(this);
    this.stopAudioInput = this.stopAudioInput.bind(this);
  }

  private async setupAudioContext(): Promise<void> {
    if (this.isInitialized) return;

    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: 48000,
        latencyHint: 'interactive'
      });
      
      await this.audioContext.resume();
      
      this.audioOutput = this.audioContext.destination;
      this.gainNode = this.audioContext.createGain();
      this.gainNode.connect(this.audioOutput);
      
      // Initialize audio worklet for processing
      await this.audioContext.audioWorklet.addModule(`data:text/javascript,
        class AudioProcessor extends AudioWorkletProcessor {
          process(inputs, outputs) {
            const input = inputs[0];
            const output = outputs[0];
            for (let channel = 0; channel < input.length; ++channel) {
              output[channel].set(input[channel]);
            }
            return true;
          }
        }
        registerProcessor('audio-processor', AudioProcessor);
      `);

      this.audioWorklet = new AudioWorkletNode(this.audioContext, 'audio-processor');
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize audio context:', error);
      throw error;
    }
  }

  public async startAudioInput(): Promise<void> {
    try {
      await this.setupAudioContext();

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 48000,
          channelCount: 2,
          latency: 0,
          volume: 1.0
        }
      });

      this.mediaStream = stream;
      this.audioInput = this.audioContext!.createMediaStreamSource(stream);
      
      // Connect through the audio worklet for processing
      if (this.audioWorklet) {
        this.audioInput.connect(this.audioWorklet);
        this.audioWorklet.connect(this.gainNode!);
      } else {
        this.audioInput.connect(this.gainNode!);
      }

      this.emit('inputStarted');
    } catch (error) {
      console.error('Failed to start audio input:', error);
      throw error;
    }
  }

  public stopAudioInput(): void {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }

    if (this.audioInput) {
      this.audioInput.disconnect();
      this.audioInput = null;
    }

    if (this.audioWorklet) {
      this.audioWorklet.disconnect();
    }

    this.emit('inputStopped');
  }

  public setVolume(value: number): void {
    if (this.gainNode) {
      this.gainNode.gain.value = Math.max(0, Math.min(1, value));
    }
  }

  public cleanup(): void {
    this.stopAudioInput();
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
    this.audioWorklet = null;
    this.isInitialized = false;
  }
}

export const audioManager = new AudioManager();