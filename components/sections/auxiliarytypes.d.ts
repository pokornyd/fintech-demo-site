import { ContentItem } from "kentico-cloud-delivery";

interface IAssetElementValue {
  readonly value: ReadonlyArray<{
    readonly url: string,
    readonly description: string,
  }>;
}

interface IElementStringValue {
  readonly value: string;
}

interface IElementStringValueWithQuery {
  readonly value: string;
  readonly query: Record<string, string | string[] | undefined>;
}

interface IElementStringValueWithQueryAndData {
  readonly value: string;
  readonly query: Record<string, string | string[] | undefined>;
  readonly data: ContentItem;
}
