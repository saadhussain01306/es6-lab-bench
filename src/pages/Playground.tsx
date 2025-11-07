import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CodeEditor } from '@/components/CodeEditor';
import { OutputPanel } from '@/components/OutputPanel';
import { RunBar } from '@/components/RunBar';
import { SandboxRunner } from '@/components/SandboxRunner';
import { ArrowLeft } from 'lucide-react';
import { es6Features } from '@/data/es6Features';

const templates = es6Features.reduce((acc, feature) => {
  if (feature.examples.length > 0) {
    acc[feature.id] = {
      title: feature.title,
      code: feature.examples[0].code,
    };
  }
  return acc;
}, {} as Record<string, { title: string; code: string }>);

export default function Playground() {
  const navigate = useNavigate();
  const [code, setCode] = useState('// Start coding...\nconsole.log("Hello, ES6!");');
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [shouldRun, setShouldRun] = useState(false);

  const handleRun = () => {
    setOutput([]);
    setIsRunning(true);
    setShouldRun(true);
  };

  const handleReset = () => {
    setCode('// Start coding...\nconsole.log("Hello, ES6!");');
    setOutput([]);
    setShouldRun(false);
  };

  const handleOutput = (message: string) => {
    setOutput((prev) => [...prev, message]);
  };

  const handleComplete = () => {
    setIsRunning(false);
    setShouldRun(false);
  };

  const handleTemplateChange = (templateId: string) => {
    const template = templates[templateId];
    if (template) {
      setCode(template.code);
      setOutput([]);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <h1 className="text-2xl font-bold">Free-form Playground</h1>
            </div>
            <Select onValueChange={handleTemplateChange}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Load template..." />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(templates).map(([id, template]) => (
                  <SelectItem key={id} value={id}>
                    {template.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      {/* Editor & Output */}
      <div className="flex-1 container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-4 h-[calc(100vh-200px)]">
          <div className="flex flex-col border border-border rounded-lg overflow-hidden">
            <RunBar
              onRun={handleRun}
              onReset={handleReset}
              code={code}
              isRunning={isRunning}
            />
            <div className="flex-1 overflow-hidden">
              <CodeEditor value={code} onChange={setCode} />
            </div>
          </div>

          <OutputPanel output={output} onClear={() => setOutput([])} />
        </div>
      </div>

      {/* Sandbox Runner */}
      {shouldRun && (
        <SandboxRunner
          code={code}
          onOutput={handleOutput}
          onComplete={handleComplete}
        />
      )}
    </div>
  );
}
