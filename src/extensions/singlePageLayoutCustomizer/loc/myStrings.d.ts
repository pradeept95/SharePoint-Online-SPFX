declare interface ISinglePageLayoutCustomizerCommandSetStrings {
  makeSingleWebpartPage: string; 
}

declare module 'SinglePageLayoutCustomizerCommandSetStrings' {
  const strings: ISinglePageLayoutCustomizerCommandSetStrings;
  export = strings;
}
