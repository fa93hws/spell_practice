declare module '@/assets/js/responsivevoice' {
  interface IConfig {
    pitch?: number;
    rate?: number;
    volume?: number;
    onstart?: () => void;
    onend?:() => void;
  }
  const responsiveVoice: {
    speak: (
      word: string,
      voice?: string,
      config?: IConfig
    ) => void;
  }
  export default responsiveVoice;
}