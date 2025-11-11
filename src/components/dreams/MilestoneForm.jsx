import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Checkbox } from '@/components/ui/checkbox.jsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog.jsx';

const defaultForm = {
  dream_id: '',
  title: '',
  description: '',
  target_date: '',
  status: 'to_do'
};

export default function MilestoneForm({ open, onClose, onSave, milestone, dreamId }) {
  const [formData, setFormData] = useState({ ...defaultForm, dream_id: dreamId });

  useEffect(() => {
    setFormData(milestone ? { ...milestone } : { ...defaultForm, dream_id: dreamId });
  }, [milestone, dreamId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave?.(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{milestone ? 'Edit Milestone' : 'Add Milestone'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="milestone-title">Milestone Title *</Label>
            <Input
              id="milestone-title"
              value={formData.title}
              onChange={(event) => setFormData({ ...formData, title: event.target.value })}
              placeholder="e.g., Buy plane ticket"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="milestone-description">Description</Label>
            <Textarea
              id="milestone-description"
              value={formData.description || ''}
              onChange={(event) => setFormData({ ...formData, description: event.target.value })}
              placeholder="Add more details..."
              className="h-20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="milestone-target-date">Target Date</Label>
            <Input
              id="milestone-target-date"
              type="date"
              value={formData.target_date || ''}
              onChange={(event) => setFormData({ ...formData, target_date: event.target.value })}
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="milestone-completed"
              checked={formData.status === 'completed'}
              onCheckedChange={(checked) =>
                setFormData({
                  ...formData,
                  status: checked ? 'completed' : 'to_do',
                  completed_date: checked ? new Date().toISOString().split('T')[0] : null
                })
              }
            />
            <Label htmlFor="milestone-completed" className="cursor-pointer">
              Mark as completed
            </Label>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {milestone ? 'Update' : 'Add'} Milestone
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
