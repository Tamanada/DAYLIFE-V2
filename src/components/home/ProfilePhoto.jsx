import React, { useState } from 'react';
import { Camera, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { daylifeClient } from '@/api/daylifeClient.js';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';

export default function ProfilePhoto({ photoUrl, onPhotoUpdate }) {
  const [open, setOpen] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [prompt, setPrompt] = useState('');

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { file_url } = await daylifeClient.integrations.Core.UploadFile({ file });
      await onPhotoUpdate?.(file_url);
      setOpen(false);
    } finally {
      setUploading(false);
    }
  };

  const handleGenerateAI = async () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    try {
      const { url } = await daylifeClient.integrations.Core.GenerateImage({
        prompt: `Professional profile photo: ${prompt}, high quality, portrait style, soft lighting`
      });
      await onPhotoUpdate?.(url);
      setOpen(false);
      setPrompt('');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-slate-700 shadow-xl md:h-40 md:w-40">
          {photoUrl ? (
            <img src={photoUrl} alt="Profile" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
              <Camera className="h-12 w-12 text-slate-600" />
            </div>
          )}
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="absolute bottom-0 right-0 rounded-full bg-blue-600 p-2 shadow-lg transition-colors hover:bg-blue-700">
              <Camera className="h-4 w-4 text-white" />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Update Profile Photo</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-3">
                <Label>Upload Photo</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={uploading || generating}
                />
                {uploading && (
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Uploading...
                  </div>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-slate-500">Or</span>
                </div>
              </div>
              <div className="space-y-3">
                <Label>Generate with AI</Label>
                <Input
                  placeholder="Describe yourself (e.g., smiling person with glasses)"
                  value={prompt}
                  onChange={(event) => setPrompt(event.target.value)}
                  disabled={uploading || generating}
                />
                <Button
                  onClick={handleGenerateAI}
                  disabled={!prompt.trim() || uploading || generating}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  {generating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate AI Photo
                    </>
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
