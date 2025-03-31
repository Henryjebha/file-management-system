import React from 'react';
import { File } from '../../types/file.types';

interface FileItemProps {
  file: File;
  onDelete: (id: number) => void;
}

const FileItem: React.FC<FileItemProps> = ({ file, onDelete }) => {
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getFileTypeIcon = (fileType: string): string => {
    switch (fileType) {
      case 'pdf':
        return '📄';
      case 'xlsx':
        return '📊';
      case 'docx':
        return '📝';
      case 'txt':
        return '📃';
      default:
        return '📁';
    }
  };

  const handleDownload = () => {
    window.open(file.file, '_blank');
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      <td className="py-3 px-6 text-left whitespace-nowrap">
        <div className="flex items-center">
          <span className="mr-2">{getFileTypeIcon(file.file_type)}</span>
          <span className="cursor-pointer text-blue-600 hover:underline" onClick={handleDownload}>
            {file.filename}
          </span>
        </div>
      </td>
      <td className="py-3 px-6 text-left">
        {file.file_type.toUpperCase()}
      </td>
      <td className="py-3 px-6 text-left">
        {formatDate(file.upload_date)}
      </td>
      <td className="py-3 px-6 text-left">
        {formatFileSize(file.size)}
      </td>
      <td className="py-3 px-6 text-center">
        <div className="flex item-center justify-center">
          <button
            onClick={() => onDelete(file.id)}
            className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default FileItem;