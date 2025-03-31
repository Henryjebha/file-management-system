import React, { useEffect, useState } from 'react';
import { getFiles, deleteFile } from '../../services/file.service';
import { File } from '../../types/file.types';
import FileItem from './FileItem';
import FileUpload from './FileUpload';

const FileList: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const data = await getFiles();
      setFiles(data);
      setError('');
    } catch (err: any) {
      setError('Failed to load files');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteFile(id);
      setFiles(files.filter(file => file.id !== id));
    } catch (err) {
      setError('Failed to delete file');
      console.error(err);
    }
  };

  const handleUploadSuccess = () => {
    fetchFiles();
  };

  if (loading) return <div className="text-center py-4">Loading files...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Files</h1>
      
      <FileUpload onUploadSuccess={handleUploadSuccess} />
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      {files.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No files uploaded yet</div>
      ) : (
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left"></th>
                <th className="py-3 px-6 text-left">Filename</th>
                <th className="py-3 px-6 text-left">Type</th>
                <th className="py-3 px-6 text-left">Upload Date</th>
                <th className="py-3 px-6 text-left">Size</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {files.map((file) => (
                <FileItem key={file.id} file={file} onDelete={handleDelete} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FileList;