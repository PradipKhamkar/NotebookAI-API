import { IMessage } from "./llm.type";

interface INewNotePayload {
  type: TSource;
  sourceData: {
    link?: string;
    fileId?: string;
    originalPath?: string;
    uploadId?: string;
  };
}
export interface INoteContent {
  language: string;
  content: {
    summary: string;
    keyPoints: string[];
    sections: {
      heading: string;
      content: string;
    }[];
  };
}
interface INote {
  _id: string;
  title: string;
  summary: string,
  folder?: string;
  transcript: {
    speaker: string;
    transcript: string;
    duration: string;
  }[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  sources: {
    type: string;
    link?: string;
    text?: string;
    uploadId?: string
  }[];
  data?: INoteContent[]
  metaData: object;
  messages: IMessage[];
  suggestionQuery: string[];
  language: string;
}

interface INoteTranslatePayload {
  noteId: string;
  language: string
}

type TSource = "youtube" | "web" | "pdf" | "audio" | "video";
export { TSource, INewNotePayload, INote, INoteTranslatePayload };
