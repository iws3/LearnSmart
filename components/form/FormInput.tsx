const FormInput = ({ 
  label, 
  value, 
  type,
  onChange, 
  placeholder, 
  max,
  min,
  error,
  icon: Icon,
  required = false 
}: {
  label: string;
  value: string;
  type?:string;
  onChange: (value: string) => void;
  placeholder: string;
  max?:string;
  min?:string
  error?: string;
  icon: any;
  required?: boolean;
}) => (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-sm  text-gray-700 ">
      <Icon className="w-4 h-4" />
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <input
        type={type ? type : "text"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        max={max ? max : '' }
        min={min ? min : '' }
        className={`w-full  bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-200 px-4 py-3 rounded-xl  transition-all duration-300 focus:outline-none bg-black/200 ${
          error 
            ? 'border-red-300 bg-red-50 focus:border-red-500' 
            : 'border-gray-200 bg-white focus:border-blue-500 focus:bg-blue-50/50'
        }`}
      />
    </div>
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

export default FormInput