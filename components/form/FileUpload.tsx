import { Camera, Upload } from "lucide-react";

const FileUpload = ({ onFileSelect, preview, error }: {
  onFileSelect: (file: File) => void;
  preview: string;
  error?: string;
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="space-y-3 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-200">
      <label className="block text-sm  text-gray-100 mb-2">
        Companion Icon
      </label>
      <div className="relative">
        <div className={`group relative w-32 h-32 mx-auto border-2 border-dashed rounded-2xl overflow-hidden transition-all duration-300 ${
          error ? 'border-red-300 bg-red-50' : 'border-gray-900 hover:border-blue-400 bg-gray-50 hover:bg-blue-50'
        }`}>
          {preview ? (
            <div className="relative w-full h-full">
              <img 
                src={preview} 
                alt="Companion preview" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-slate-900 via-slate-900 to-slate-900 text-gray-200 group-hover:text-blue-500 transition-colors">
              <Upload className="w-8 h-8 mb-2" />
              <span className="text-sm font-medium">Upload Icon</span>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer "
          />
        </div>
      </div>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      <p className="text-xs text-gray-100 text-center">
        Upload a square image (PNG, JPG) up to 2MB
      </p>
    </div>
  );
};

export default FileUpload