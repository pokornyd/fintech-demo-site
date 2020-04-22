
interface IAssetElementValue {
  readonly value: ReadonlyArray<{
    readonly url: string,
    readonly description: string,
  }>;
}

interface IElementStringValue {
  readonly value: string;
}
