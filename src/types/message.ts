export interface Message {
  id: string;

  senderId: string;

  type: string;

  content: string | null;

  edited: boolean;

  createdAt: string;

  sender: {
    id: string;
    username: string;
  };

  attachments: {
    id: string;
    url: string;
    fileName: string;
    mimeType: string;
    size: number;
  }[];
}
