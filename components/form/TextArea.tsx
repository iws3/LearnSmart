const FormTextarea = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  error,
  icon: Icon,
  required = false 
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
  icon: any;
  required?: boolean;
}) => (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
      <Icon className="w-4 h-4" />
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className={`w-full px-4 py-3 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-200 rounded-xl border-2 transition-all duration-300 focus:outline-none resize-none border-none outline-none ${
          error 
            ? 'border-red-300 bg-red-50 focus:border-red-500' 
            : 'border-gray-200 bg-white focus:border-blue-500 focus:bg-blue-50/50'
        }`}
      />
    </div>
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);
export default FormTextarea