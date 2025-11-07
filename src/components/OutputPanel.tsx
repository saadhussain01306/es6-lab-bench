import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Copy, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface OutputPanelProps {
  output: string[];
  onClear: () => void;
}

export function OutputPanel({ output, onClear }: OutputPanelProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(output.join('\n'));
    toast({
      title: 'Copied!',
      description: 'Output copied to clipboard',
    });
  };

  return (
    <div className="flex flex-col h-full bg-output-bg rounded-lg border border-code-border">
      <div className="flex items-center justify-between px-4 py-2 border-b border-code-border">
        <h3 className="text-sm font-semibold text-foreground">Console Output</h3>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            disabled={output.length === 0}
            className="h-8"
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            disabled={output.length === 0}
            className="h-8"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <ScrollArea className="flex-1 p-4">
        {output.length === 0 ? (
          <p className="text-sm text-muted-foreground italic">
            Run your code to see output here...
          </p>
        ) : (
          <div className="space-y-1 font-mono text-sm">
            {output.map((line, i) => (
              <div
                key={i}
                className={`whitespace-pre-wrap ${
                  line.startsWith('Error:') || line.startsWith('❌')
                    ? 'text-destructive'
                    : line.startsWith('Warning:')
                    ? 'text-warning'
                    : 'text-foreground'
                }`}
              >
                {line}
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
