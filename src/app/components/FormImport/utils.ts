import type { ParseResult } from 'papaparse';
import { parse } from 'papaparse';
import { User } from '../../../lib/flipt/types/entities';

export async function fetchFile(file: File) {
  const fileUrl = URL.createObjectURL(file);
  const response = await fetch(fileUrl);

  if (!response.ok) {
    throw new Error('Failed to fetch the file');
  }

  return await response.text();
}

export async function loadFile(fileList: FileList) {
  const [file] = fileList;
  if (!file) {
    throw new Error('file is not exists');
  }
  return await fetchFile(file);
}

export function chunkArray<T = unknown>(arr: Array<T>, size: number) {
  return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
}

export function parseCSV(csvText: string) {
  return new Promise<Array<User>>((resolve) => {
    parse(csvText, {
      delimiter: ',',
      complete: (
        result: ParseResult<{
          username: string;
          user_id: string;
        }>
      ) => {
        const parsed = result.data.map(({ user_id: id, username }) => ({
          id,
          username,
        }));
        resolve(parsed);
      },
      skipEmptyLines: true,
      header: true,
    });
  });
}
