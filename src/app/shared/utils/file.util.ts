import FileSaver from 'file-saver';

export class FileUtil {
  public static saveJsonFile(jsonData: string, fileName = 'download.json') {
    const blob = new Blob([jsonData], { type: 'text/json;charset=utf-8' });
    FileSaver.saveAs(blob, fileName);
  }
}
