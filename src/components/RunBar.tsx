import { Button } from '@/components/ui/button';
import { Play, RotateCcw, Copy } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface RunBarProps {
  onRun: () => void;
  onReset: () => void;
  code: string;
  isRunning: boolean;
}

export function RunBar({ onRun, onReset, code, isRunning }: RunBarProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: 'Copied!',
      description: 'Code copied to clipboard',
    });
  };

  return (
    <div className="flex items-center gap-2 px-4 py-3 bg-card border-b border-border">
      <Button
        onClick={onRun}
        disabled={isRunning || !code.trim()}
        size="sm"
        className="gap-2"
      >
        <Play className="h-4 w-4" />
        Run Code
      </Button>
      <Button
        onClick={onReset}
        variant="outline"
        size="sm"
        className="gap-2"
      >
        <RotateCcw className="h-4 w-4" />
        Reset
      </Button>
      <Button
        onClick={handleCopy}
        variant="ghost"
        size="sm"
        className="gap-2 ml-auto"
      >
        <Copy className="h-4 w-4" />
        Copy Code
      </Button>
    </div>
  );
}
