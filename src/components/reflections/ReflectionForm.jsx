import React, { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog.jsx';
import { BookOpen, Heart, TrendingUp, Target } from 'lucide-react';

const defaultForm = {
  date: new Date().toISOString().split('T')[0],
  learned: '',
  grateful: '',
  improve: '',
  dream_id: ''
};

export default function ReflectionForm({ open, onClose, onSave, reflection, dreams = [] }) {
  const [formData, setFormData] = useState(reflection || defaultForm);

  useEffect(() => {
    setFormData(reflection || { ...defaultForm, date: new Date().toISOString().split('T')[0] });
  }, [reflection]);

  const activeDreams = useMemo(() => dreams.filter((dream) => dream.status === 'in_progress'), [dreams]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave?.(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{reflection ? 'Edit Reflection' : 'Daily Reflection'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="reflection-date">Date</Label>
            <Input
              id="reflection-date"
              type="date"
              value={formData.date}
              onChange={(event) => setFormData({ ...formData, date: event.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reflection-dream" className="flex items-center gap-2">
              <Target className="h-4 w-4 text-blue-500" /> Link to a Dream (Optional)
            </Label>
            <Select
              value={formData.dream_id || 'none'}
              onValueChange={(value) => setFormData({ ...formData, dream_id: value === 'none' ? '' : value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a dream..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No dream linked</SelectItem>
                {activeDreams.map((dream) => (
                  <SelectItem key={dream.id} value={dream.id}>
                    {dream.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="reflection-learned" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-blue-500" /> What I Learned Today
            </Label>
            <Textarea
              id="reflection-learned"
              value={formData.learned || ''}
              onChange={(event) => setFormData({ ...formData, learned: event.target.value })}
              placeholder="Share something new you discovered or understood..."
              className="h-24"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reflection-grateful" className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-rose-500" /> What I'm Grateful For
            </Label>
            <Textarea
              id="reflection-grateful"
              value={formData.grateful || ''}
              onChange={(event) => setFormData({ ...formData, grateful: event.target.value })}
              placeholder="Count your blessings, big or small..."
              className="h-24"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reflection-improve" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-500" /> What I Want to Improve Tomorrow
            </Label>
            <Textarea
              id="reflection-improve"
              value={formData.improve || ''}
              onChange={(event) => setFormData({ ...formData, improve: event.target.value })}
              placeholder="Set an intention for tomorrow..."
              className="h-24"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              {reflection ? 'Update' : 'Save'} Reflection
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
