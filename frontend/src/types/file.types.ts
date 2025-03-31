export interface File {
    id: number;
    filename: string;
    file_type: 'pdf' | 'xlsx' | 'docx' | 'txt' | 'other';
    upload_date: string;
    size: number;
    file: string;
  }
  
  export interface FileStats {
    total_files: number;
    file_types: { file_type: string; count: number }[];
  }