import { Eye, Globe, MessageCircle, Mic, User } from "lucide-react";

// interface CompanionData {
//   name: string;
//   subject: string;
//   teachingContent: string;
//   voiceType?: string;
//   speakingStyle?: string;
//   language: string;
//   icon: File | null;
//   iconPreview: string;
// chat_duration?: number // Changed to number
// learning_style?: string, // Updated to match interface
//  motivation_level: string, // Updated to match interface
// }


const PreviewCard = ({ data }: { data: CompanionData }) => (
  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-100">
    <div className="flex items-center gap-2 mb-4">
      <Eye className="w-5 h-5 text-blue-600" />
      <h3 className="text-lg font-bold text-gray-900">Preview</h3>
    </div>
    
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gray-200 overflow-hidden flex-shrink-0">
          {data.iconPreview ? (
            <img src={data.iconPreview} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User className="w-8 h-8 text-gray-400" />
            </div>
          )}
        </div>
        <div>
          <h4 className="font-bold text-gray-900">{data.name || 'Companion Name'}</h4>
          <p className="text-sm text-gray-600">{data.subject || 'Subject'}</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <Mic className="w-4 h-4 text-purple-600" />
          <span className="text-gray-700">{data.voice_type || 'Voice Type'}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MessageCircle className="w-4 h-4 text-green-600" />
          <span className="text-gray-700">{data.speaking_style || 'Speaking Style'}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Globe className="w-4 h-4 text-blue-600" />
          <span className="text-gray-700">{data.language || 'Language'}</span>
        </div>
      </div>
    </div>
  </div>
);

export default PreviewCard