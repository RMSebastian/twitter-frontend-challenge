import axios from "axios";

const uninterceptedAxiosInstance = axios.create();

export const S3Service = {
  upload: async (file: File, url: string) => {
    const blob = new Blob([file], { type: file.type });

    await uninterceptedAxiosInstance.put(url, blob, {
      headers: {
        "Content-Type": file.type,
      },
    });
  },
};
