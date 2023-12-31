import { SaveFileUsecase } from '@src/application/usecases/files';
import DiskStorage from '@src/infra/storage/Disk';
import csvFixture from '@tests/fixtures/file';
import ManipulateFile from '@tests/utils/ManipulateFile';
import fs from 'fs';
import path from 'path';

describe('Save File', () => {
  const manipulateFile = new ManipulateFile();
  const { toManipulate } = csvFixture.filename;
  const rootdir = [__dirname, '..', '..', '..', '..', 'src', 'temp'];

  beforeEach(async () => {
    const from = path.resolve(...rootdir, 'uploads', toManipulate);
    const to = path.resolve(...rootdir, toManipulate);
    await manipulateFile.changeDirectory(from, to);
  });

  it('should be able to save file in upload folder', async () => {
    // Given
    const filesFounded: string[] = [];
    const diskStorageProvider = new DiskStorage();
    const saveFileUsecase = new SaveFileUsecase(diskStorageProvider);
    const filePath = path.resolve(...rootdir);

    // When
    await saveFileUsecase.run('test2.csv');
    fs.readdir(filePath, (_: any, files: any) => {
      files.forEach((file: string) => {
        filesFounded.push(file);
      });
    });

    // Then
    expect(filesFounded).toHaveLength(0);
  });
});
