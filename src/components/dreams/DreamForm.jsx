import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog.jsx';

const defaultForm = {
  title: '',
  description: '',
  deadline: '',
  color: 'blue'
};

export default function DreamForm({ open, onClose, onSave, dream }) {
  const [formData, setFormData] = useState(dream || defaultForm);

  useEffect(() => {
    setFormData(dream || defaultForm);
  }, [dream]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave?.(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{dream ? 'Edit Dream' : 'Add New Dream'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dream-title">Dream / Goal *</Label>
            <Input
              id="dream-title"
              value={formData.title}
              onChange={(event) => setFormData({ ...formData, title: event.target.value })}
              placeholder="What do you want to achieve?"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dream-description">Description</Label>
            <Textarea
              id="dream-description"
              value={formData.description || ''}
              onChange={(event) => setFormData({ ...formData, description: event.target.value })}
              placeholder="Add more details about your dream..."
              className="h-24"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="dream-deadline">Deadline</Label>
              <Input
                id="dream-deadline"
                type="date"
                value={formData.deadline || ''}
                onChange={(event) => setFormData({ ...formData, deadline: event.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Color</Label>
              <Select
                value={formData.color}
                onValueChange={(value) => setFormData({ ...formData, color: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blue">Blue</SelectItem>
                  <SelectItem value="purple">Purple</SelectItem>
                  <SelectItem value="amber">Amber</SelectItem>
                  <SelectItem value="rose">Rose</SelectItem>
                  <SelectItem value="emerald">Emerald</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {dream ? 'Update' : 'Create'} Dream
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
