import { useState, useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

interface GoalChecklistProps {
  goals: string[];
  featureId: string;
}

export function GoalChecklist({ goals, featureId }: GoalChecklistProps) {
  const [checked, setChecked] = useState<boolean[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(`goals-${featureId}`);
    if (stored) {
      setChecked(JSON.parse(stored));
    } else {
      setChecked(new Array(goals.length).fill(false));
    }
  }, [featureId, goals.length]);

  const handleCheck = (index: number) => {
    const newChecked = [...checked];
    newChecked[index] = !newChecked[index];
    setChecked(newChecked);
    localStorage.setItem(`goals-${featureId}`, JSON.stringify(newChecked));
  };

  const completedCount = checked.filter(Boolean).length;
  const progress = (completedCount / goals.length) * 100;

  return (
    <Card className="p-6">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            Learning Goals
          </h3>
          <span className="text-sm text-muted-foreground">
            {completedCount} / {goals.length}
          </span>
        </div>
        <div className="w-full bg-secondary rounded-full h-2">
          <div
            className="bg-primary rounded-full h-2 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <div className="space-y-3">
        {goals.map((goal, index) => (
          <div key={index} className="flex items-start gap-3">
            <Checkbox
              id={`goal-${index}`}
              checked={checked[index] || false}
              onCheckedChange={() => handleCheck(index)}
              className="mt-1"
            />
            <label
              htmlFor={`goal-${index}`}
              className={`text-sm cursor-pointer transition-colors ${
                checked[index] ? 'text-muted-foreground line-through' : 'text-foreground'
              }`}
            >
              {goal}
            </label>
          </div>
        ))}
      </div>
    </Card>
  );
}
